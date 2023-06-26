import express from 'express';
import '../dotenv.js';
import { db } from '../connect.js';
import { userInfoQuery , userProfileQuery } from '../db/userQueries.js';

/* log */
import { logger } from '../winston/logger.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { user } = res.locals;
  const userId = user.user_id;
  let connection = null;
  try {
    connection = await db.getConnection();
    const [ result ] = await connection.query(userInfoQuery(userId));
    const cnt_query = `select COUNT(*) AS cnt from Follow where user_id = ${userId}`;
    const cnt = await connection.query(cnt_query);
    const { userName , tagCnt, cardCnt } = result[0];
    
    let val = parseInt(tagCnt) / 2;
    let updatedTagCnt = val | 0;
    const data = {
      userName,
      tagCnt : updatedTagCnt,
      cardCnt: parseInt(cardCnt),
      followCnt: cnt[0][0]['cnt'], 
    };

    logger.info(`/routes/user 폴더, get, tagCnt : ${parseInt(tagCnt)} `);
    logger.info(`/routes/user 폴더, get, data : ${data}`);

    connection.release();
    return res.status(200).send(data);
  } catch(err) {
    connection?.release();
    logger.error("/routes/user 폴더, get, err : ", err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:other_id', async (req, res) => {
  //const { user } = res.locals;
  //const userId = user.user_id;
  const otherId = req.params.other_id;

  logger.info(`/routes/user/:other_id 폴더, get, otherId : ${otherId} `);

  let connection = null;
  try {
    connection = await db.getConnection();
    const [ result ] = await connection.query(userInfoQuery(otherId));
    const cnt_query = `select COUNT(*) AS cnt from Follow where user_id = ${otherId}`;
    const cnt = await connection.query(cnt_query);

    logger.info(`/routes/user/:other_id 폴더, get, result[0] : ${result[0]} `);

    const { userName , tagCnt, cardCnt } = result[0];
    let val = parseInt(tagCnt) / 2;
    let updatedTagCnt = val | 0;

    logger.info(`/routes/user/:other_id 폴더, get, tagCnt : ${tagCnt} `);

    const data = {
      userName,
      tagCnt : updatedTagCnt,
      cardCnt: parseInt(cardCnt),
      followCnt: cnt[0][0]['cnt'], 
    };

    logger.info(`/routes/user/:other_id 폴더, get, data : ${data} `);
    connection.release();
    return res.status(200).send(data);
  } catch(err) {
    connection?.release();
    logger.error("/routes/uploads:other_id 폴더, get, err : ", err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/profile', async (req, res) => {
  const { user } = res.locals;
  const userId = user.user_id;
  let connection = null;
  try {
    connection = await db.getConnection();
    const [ result ] = await connection.query(userProfileQuery(userId));
        
    if (result.length === 0) {
      logger.info(`/routes/user/profile 폴더, get, UserId(${userId}) profile not found`);
      return res.status(404).send('User profile not found');
    }
    const { profile_img } = result[0];
    const data = {
      userProfile : profile_img,
    };
    logger.info(`/routes/user/profile 폴더, get, UserId(${userId}) profile : ${profile_img}`);
    connection.release();
    return res.status(200).send(data);
  } catch(err) {
    connection?.release();
    logger.error("/routes/profile 폴더, post, err : ", err);
    res.status(500).send('Internal Server Error');
  }
    
});



export default router;