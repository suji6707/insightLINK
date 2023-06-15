import express from 'express';
import '../dotenv.js';
import { db } from '../connect.js';

const router = express.Router();

router.get('/', async (req, res) => {
  console.log(req.query.tagname); 

  /* 유저정보 확인 */
  const { user } = res.locals;    // authMiddleware 리턴값
  const useId = user.user_id;
  console.log(useId);

  let connection = null;
  try {
    connection = await db.getConnection();

    /* 태그명에 해당하는 file_id, content -> cardId, cardContent. result1은 여러개임.*/
    const q1 = 
    `SELECT File.file_id, File.content
      FROM File
      JOIN Tag ON File.file_id = Tag.file_id
      WHERE Tag.tag = ?`;

    /* 파일id에 해당하는 태그 */
    const q2 = 
    `SELECT Tag.tag
      FROM Tag
      JOIN File ON Tag.file_id = File.file_id
      WHERE File.file_id = ?`;

    const [result1] = await connection.query(q1, [req.query.tagname]);

    let data = [];    // 최종 리턴할 배열

    for (let i = 0; i < result1.length; i++) {
      /* result1의 한 파일에 대해- 태그 두 개 */
      const [result2] = await connection.query(q2, result1[i].file_id);
      let cardTag = [];
      for (let i = 0; i < result2.length; i++) {
        cardTag.push(result2[i].tag);
      }

      let obj = 
        {
          'cardId' : result1[i].file_id,
          'cardTag' : cardTag,
          'cardContent' : result1[i].content,
        };

      data.push(obj);
    }    
    connection.release();
    console.log(data);
    return res.status(200).send(data);

  } catch (err) {
    connection?.release();
    console.log(err);
    res.status(500).send('Internal Server Error'); // Send error response
  }
});

export default router;

