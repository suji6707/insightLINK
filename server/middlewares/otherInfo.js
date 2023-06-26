import '../dotenv.js';
import { db } from '../connect.js';
import { userInfoQuery,followCntQuery,tagCntQuery  } from '../db/userQueries.js';


export const getOtherInfo = async (req, res) => {
  const otherId = req.params.other_id;
  let connection = null;
  try {
    connection = await db.getConnection();

    const [ result ] = await connection.query(userInfoQuery(otherId));
    const follow_cnt = await connection.query(followCntQuery(otherId));
    const tag_cnt = await connection.query(tagCntQuery(otherId));
    const { userName , cardCnt } = result[0];
    let tagCnt = tag_cnt[0][0].tag_count;

    const data = {
      userName,
      tagCnt,
      cardCnt: parseInt(cardCnt),
      followCnt: follow_cnt[0][0]['cnt'], 
    };
    
    connection.release();
    return res.status(200).send(data);
  } catch(err) {
    connection?.release();
    console.log(err);
    res.status(500).send('Internal Server Error');
  }};