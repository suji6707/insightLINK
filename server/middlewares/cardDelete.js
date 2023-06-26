import '../dotenv.js';
import { db } from '../connect.js';

/* log */
import { logger } from '../winston/logger.js';


export const deleteCard =  async (req, res) => {
  /* 가져오려는 카드 */
  const cardId = req.params.card_id;
  logger.info(`/routes/cards/cardDelete 폴더, delete, cardId : ${cardId}`);

  /* 로그인 유저 */
  const { user } = res.locals;    
  const userId = user.user_id;
  logger.info(`/routes/cards/cardDelete 폴더, delete, userId : ${userId}`);

  let connection = null;
    try {
    connection = await db.getConnection();
    const query = `delete from File where user_id = ${userId} and file_id = ${cardId};`
    await connection.query(query);
    connection.release();
    logger.info(`/routes/cards/cardDelete 폴더, delete, cardId : ${cardId} 카드 삭제 성공`);
    res.status(200).send({success: true});
    } catch (err) {
    logger.error("/routes/cards/cardDelete 폴더, delete, err : ", err);
    res.status(500).send('Internal Server Error'); 
  }
};

