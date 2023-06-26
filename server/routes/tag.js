import express from 'express';
import '../dotenv.js';
import { db } from '../connect.js';

import { logger } from '../winston/logger.js';

const router = express.Router();
let connection = null;
router.post('/merge', async (req, res) => {
    try {
        const { user } = res.locals;
        const userId = user.user_id;
        connection = await db.getConnection();
        const parentTag = parseInt(req.body.tagId1);
        const childTag = parseInt(req.body.tagId2);

        const [result] = await connection.query(`SELECT tag_index,tag FROM Tag WHERE file_id IN (SELECT file_id FROM File WHERE user_id = ${userId}) AND tag_index = ${parentTag}`);
        const parentName = result[0].tag;
        const resultQuery = `UPDATE Tag SET tag = '${parentName}', tag_index = ${parentTag} WHERE tag_index = ${childTag}`;

        await connection.query(resultQuery);

        connection.release();

        logger.info(`/routes/tag 폴더 /merge라우터, post 성공 !`);
        return res.status(200).send('success');
    } catch(err) {
        connection?.release();
        logger.error("/routes/tag 폴더 /merge라우터, post, err : ", err);
        res.status(400).send('request data 형식 오류');
    }
    }
);



export default router;