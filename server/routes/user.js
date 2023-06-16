import express from 'express';
import '../dotenv.js';
import { db } from '../connect.js';
import { userInfoQuery , userProfileQuery } from '../db/userQueries.js'


const router = express.Router();

router.get('/', async (req, res) => {
    const { user } = res.locals;
    const userId = user.user_id;
    let connection = null;
    try {
        connection = await db.getConnection();
        const [ result ] = await connection.query(userInfoQuery(userId));
        const { userName , tagCnt, cardCnt } = result[0];
        const data = {
            userName,
            tagCnt: parseInt(tagCnt),
            cardCnt: parseInt(cardCnt),
            followCnt: 0, // 예시로 followCnt 값은 0으로 설정
        };
        connection.release();
        return res.status(200).send(data);
    } catch(err) {
        connection?.release();
        console.log(err);
        res.status(500).send('Internal Server Error');
    }

});

router.get('/profile', async (req, res) => {
    const { user } = res.locals;
    const userId = user.user_id;
    let connection = null
    try {
        connection = await db.getConnection();
        const [ result ] = await connection.query(userProfileQuery(userId));
        
        if (result.length === 0) {
            return res.status(404).send('User profile not found');
        }
        const { profile_img } = result[0];
        const data = {
            userProfile : profile_img
        }
        console.log(profile_img);
        
        connection.release();
        return res.status(200).send(data);
    } catch(err) {
        connection?.release();
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
    
});



export default router;