import express from 'express';
import '../dotenv.js';
import { db } from '../connect.js';


const router = express.Router();

router.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
  
    const { user } = res.locals;
    const userId = user.user_id;
  
    const eventData = { message: 'Hello, Event!' };
  
    let connection = null;
    try {
      connection = await db.getConnection();
      const interval = setInterval(() => {
        res.write(`data: ${JSON.stringify(eventData)}\n\n`);
        console.log('진행중이야~~');
      }, 2000);
  
    // 클라이언트와의 연결이 종료될 때 interval 제거
      req.on('close', () => {
        clearInterval(interval);
        connection.release();
      });
    } catch(err) {
      connection?.release();
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  });

export default router;