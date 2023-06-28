import '../dotenv.js';
import { db } from '../connect.js';
import { recomUserQuery } from '../db/socialQueries.js';
import { tagQuery } from '../db/socialQueries.js';
import { profileQuery } from '../db/socialQueries.js';
import { followCheckQuery } from '../db/followQueries.js';
import { coldStartRecomQuery } from '../db/socialQueries.js';

import { logger } from '../winston/logger.js';


/* recomUserQuery(userId, limit) 함수로 분리*/
export const recomUsersFunc = async (req, res, next) => {
  const { user } = res.locals;
  const userId = user.user_id;
  let connection = null;
  try {
    connection = await db.getConnection();
    let [recommendList] = await connection.query(recomUserQuery(userId, 10));
    connection.release();

    if (recommendList.length === 0) {
      // console.log('fr: recommList is empty!');
      if (req.path === '/user') {
        await recomNewUsers(userId, res);
      } else if (req.path === '/card') {
        await recomNewCards(userId, res);
      }
      return;
    }

    req.recommendList = recommendList;  // attach to req
    next(); // move on to next middleware
  } catch (err) {
    connection?.release();
    logger.error('/routes/social/recomUser 폴더, get, err : ', err);
    res.status(500).send('Internal Server Error');
  }
};

/* recomUsersFunc()에서 호출 */
// 이 두 함수는 각각의 recomUser, Cards에서 반환하는 결과값의 속성들을
// 똑같이 로직을 줘야한다.
export const recomNewUsers = async (userId, res) => {
  let connection = null;
  try {
    connection = await db.getConnection();
    const [recommendList] = await connection.query(coldStartRecomQuery);
    /* recommendList는 가장 최근 생성된, 서로 다른 유저에 대한 파일 10개를 리턴한다 */
    /* 리턴값은 두 개. file_id, user_id */

    let data = [];
    // 각 원소에 대해 유저 정보와 팔로우 여부를 불러온다.
    for (const elem of recommendList) {
      const recomUser = elem.user_id;
      let tags = [];
      const [tagList] = await connection.query(tagQuery, recomUser);
      for (const item of tagList) {
        tags.push(item.tag);
      }

      /* user profile - name, img */
      const [profile] = await connection.query(profileQuery, recomUser);
      const [checkFollow] = await connection.query(followCheckQuery, [userId, recomUser]);
      const isFriend = checkFollow[0].count > 0 ? true : false;

      const userProfile = {
        userId: recomUser,
        img: profile[0].profile_img,
        userName: profile[0].user_name,
        tags: tags,
        isFriend: isFriend,
      };

      data.push(userProfile);
    }
    // console.log(data);
    connection.release();
    logger.info('/routes/social/recomUser 폴더, recomNewUsers 함수 get 성공 !');
    res.status(200).send(data);  
  } catch (err) {
    connection?.release();
    logger.error('/routes/social/recomUser 폴더, recomNewUsers 함수 get, err : ', err);
    res.status(500).send('Internal Server Error');
  }
};



export const recomNewCards = async (userId, res) => {
  let connection = null;
  try {
    connection = await db.getConnection();
    const [recommendList] = await connection.query(coldStartRecomQuery);
    /* recommendList는 가장 최근 생성된, 서로 다른 유저에 대한 파일 10개를 리턴한다 */
    /* 각 원소당 리턴값은 두 개. file_id, user_id */

    let cardList = [];
    // 각 원소당 카드 이미지/id와 함께 올린 유저 정보 리턴.
    for (const elem of recommendList) {
      const recomUser = elem.user_id;
      const recomCard = elem.file_id;

      let tags = [];
      const [tagList] = await connection.query(tagQuery, recomUser);
      for (const item of tagList) {
        tags.push(item.tag);
      }

      const [profile] = await connection.query(profileQuery, recomUser);
      const [checkFollow] = await connection.query(followCheckQuery, [userId, recomUser]);
      const isFriend = checkFollow[0].count > 0 ? true : false;

      const obj = {
        userId: recomUser,
        img: profile[0].profile_img,
        userName: profile[0].user_name,
        cardId: recomCard,
        tag: tags,
        cardImg: elem.img_url,      // elem[0]?
        isFriend: isFriend,         // 실질적인 체크
      };
      cardList.push(obj);
    }
    console.log('fr:', cardList);
    connection.release();
    logger.info('/routes/social/recomCard 폴더 recomNewCards함수, get 성공 !');
    res.status(200).send(cardList);
  } catch (err) {
    connection?.release();
    logger.error(
      '/routes/social/recomCard 폴더 recomNewCards함수, get, err : ',
      err,
    );
    res.status(500).send('Internal Server Error');
  }
};





/* 전역변수로 값 저장해서 불러오는 방법
- 같은 파일에(recommend.js) recomUser, recomCards를 둔다.
- recomUserFunc의 실행 값 (limit은 10으로)
- 값으로 가져와서 
  1) recomUsers의 인자, (여기선 상위 5개만.)
  2) recommendSimilarQuery의 인자로 넣자. 
*/

export const recomUsers = async (req, res) => {
  const { user } = res.locals;
  const userId = user.user_id;

  const recommendList = await req.recommendList;

  let connection = null;
  try {
    connection = await db.getConnection();
    
    /* 최종 리턴 */
    let data =[];

    /* 한 유저당 */
    for (const user of recommendList) {
      const recomUser = user.user_id;
      /* tag */
      let tags = [];
      const [tagList] = await connection.query(tagQuery, recomUser);
      for (const item of tagList) {
        tags.push(item.tag);
      }

      /* user profile - name, img */
      const [profile] = await connection.query(profileQuery, recomUser);
      const [checkFollow] = await connection.query(followCheckQuery, [userId, recomUser]);
      const isFriend = checkFollow[0].count > 0 ? true : false;

      const userProfile = {
        userId: recomUser,
        img: profile[0].profile_img,
        userName: profile[0].user_name,
        tags: tags,
        isFriend: isFriend,
      };

      data.push(userProfile);
    }

    connection.release();
    logger.info('/routes/social/recomUser 폴더, get 성공 !');
    res.status(200).send(data);  
  } catch (err) {
    connection?.release();
    logger.error('/routes/social/recomUser 폴더, get, err : ', err);
    res.status(500).send('Internal Server Error');
  }
};