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

const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  correctClockSkew: true,
});

// (async () => {
//   const response = await client.send(new GetObjectCommand({
//     Bucket: 'sw-jungle-s3',
//     Key: function (req, file, cb) {
//       const ext = path.extname(file.originalname);
//       cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//     }
//   }));
//   console.log(response);
// })();

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

/* Multer- 이전 버전*/
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     if (file.fieldname == 'photos_text') { 
//       cb(null, "static/texts/");
//     } else {
//       cb(null, "static/images/");
//     } 
//   },
//   filename: function (req, file, cb) {  
//     const ext = path.extname(file.originalname);
//     cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//   },
// });

const upload = multer({ storage: storage });
const router = express.Router();



/* Multer */
router.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), './multipart.html'));
});

router.post('/', upload.fields(
  [
    { name: 'photos_text', maxCount: 10 },
    { name: 'photos_img_only', maxCount: 10 },
  ],
),
async (req, res) => {
  if (req.files) {
    console.log('files uploaded');
    console.log(req.files); 

    let connection = null;
    try {
      connection = await db.getConnection();
      // const table = req.files.fieldname === 'photos_text' ? 'posts_text' : 'posts_img';
      const q1 = 'INSERT INTO posts_text (text, img) VALUES (?, ?)';
      const q2 = 'INSERT INTO posts_img_only (img) VALUES (?)';

      /** TO DO
       * photos_text 필드로 업로드된 파일은 posts_text 테이블로 processOCR 결과물, img 저장
      */ 
      for (let i = 0; i < req.files.photos_text.length; i++) {  // 개별 파일마다 처리해 저장해야 함. text/img 전용 파일 개수가 다름
        /* http://localhost:8000/static/파일명.jpg */
        const imgUrl = process.env.MY_PROXY + req.files.photos_text[i].path;
        const sumText = await processOCR(imgUrl);          
        console.log(sumText);
        const [ result ] = await connection.query(q1, [ sumText, imgUrl ]);

        // if (result.insertId) res.send('photos uploaded!');
        // else throw new Error('upload failed');
      }

      // IMAGE-Only: null, img 저장
      // for (let i = 0; i < req.files.photos_img_only.length; i++) {
      //   const imgUrl = process.env.MY_PROXY + req.files.photos_img_only[i].path;
      //   const [ result ] = await connection.query(q2, [ imgUrl ])
        
      //   // if (result.insertId) res.send('photos uploaded!');
      //   // else throw new Error('upload failed');
      // }

      connection.release();

      return res.status(200).send('SUCCESS');

    } catch (err) {
      connection?.release();
      console.log(err);
      res.status(400).send('ERROR');
    }
  }
});


export default router;
