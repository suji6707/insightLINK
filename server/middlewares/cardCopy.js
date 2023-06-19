import '../dotenv.js';
import { db } from '../connect.js';
import { copyQuery1 } from '../db/cardQueries.js';
import { copyQuery2 } from '../db/cardQueries.js';


export const getCards =  async (req, res) => {
  /* 가져오려는 카드 */
  const cardId = req.query.cardId;
  console.log(cardId);
  /* 로그인 유저 */
  const { user } = res.locals;    
  const userId = user.user_id;

  try {
    await getCard(userId, cardId); // userId ='me'
    res.status(200).send('SUCCESS');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error'); // Send error response
  }
};


/* user_id만 다른, 동일한 File row 생성 */
const getCard = async (userId, cardId) => {
  let connection = null;
  try {
    connection = await db.getConnection();
    const [result] = await connection.query(copyQuery1, [userId, cardId]);
    const newFileId = result.insertId;
    connection.release();
    /* 기존 cardId가 아니라 새로 생성된 cardId를 넣어야 함 */
    await connection.query(copyQuery2, [newFileId, newFileId]);
    console.log(`Copying card ${cardId} to user ${userId} successed!`);
  } catch (err) {
    connection?.release();
    console.log(err);
    throw new Error('Internal Server Error');   // Send error response
  }
};
