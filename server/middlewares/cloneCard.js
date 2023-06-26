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
    logger.info(`/routes/social/cloneCard 폴더 cloneCard함수, post 성공 !`);
    res.status(200).send('SUCCESS');
  } catch (err) {
    logger.error("/routes/social/cloneCard 폴더 cloneCard함수, post, err : ", err);
    res.status(500).send('Internal Server Error'); // Send error response
  }
};





/* user_id만 다른, 동일한 File row 생성 */
const cloneCards = async (userId, cardId) => {
  logger.info(`/routes/social/cloneCard 폴더 cloneCards함수, getCardToClone`);
  let connection = null;
  try {
    connection = await db.getConnection();
    const [selectResults] = await connection.query(selectCardToClone, [cardId]);
    for (let selectResult of selectResults) {
      logger.info(`/routes/social/cloneCard 폴더 cloneCards함수, selectResult : ${selectResult}`);
      const [insertResult] = await connection.query(copyQuery1, [userId, selectResult.cardId]);
      const newFileId = insertResult.insertId;
      await connection.query(copyQuery2, [newFileId, newFileId]);
      logger.info(`/routes/social/cloneCard 폴더 cloneCard함수, post 성공 !`);

      logger.info(`/routes/social/cloneCard 폴더 cloneCards함수, Copying card ${cardId} to user ${userId} successed!`);
    }
    connection.release();
    /* 기존 cardId가 아니라 새로 생성된 cardId를 넣어야 함 */
    // await conn/ection.query(copyQuery2, [newFileId, newFileId]);
    // console.log(`Copying card ${cardId} to user ${userId} successed!`);
  } catch (err) {
    connection?.release();
    logger.error("/routes/social/cloneCard 폴더 cloneCards함수, post, err : ", err);
    throw new Error('Internal Server Error');   // Send error response
  }
};
