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
    const sql = `SELECT * FROM User WHERE email = '${email}'`;
    const [result] = await connection.query(sql);
    connection.release();

    if (result[0]) {
      console.log(`userId : ${result[0].user_id} has been logged in!`);
      const token = jwt.sign({ userId: result[0].user_id }, 'customized-secret-key');
      res.send({ success: true, token });  
    } else {

      /* 회원가입 */
      connection = await db.getConnection();
      const insertSql = 'INSERT INTO User(email, user_name, profile_img) VALUES (?, ?, ?)';
      await connection.query(insertSql, [email, givenName, imageUrl]);
    
      /* 토큰발행 */
      const findUserSql = 'SELECT * FROM User WHERE email = ? AND profile_img = ?';
      const [newResult] = await connection.query(findUserSql, [email, imageUrl]);
      const token = jwt.sign({ userId: newResult[0].user_id }, 'customized-secret-key');
      res.send({ success: true, token }); // Send success response
    }
  } catch (err) {
    connection?.release();
    console.log(err);
    res.status(500).send('Internal Server Error'); // Send error response
  }
});

router.post('/generic', async(req, res) => {
  const { email, password } = req.body;

  let connection = null;

  try {
    connection = await db.getConnection();
    const sql = `SELECT * FROM User WHERE email = '${email}' AND password='${password}'`;
    const [result] = await connection.query(sql);
    connection.release();
  
    if (result[0]) {
      const token = jwt.sign({ userId: result[0].user_id }, 'customized-secret-key');
      res.send({ success: true, token });  
    } else {
      res.send({ success: false  });
    }
  } catch (err) {
    connection?.release();
    console.log(err);
    res.status(500).send('Internal Server Error'); // Send error response
  }

})




export default router;