import express from 'express';
import '../dotenv.js';
import { db } from '../connect.js';

const router = express.Router();

// 일반 유저 회원가입
router.post('/', async (req, res) => {
    const { email, name, imageUrl, password} = req.body;
    console.log(req.body);

    let connection = null;

    try {
      connection = await db.getConnection();
      const insertSql = `INSERT INTO Users(email, name, imageUrl, password) 
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