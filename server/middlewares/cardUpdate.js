import '../dotenv.js';
import { db } from '../connect.js';


export const updateCard =  async (req, res) => {
  /* 가져오려는 카드 */
  const cardId = req.params.card_id;
  console.log('cardId : ',cardId);

  /* 로그인 유저 */
  const { user } = res.locals;    
  const userId = user.user_id;
  // console.log('userId : ',userId);
  const content = req.body.content;
  // console.log('content : ',content);
  let connection = null;
    try {
    connection = await db.getConnection();
    const query = `update File set content = '${content}' where file_id = ${cardId} and user_id = ${userId}`
    await connection.query(query);
    connection.release();
    res.status(200).send({success: true});
    } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error'); 
  }
};

