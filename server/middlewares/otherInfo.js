import '../dotenv.js';
import { db } from '../connect.js';
import { userInfoQuery  } from '../db/userQueries.js';


export const getOtherInfo = async (req, res) => {
    const otherId = req.params.other_id;
    console.log('otherId : ',otherId);
    let connection = null;
    try {
        connection = await db.getConnection();
        const [ result ] = await connection.query(userInfoQuery(otherId));
        const cnt_query = `select COUNT(*) AS cnt from Follow where user_id = ${otherId}`;
        const cnt = await connection.query(cnt_query);

        console.log('result[0] : ',result[0]);
        const { userName , tagCnt, cardCnt } = result[0];
        let val = parseInt(tagCnt) / 2;
        let updatedTagCnt = val | 0;
        console.log('tagCnt : ',tagCnt);
        const data = {
        userName,
        tagCnt : updatedTagCnt,
        cardCnt: parseInt(cardCnt),
        followCnt: cnt[0][0]['cnt'], 
        };
        
        console.log('data : ',data);
        connection.release();
        return res.status(200).send(data);
    } catch(err) {
        connection?.release();
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};