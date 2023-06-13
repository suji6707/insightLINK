import express from 'express';
import '../dotenv.js';
import { db } from '../connect.js';

const router = express.Router();


router.get('/', async (req, res) => {
  /* 유저정보 확인 */
  let connection = null;
  try {
    connection = await db.getConnection();
    const q = `SELECT * FROM Users 
        WHERE email = '${email}' AND imageUrl='${imageUrl}'`;
    const [result] = await connection.query(q);
    connection.release();
  
    if (result[0]) {
      console.log(`userId : ${result[0].id} has been logged in!`);
      const token = jwt.sign({ userId: result[0].id }, 'customized-secret-key');
      res.send({ success: true, token });  
    } else {
      console.log('there is no such user. please register');
    }
  } catch (err) {
    connection?.release();
    console.log(err);
    res.status(500).send('Internal Server Error'); // Send error response
  }
});




export default router;