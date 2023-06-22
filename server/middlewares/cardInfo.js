import '../dotenv.js';
import { db } from '../connect.js';
import { cardInfoQuery } from '../db/cardQueries.js';  
import { fileToUserQurey } from '../db/socialQueries.js'; 

/* 카드정보 상세 조회 */
export const getCardInfos = async (req, res) => {
  /* 로그인 유저 */
  const { user } = res.locals;
  const userId = user.user_id;
  // console.log('userId: ', userId);
  /* 다른 유저 */
  const otherUserId = req.query.userId;
  /* cardId */
  const cardId = req.query.cardId;
  
  try {
    if (otherUserId) {
      /* 다른 유저 카드 조회 */
      const cardInfo = await getCardInfo(otherUserId, cardId);
      return res.status(200).send(cardInfo); 
    }
    /* 내 카드 조회 */
    const cardInfo = await getCardInfo(userId, cardId);
    res.status(200).send(cardInfo);  
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

const getCardInfo = async (userId, cardId) => {
  let connection = null;
  try {
    connection = await db.getConnection();
    const [result] = await connection.query(cardInfoQuery, [userId, cardId]);
    const [userResult] = await connection.query(fileToUserQurey, [cardId]);
    connection.release();
    
    let cardTag = [];
    for (let i = 0; i < result.length; i++) {
      cardTag.push(result[i].tag);
    }

    const data = {
      userId: userResult[0].user_id,
      userName: userResult[0].user_name,
      profile_img: userResult[0].profile_img,
      cardId: parseInt(cardId),
      cardTag: cardTag,
      cardImage: result[0].img_url,
      content: result[0].content,
    };
    
    // console.log(data);
    return data;
    
  } catch (err) {
    connection?.release();
    console.log(err);
    throw new Error('Internal Server Error');
  }
};
