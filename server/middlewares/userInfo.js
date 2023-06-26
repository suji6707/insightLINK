import '../dotenv.js';
import { db } from '../connect.js';
import { userInfoQuery  } from '../db/userQueries.js';


export const getUserInfo = async (req, res) => {
  const { user } = res.locals;
  const userId = user.user_id;
  let connection = null;
  try {
    connection = await db.getConnection();
    console.log('--- userInfo ---');
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
    //console.log('tagCnt :',parseInt(tagCnt));
    console.log('data : ',data);
    connection.release();
    return res.status(200).send(data);
  } catch(err) {
    connection?.release();
    console.log(err);
    res.status(500).send('Internal Server Error');
  }};
