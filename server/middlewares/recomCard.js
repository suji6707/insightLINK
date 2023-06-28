import '../dotenv.js';
import { db } from '../connect.js';
import { recommendSimilarQuery } from '../db/socialQueries.js';
import { recommendDiscoverQuery } from '../db/socialQueries.js';
import { fileToUserQurey } from '../db/socialQueries.js';
import { rejectCardQuery } from '../db/socialQueries.js';
// import { recomUsersFunc } from './recomUser.js';

import { logger } from '../winston/logger.js';

export const recomCards = async (req, res) => {
  const { user } = res.locals;
  const userId = user.user_id;

  let connection = null;
  try {
    connection = await db.getConnection();

    /* 중복연산 제거 */
    const recommendList = await req.recommendList;

    /* 유사 카드 추천 */
    // const [friendCardList] = await connection.query(recommendSimilarQuery(userId, recommendList));
    const [friendCardList] = await connection.query(
      recommendSimilarQuery(userId),
    );
    // console.log('friendCardList: ', friendCardList);

    let cardList = [];
    // let similarCards = [];
    for (let i = 0; i < friendCardList.length; i++) {
      /* 해당 file_id에 대한 user -> img, userName  */
      const file_id = friendCardList[i].file_id;
      const [userResult] = await connection.query(fileToUserQurey, [file_id]);

      const obj = {
        userId: userResult[0].user_id,
        img: userResult[0].profile_img,
        userName: userResult[0].user_name,
        cardId: file_id,
        tag: friendCardList[i].tag,
        cardImg: friendCardList[i].img_url,
        isFriend: true,
      };
      cardList.push(obj);
    }

    if (recommendList.length === 0) {
      res.status(400).send({ errorMessage: '' });
      return;
    }
    /* 새로운 관심사 추천 */
    const [discoveryCardList] = await connection.query(
      recommendDiscoverQuery(userId, recommendList),
    );
    // console.log(recommendList);
    // console.log(discoveryCardList);

    // let discoveryCards = [];
    for (let i = 0; i < discoveryCardList.length; i++) {
      /* 해당 file_id에 대한 user -> img, userName  */
      const file_id = discoveryCardList[i].file_id;
      const [userResult] = await connection.query(fileToUserQurey, [file_id]);

      const obj = {
        userId: userResult[0].user_id,
        img: userResult[0].profile_img,
        userName: userResult[0].user_name,
        cardId: file_id,
        tag: discoveryCardList[i].tag,
        cardImg: discoveryCardList[i].img_url,
        isFriend: false,
      };
      cardList.push(obj);
    }

    // console.log(cardList);
    shuffleArray(cardList);
    console.log(cardList);

    connection.release();
    logger.info('/routes/social/recomCard 폴더 recomCards함수, get 성공 !');
    res.status(200).send(cardList);
  } catch (err) {
    connection?.release();
    logger.error(
      '/routes/social/recomCard 폴더 recomCards함수, get, err : ',
      err,
    );
    res.status(500).send('Internal Server Error');
  }
};

export const rejectCard = async (req, res) => {
  const { user } = res.locals;
  const userId = user.user_id;
  const cardId = req.query.cardId;

  let connection = null;
  try {
    connection = await db.getConnection();
    const [result] = await connection.query(rejectCardQuery, [userId, cardId]);
    connection.release();
    logger.info('/routes/social/recomCard 폴더 rejectCard함수, get 성공 !');
    res.status(200).send(`User ${userId} rejected card ${cardId}`);
  } catch (err) {
    connection?.release();
    logger.error(
      '`/routes/social/recomCard 폴더 rejectCard함수, get, err : ',
      err,
    );
    res.status(500).send('Internal Server Error');
  }
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
  logger.info('/routes/social/recomCard 폴더 shuffleArray함수, return 성공 !');
  return array;
}
