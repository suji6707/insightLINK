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
import { combinedList }  from '../services/taglist.js';  
/* Tag ENDED */
// import jwt from'jsonwebtoken';

// import { authMiddleware } from '../middlewares/auth-middleware.js';

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
        const q1 = 'INSERT INTO File (user_id, img_url, content) VALUES (?, ?, ?)';   // SQL - File 
        const q2 = 'INSERT INTO Tag (file_id, tag, tag_index) VALUES (?, ?, ?)';      // SQL - Tag  
        const q3 = 'INSERT INTO FileTag (file_id, tag_id) VALUES (?, ?)';
        
        /* 모든 이미지를 S3로 저장, sumText.length != 0 인 것만 OCR 및 태그 추출 후 저장 */
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

            /* Tag 가공 -> index, KR */
            const tag1 = tagJSON.tags[0];   // tag english string
            const tag2 = tagJSON.tags[1];
            // tag[0]

            const tagRow1 = combinedList.find(item => item.englishKeyword === tag1);
            if (!tagRow1) {
              console.log(`No matching element found for ${tag1}.`);
            }
            // tag[1]
            const tagRow2 = combinedList.find(item => item.englishKeyword === tag2);
            if (!tagRow2) {
              console.log(`No matching element found for ${tag2}.`);
            }

            /* SQL - File */
            const [ result1 ] = await connection.query(q1, [ userId, imgUrl, sumText ]);
            /* SQL - Tag */
            const [ result2 ] = await connection.query(q2, [ result1.insertId, tagRow1.koreanKeyword, tagRow1.index ]);   // file's insertId, tag name(KR), tag[0] enum
            const [ result3 ] = await connection.query(q2, [ result1.insertId, tagRow2.koreanKeyword, tagRow2.index ]);   // file's insertId, tag name(KR), tag[1] enum
            /* SQL - FileTag */
            await connection.query(q3, [ result1.insertId, result2.insertId ]);       // same file's insertId, tag[0]'s insertId
            await connection.query(q3, [ result1.insertId, result3.insertId ]);       // same file's insertId, tag[1]'s insertId
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
