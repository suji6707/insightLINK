import '../dotenv.js';
import { db } from '../connect.js';
import { userProfileQuery  } from '../db/userQueries.js';

import { logger } from '../winston/logger.js';

export const getUserProfile = async (req, res) => {
  const { user } = res.locals;
  const userId = user.user_id;
  let connection = null;
  try {
    connection = await db.getConnection();
    const [ result ] = await connection.query(userProfileQuery(userId));
    let profileImg = result[0].profile_img;
    let userName = result[0].user_name;

    if(!profileImg) {
        return res.status(204).send('User profile not found');
    }  

    const data = {
      userProfile : profileImg,
      userName,
    };
    connection.release();
    return res.status(200).send(data);
  } catch(err) {
    connection?.release();
    logger.error(`middlewares/userProfile폴더, getUserProfile 함수, get, error : ${err}`);
    res.status(500).send('Internal Server Error');
  }  
};