import express from 'express';
import '../dotenv.js';
import jwt from 'jsonwebtoken';
import { db } from '../connect.js';

const router = express.Router();


router.post('/', async (req, res) => {
  const { email, givenName, imageUrl } = req.body;

  /* 유저정보 확인 */
  let connection = null;
  try {
    connection = await db.getConnection();
    const sql = `SELECT * FROM Users 
      WHERE email = '${email}' AND imageUrl='${imageUrl}'`;
    const [result] = await connection.query(sql);
    connection.release();

    if (result[0]) {
      console.log(`userId : ${result[0].id} has been logged in!`);
      const token = jwt.sign({ userId: result[0].id }, 'customized-secret-key');
      res.send({ success: true, token });  
    } else {
      console.log('there is no such user. please register');

      /* 회원가입 */
      connection = await db.getConnection();
      const insertSql = `INSERT INTO Users(email, name, imageUrl) 
        VALUES (?, ?, ?)`;
      await connection.query(insertSql, [email, givenName, imageUrl]);
    
      /* 토큰발행 */
      const findUserSql = 'SELECT * FROM Users WHERE email = ? AND imageUrl = ?';
      const [newResult] = await connection.query(findUserSql, [email, imageUrl]);
      console.log(`userId : ${newResult[0].id} has been logged in!`);
      const token = jwt.sign({ userId: newResult[0].id }, 'customized-secret-key');
      res.send({ success: true, token }); // Send success response
    }
  } catch (err) {
    connection?.release();
    console.log(err);
    res.status(500).send('Internal Server Error'); // Send error response
  }
});




export default router;