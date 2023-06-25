import '../dotenv.js';
import { db } from '../connect.js';
import { selectCardToClone } from '../db/cardQueries.js';
import { copyQuery1 } from '../db/cardQueries.js';
import { copyQuery2 } from '../db/cardQueries.js';


export const cloneCard =  async (req, res) => {
  /* 가져오려는 카드 */
  const cardId = req.query.cardId;
  console.log('cardId :', cardId);
  /* 로그인 유저 */
  const { user } = res.locals;    
  const userId = user.user_id;

  try { 
    await cloneCards(userId, cardId); // userId ='me'
    res.status(200).send('SUCCESS');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error'); // Send error response
  }
};





/* user_id만 다른, 동일한 File row 생성 */
const cloneCards = async (userId, cardId) => {
  console.log('getCardToClone');
  let connection = null;
  try {
    connection = await db.getConnection();
    const [selectResults] = await connection.query(selectCardToClone, [cardId]);
    for (let selectResult of selectResults) {
      console.log('selectResult :', selectResult); 
      const [insertResult] = await connection.query(copyQuery1, [userId, selectResult.cardId]);
      const newFileId = insertResult.insertId;
      await connection.query(copyQuery2, [newFileId, newFileId]);
      console.log(`Copying card ${cardId} to user ${userId} successed!`);
    }
    connection.release();
    /* 기존 cardId가 아니라 새로 생성된 cardId를 넣어야 함 */
    // await conn/ection.query(copyQuery2, [newFileId, newFileId]);
    // console.log(`Copying card ${cardId} to user ${userId} successed!`);
  } catch (err) {
    connection?.release();
    console.log(err);
    throw new Error('Internal Server Error');   // Send error response
  }
};
