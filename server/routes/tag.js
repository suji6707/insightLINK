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

        const [result] = await connection.query(`SELECT tag_index,tag FROM Tag WHERE tag_id = ${parentTag}`);
        const [result2] = await connection.query(`SELECT tag from Tag where tag_id= ${childTag};`);
            
        /*  --- 에러 처리  --- */
        // if (result.length === 0 || result2.length === 0) {
        //     // 적절한 결과가 없을 경우 에러 처리
        //     connection.release();
        //     return res.status(400).send('request data 형식 오류.');
        //   }

        // const isInvalidResult = (result) => {
        //     // 반환된 값이 ColumnDefinition 인스턴스인지 확인
        //     return result.some((row) => row instanceof db.ColumnDefinition);
        //   };
        
        //   if (isInvalidResult(result) || isInvalidResult(result2)) {
        //     // 적절한 결과가 없을 경우 에러 처리
        //     connection.release();
        //     return res.status(400).send('적합한 태그가 아닙니다.');
        //   }
        /*  --- 에러 처리 End --- */

        const parentIndex = parseInt(result[0].tag_index);
        const parentName = result[0].tag;
        const childName = result2[0].tag;
        const resultQuery = `UPDATE Tag SET tag = '${parentName}', tag_index = ${parentIndex} WHERE tag = '${childName}'`;
        
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