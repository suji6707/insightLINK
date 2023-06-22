import express from 'express';
import '../dotenv.js';
import { db } from '../connect.js';

const router = express.Router();

// 일반 유저 회원가입
router.post('/', async (req, res) => {
    const { email, name, password} = req.body;

    let connection = null;

    const imageUrl = 'https://cdn.pixabay.com/photo/2023/04/15/17/19/cat-7928232_1280.png'

    try {
      connection = await db.getConnection();
      const findUserSql = `SELECT * FROM User WHERE email = '${email}'`;
      const [result] = await connection.query(findUserSql)
      
      if(result[0]) {
        res.send({ success: false});
        return
      }

      const insertSql = `INSERT INTO User(email, user_name, profile_img, password) 
          VALUES (?, ?, ?, ?)`;
      await connection.query(insertSql, [email, name, imageUrl, password]);
      connection.release();

      res.send({ success: true});

    } catch (err) {
      connection?.release();
      console.log(err);
      res.status(500).send('Internal Server Error'); // Send error response
    }
  
  });

export default router;