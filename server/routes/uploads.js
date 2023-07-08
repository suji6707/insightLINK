import express from 'express';
import '../dotenv.js';
import multer from 'multer';
/* MULTER-S3 ADDED */
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
/* OCR LINE ADDED */
import { db } from '../connect.js';
import { ocrLogic } from '../services/naverOCR.js';
import path from 'path';
/* OCR ENDED */
/* Tag LINE ADDED */
import { generate } from '../services/generate.js';
// import { generateConversation } from '../services/generate.js';
import { extractJson } from '../services/jsonUtils.js';
// import { combinedList }  from '../services/taglist.js';  
import translate from 'translate-google';
/* Tag ENDED */
/* Redis */
import Redis from 'ioredis';
const redis = new Redis();
/* Job Queue */
import Queue from 'bull';
const queue = new Queue('ocrQueue', { redis: { port: 6379, host: '127.0.0.1' } }); 


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


/******************************* Job Queue ***********************************/
const processOCR = async (imgUrl) => {
  const job = await queue.add({imgUrl});
  return job.finished();
};

queue.process(5, async job => {
  // 이 부분에서 실제 OCR 처리 로직을 실행  
  const extractedText = await ocrLogic(job.data.imgUrl); // ocrLogic는 실제 OCR 처리 함수
  return Promise.resolve(extractedText);
});
/******************************* Job Queue ***********************************/


