import '../dotenv.js';
import { db } from '../connect.js';
import { userProfileQuery  } from '../db/userQueries.js';


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
    console.log(err);
    res.status(500).send('Internal Server Error');
  }  
};