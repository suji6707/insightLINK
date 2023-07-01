import express from 'express';
import '../dotenv.js';
import multer from 'multer';
/* MULTER-S3 ADDED */
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
/* OCR LINE ADDED */
import { db } from '../connect.js';
import { processOCR } from '../services/naverOCR.js';
import path from 'path';
/* OCR ENDED */
/* Tag LINE ADDED */
import { generate } from '../services/generate.js';
import { extractJson } from '../services/jsonUtils.js';
// import { combinedList }  from '../services/taglist.js';  
import translate from 'translate-google';
/* Tag ENDED */
// import { setTimeout } from 'timers/promises';   

/* log */
import { logger } from '../winston/logger.js';


const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  correctClockSkew: true,
});

/* Multer */
const storage = multerS3({
  s3: s3,
  bucket: 'sw-jungle-s3',
  metadata: function (req, file, cb) {
    cb(null, {fieldName: file.fieldname});
  },
  key: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

const isImage = (ocrResult) => {
  const tag =  ocrResult || '';
  if (tag.trim().length === 0) {
    return true;
  }
  return false;
};


const extractTagFromImage = async (imgUrl, req, res) => {
  const sumText = await processOCR(imgUrl);
  // res.write(JSON.stringify({imgUrl: imgUrl, status: 'process OCR FINISEHD'}));
  let tagJSON = '<Image>';  
  if (!isImage(sumText)) {
    const tag = await generate(req, res, sumText); 
    tagJSON = extractJson(tag);
    console.log('fr_extractTagFromImage: ', tagJSON);

    if (!tagJSON || !tagJSON.tags) {
      logger.error('Invalid JSON data. No "tags" property found.');
      return null;
    }

    if (tagJSON.tags === null || tagJSON.tags[0] === null || tagJSON.tags[1] === null) {
      logger.info(`/routes/uploads 폴더, post, ${tagJSON.tags[0]} or ${tagJSON.tags[1]} is null.`);
      return null;
    }
    // console.log(tagJSON);
    /* 실시간 통신 */
    res.write(JSON.stringify({imgUrl: imgUrl, status: 'extract JSON FINISHED', data: tagJSON}));
  }
  return {
    imgUrl,
    sumText,
    tagJSON,
  };
};



router.post('/', upload.array('photos'),
  async (req, res) => {

    const { user } = res.locals;    // authMiddleware 리턴값
    const useId = user.user_id;

    const imgUrlList = req.body;

    let connection = null;
    try {
      connection = await db.getConnection();  
      const q1 = 'INSERT INTO File (user_id, img_url, content) VALUES (?, ?, ?)';           // SQL - File 
      const q2 = 'INSERT INTO Tag (file_id, tag, tag_index) VALUES (?, ?, ?)';              // SQL - Tag   ********* taglist -> Tag 테이블 저장시 index -1 해야함. 0부터 시작하도록.
      const q3 = 'INSERT INTO taglist (englishKeyword, koreanKeyword, tag_index) VALUES (?, ?, ?)';       // SQL - taglist
      const q4 = 'SELECT t.koreanKeyword, t.tag_index FROM taglist AS t WHERE englishKeyword = ?'; // 영어 -> 한글
      const q5 = 'SELECT MAX(tag_index) AS last_index FROM taglist';
      
      /* 모든 이미지를 S3로 저장, sumText.length != 0 인 것만 OCR 및 태그 추출 후 저장 */
      const promises = [];
      for (const imgUrl of imgUrlList) {
        promises.push(extractTagFromImage(imgUrl, req, res));
      }
      const tagList = await Promise.all(promises);  // promise 배열을 한번에 풀어줌. 푸는 순서를 보장하지 않지만 n개를 동시에 풀어줌.
      
      for (const result of tagList) {
        if (result === null) {
          console.log('tagJSON null이 제대로 return null 처리됨.');
          continue;
        }
        const { tagJSON, sumText, imgUrl } = result;
        if (tagJSON === '<Image>' || tagJSON === null) {
          console.log('tagJSON null이 한 번 더 에러처리로 들어옴.');
          continue;
        }
        const tag1 = tagJSON.tags[0];   // tag english string
        const tag2 = tagJSON.tags[1];
        
        /* taglist 테이블에서 영어 키워드에 맞는 한글 키워드 가져오기 */
        const [tagResult1] = await connection.query(q4, [tag1]);
        const [tagResult2] = await connection.query(q4, [tag2]);

        /* SQL - File 사진은 일단 저장 */
        const [ result1 ] = await connection.query(q1, [ useId, imgUrl, sumText ]);

        /* tag1, tag2가 모두 있는 경우 */
        if (tagResult1.length != 0 && tagResult2.length != 0) {          
          /* SQL - Tag */
          const [ result2 ] = await connection.query(q2, [ result1.insertId, tagResult1[0].koreanKeyword, tagResult1[0].tag_index ]);   // file's insertId, taglist의 KR, id
          const [ result3 ] = await connection.query(q2, [ result1.insertId, tagResult2[0].koreanKeyword, tagResult2[0].tag_index ]);   // file's insertId, taglist의 KR, id
        } 
        /* tag1만 없는 경우 */
        else if (tagResult1.length === 0 && tagResult2.length != 0) {
          logger.info(`/routes/uploads 폴더, post, No matching element found for ${tag1}.`);
          try {
            // 1. 번역 후 taglist 테이블에 저장
            const translatedTag1 = await translate(tag1, {to: 'ko'});     // 한글 키워드
            const [indexResult] = await connection.query(q5);             // taglist의 마지막 tag_index
            const [taglistResult1] = await connection.query(q3, [tag1, translatedTag1, indexResult[0].last_index + 1]);    // taglist: tag_index + 1로 새롭게 저장

            // 2. Tag 테이블 저장 (translated 기준)
            const [result2] = await connection.query(q2, [ result1.insertId, translatedTag1, indexResult[0].last_index + 1 ]);            //  tag1: 번역된 KR -> Tag.tag_index 역시 동일하게
            const [result3] = await connection.query(q2, [ result1.insertId, tagResult2[0].koreanKeyword, tagResult2[0].tag_index ]);     //  tag2: 기존 방식
            console.log(`fr: ${translatedTag1} 저장 성공!`);
          } catch (err) {
            console.log(err);
          }
        } 
        /* tag2만 없는 경우 */
        else if (tagResult1.length != 0 && !tagResult2.length === 0) {
          logger.info(`/routes/uploads 폴더, post, No matching element found for ${tag2}.`);
          try {
            // 1. 번역 후 taglist 테이블에 저장
            const translatedTag2 = await translate(tag2, {to: 'ko'});     // 한글 키워드
            const [indexResult] = await connection.query(q5);             // taglist의 마지막 tag_index
            const [taglistResult2] = await connection.query(q3, [tag2, translatedTag2, indexResult[0].last_index + 1]);

            // 2. Tag 테이블 저장
            const [result2] = await connection.query(q2, [ result1.insertId, tagResult1[0].koreanKeyword, tagResult1[0].tag_index ]);   // tag1: 기존 방식     
            const [result3] = await connection.query(q2, [ result1.insertId, translatedTag2, indexResult[0].last_index + 1 ]);          // tag2: 번역된 KR -> Tag.tag_index 역시 동일하게
            console.log(`fr: ${taglistResult2} 저장 성공!`);
          } catch (err) {
            console.log(err);
          }
        }
        /* 둘 다 없는 경우 */
        else {
          try {
            // 1. 번역 후 taglist 테이블에 저장
            const translatedTag1 = await translate(tag1, {to: 'ko'});
            const translatedTag2 = await translate(tag2, {to: 'ko'});  
            /* taglist 저장 */     
            const [indexResult] = await connection.query(q5);             // taglist의 마지막 tag_index
            const [taglistResult1] = await connection.query(q3, [tag1, translatedTag1, indexResult[0].last_index + 1]);          
            const [taglistResult2] = await connection.query(q3, [tag2, translatedTag2, indexResult[0].last_index + 2]);
            
            const [result2] = await connection.query(q2, [ result1.insertId, translatedTag1, indexResult[0].last_index + 1 ]);    // tag1
            const [result3] = await connection.query(q2, [ result1.insertId, translatedTag2, indexResult[0].last_index + 2 ]);    // tag2
            console.log(`fr: ${translatedTag1}, ${translatedTag2} 저장 성공!`);
          } catch (err) {
            console.log(err);
          }
        }
      }
      // console.log(tagList);
      connection.release();

      res.write('SUCCESS');
      return res.end();
      
    } catch (err) {
      connection?.release();
      logger.error('/routes/uploads 폴더, post, err : ', err);
      res.status(400).send('ERROR');
    }
  },
);



export default router;