const extractTagFromImage = async (imgUrl, req, res, userId) => {
  const time = Date.now();
  const sumText = await processOCR(imgUrl);
  const arrival = Date.now() - time;
  console.log('arrival: ', arrival);
  // res.write(JSON.stringify({imgUrl: imgUrl, status: 'process OCR FINISEHD'}));
  let tagJSON = '<Image>';  
  if (!isImage(sumText)) {
    const tag = await generate(req, res, sumText, userId);
    tagJSON = extractJson(tag);
    console.log('fr: extractTagFromImage: ', tagJSON);
    if (!tagJSON || !tagJSON.tags) {
      logger.error('Invalid JSON data. No "tags" property found in extractTagFromImage.');
      return { imgUrl, sumText, tagJSON };
    }
    if (tagJSON.tags == null || tagJSON.tags.some(tag => tag == null)) {
      logger.error('/routes/uploads 폴더, post, Some tags are null in extractTagFromImage.');
      return { imgUrl, sumText, tagJSON };
    }
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
    const userId = user.user_id;
    const imgUrlList = req.body;
    console.log(userId);
    
    let connection = null;
    try {
      connection = await db.getConnection();  
      const q1 = 'INSERT INTO File (user_id, img_url, content) VALUES (?, ?, ?)';                         // SQL - File 
      const q2 = 'INSERT INTO Tag (file_id, tag, tag_index) VALUES (?, ?, ?)';                            // SQL - Tag   
      const q3 = 'INSERT INTO taglist (user_id, englishKeyword, koreanKeyword, tag_index) VALUES (?, ?, ?, ?)';       // SQL - taglist
      const q4 = 'SELECT t.koreanKeyword, t.tag_index FROM taglist AS t WHERE user_id = ? AND englishKeyword = ?';     
      const q5 = 'SELECT MAX(tag_index) AS last_index FROM taglist WHERE user_id = ?';
      
      //   /* 모든 이미지를 S3로 저장, sumText.length != 0 인 것만 OCR 및 태그 추출 후 저장 */
      const promises = [];
      for (const imgUrl of imgUrlList) {
        promises.push(extractTagFromImage(imgUrl, req, res, userId));
      }
      const tagList = await Promise.all(promises);  // promise 배열을 한번에 풀어줌. 푸는 순서를 보장하지 않지만 n개를 동시에 풀어줌.
      
      // console.log('tagList: ', tagList);
      // console.log('length: ', tagList.length);
      /* for문 1) 각 이미지에 대해 */
      for (const result of tagList) {
        /* null값 에러처리 */
        const { tagJSON, sumText, imgUrl } = result;
        if (tagJSON === '<Image>' || tagJSON == null) {
          logger.error('tagJSON이 <Image>거나, null이 한 번 더 에러처리로 들어옴 in router.post upload.');
          continue;
        }
        /* SQL - File 사진은 일단 저장 */
        const [ FileResult ] = await connection.query(q1, [ userId, imgUrl, sumText ]);

        /* for문 2) N개의 각 태그에 대해 */
        for (let i = 0; i < tagJSON.tags.length; i++) {
          // 영어 키워드 tag
          const tag = tagJSON.tags[i];
          console.log(`Redis에서 찾을 키_ taglist:${userId}:${tag}`);
          // 캐시에 존재여부 확인
          const value = await redis.get(`taglist:${userId}:${tag}`);
          console.log('Redis에 있는지 확인_ value: ', value);
          // 캐시에 있으면 바로 Tag 테이블 저장
          if (value) {
            const { koreanKeyword, tag_index } = JSON.parse(value);
            console.log('Redis에 저장된 value: ', `taglist:${userId}:${tag} = { KR: ${koreanKeyword}, tag_index: ${tag_index} }`);
            await connection.query(q2, [ FileResult.insertId, koreanKeyword, tag_index ]);      // file_id, tag, tag_index
          } else {
            // DB에서 찾는다
            console.log('DB에서 찾는다_tmp: ', tag);
            const [tagResult] = await connection.query(q4, [userId, tag]);
            console.log('fr: DB_해당 태그에 대한 taglist: ', tagResult);
            // DB에 있으면 바로 Tag 테이블 & 레디스 저장
            if (tagResult.length != 0) {
              try {
                await connection.query(q2, [ FileResult.insertId, tagResult[0].koreanKeyword, tagResult[0].tag_index ]);  // file_id, tag, tag_index
              } catch (err) {
                logger.info('/routes/uploads 폴더, post, Tag 테이블 INSERT 쿼리문 에러 발생(child): ', err);
              }
              await redis.set(`taglist:${userId}:${tag}`, JSON.stringify({ koreanKeyword: tagResult[0].koreanKeyword, tag_index: tagResult[0].tag_index }));
              console.log('Redis 저장: ', `taglist:${userId}:${tag} = { koreanKeyword: ${tagResult[0].koreanKeyword}, tag_index: ${tagResult[0].tag_index} }`);
            }
            // 없으면 taglist에 새 태그 저장 후 Tag 테이블 & 레디스 저장
            else {
              // taglist 저장
              try {
                const translatedTag = await translate(tag, {to: 'ko'});           // 한글 키워드
                const [indexResult] = await connection.query(q5, userId);         // tag_index
                const tag_index = indexResult[0].last_index + 1;
                console.log('fr: 신규 taglist 영/한: ', tag, translatedTag);      
                try {
                  await connection.query(q3, [ userId, tag, translatedTag, tag_index ]);          // englishKeyword, koreanKeyword, tag_index + 1
                  console.log(`fr: 신규 taglist: ${translatedTag} 저장 성공!`);
                  // Tag 테이블 & 레디스 저장
                  try {
                    await connection.query(q2, [ FileResult.insertId, translatedTag, tag_index ]);  // file_id, tag, tag_index
                  } catch (err) {
                    logger.info('/routes/uploads 폴더, post, Tag 테이블 INSERT 쿼리문 에러 발생(child): ', err);
                  }
                  await redis.set(`taglist:${userId}:${tag}`, JSON.stringify({ koreanKeyword: translatedTag, tag_index: tag_index }));
                  console.log('Redis 저장: ', `taglist:${userId}:${tag} = { koreanKeyword: ${translatedTag}, tag_index: ${tag_index} }`);
                } catch (err) {
                  logger.info('/routes/uploads 폴더, post, Tag 테이블 INSERT 쿼리문 에러 발생: ', err);
                }
              } catch (err) {
                logger.info('/routes/uploads 폴더, post, 구글 translate에서 에러 발생: ', err);
              }
            } 
          }
        }
      }
      connection.release();
      res.status(200).send('SUCCESS');
    } catch (err) {
      connection?.release();
      logger.error('/routes/uploads 폴더, post, err : ', err);
      res.status(400).send('ERROR');
    }
  },
);
export default router;