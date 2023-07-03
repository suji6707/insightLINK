import express from 'express'
import { db } from '../connect.js'

import {userNameQuery} from '../db/userQueries.js';

import { logger } from '../winston/logger.js';

const router = express.Router()

router.get('/info', async (req, res) => {
  const userId = req.query.userId

  let connection = null

  try {
    connection = await db.getConnection();
    const [user_name] = await connection.query(userNameQuery(userId));
    connection.release();

    const userName = user_name[0].user_name;

    logger.info(`server/routes/api/share/info/userName.js폴더, get, 카카오톡 공유하기 이름 : ${user_name[0].user_name} 성공!`);
    res.status(200).send({userName});
  } catch (err) {
    connection?.release();
    logger.error("server/routes/api/share/info/userName.js폴더, get, error : ", err);
    res.status(500).send('Internal Server Error')
  }
})

export default router
