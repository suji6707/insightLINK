import '../dotenv.js';
import { db } from '../connect.js';
import {userNameQuery, cardCntQuery,followCntQuery,tagCntQuery,isFollowQuery } from '../db/userQueries.js';

export const getOtherInfo = async (req, res) => {
  const { user } = res.locals;
  const userId = user.user_id;
  const otherId = req.params.other_id;
  let connection = null;
  try {
    connection = await db.getConnection();

    const card_cnt = await connection.query(cardCntQuery(otherId));
    const user_name = await connection.query(userNameQuery(otherId));
    const follow_cnt = await connection.query(followCntQuery(otherId));
    const tag_cnt = await connection.query(tagCntQuery(otherId));
    let isFollow = await connection.query(isFollowQuery(userId,otherId));
  
    if(isFollow[0][0]['cnt'] >= 1)
        isFollow = true;
    else
        isFollow = false;

    let tagCnt = tag_cnt[0][0].tag_count;
    let cardCnt = card_cnt[0][0]['rowCount'];
    let userName = user_name[0][0]['user_name'];

    const data = {
      userName,
      tagCnt,
      cardCnt,
      followCnt: follow_cnt[0][0]['cnt'],
      isFollow,
    };
    
    connection.release();
    return res.status(200).send(data);
  } catch(err) {
    connection?.release();
    console.log(err);
    res.status(500).send('Internal Server Error');
  }};