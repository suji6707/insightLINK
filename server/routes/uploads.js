import express from 'express';
import '../dotenv.js';
import multer from 'multer';
/* MULTER-S3 ADDED */
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
/* OCR LINE ADDED */
import { db } from '../connect.js';
import { processOCR } from '../services/naverOCR.js';
import path from 'path';
/* OCR ENDED */
/* Tag LINE ADDED */
import { generate } from '../services/generate.js';
import { extractJson } from '../services/jsonUtils.js';
/* Tag ENDED */

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


/* Multer */
router.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), './multipart.html'));
});

router.post('/', upload.array('photos'),
  async (req, res) => {
    if (req.files) {
      console.log('files uploaded');
      console.log(req.files); 

      let connection = null;
      try {
        connection = await db.getConnection();
        const q1 = 'INSERT INTO posts_text (text, img, tag) VALUES (?, ?, ?)';

        /** TO DO
       * (변경전)photos_text 필드로 업로드된 파일은 posts_text 테이블로 processOCR 결과물, img 저장
       * -> (변경후) 모든 이미지를 S3로 저장, sumText.length != 0 인 것만 OCR 및 태그 추출 후 저장하기
      */
        let tagList = [];
        for (const file of req.files) { 
          const imgUrl = file.location; // S3 링크
          const sumText = await processOCR(imgUrl);  
          if (isImage(sumText)) {
            tagList.push('<Image>');
          } else {
            const tag = await generate(req, res, sumText); 
            const tagJSON = extractJson(tag);
            tagList.push(tagJSON);
            const [ result ] = await connection.query(q1, [ sumText, imgUrl, tagJSON.tags[0]]);
          };
        }
        console.log(tagList);
        connection.release();

        return res.status(200).send('SUCCESS');

      } catch (err) {
        connection?.release();
        console.log(err);
        res.status(400).send('ERROR');
      }
    }
  },
);



export default router;
