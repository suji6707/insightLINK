import express from 'express';
import '../dotenv.js';
import { db } from '../connect.js';

const router = express.Router();
let connection = null;
router.post('/merge', async (req, res) => {
    try {
        connection = await db.getConnection();
        const parentTag = parseInt(req.body.tagId1);
        const childTag = parseInt(req.body.tagId2);

        const [result] = await connection.query(`SELECT tag FROM Tag WHERE tag_index = ${parentTag}`);
        const parentName = result[0].tag;
        const resultQuery = `UPDATE Tag SET tag = '${parentName}', tag_index = ${parentTag} WHERE tag_index = ${childTag}`;

        await connection.query(resultQuery);

        connection.release();
        return res.status(200).send('요청, 조회 성공');
    } catch(err) {
        connection?.release();
        console.log(err);
        res.status(400).send('request data 형식 오류');
    }
    }
);



export default router;