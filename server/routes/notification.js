import express from 'express';
import '../dotenv.js';
import { db } from '../connect.js';
import { deleteAlarmQuery, AlarmQuery } from '../db/alarmQueries.js';

import { logger } from '../winston/logger.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { user } = res.locals;
  const userNotification = {};
  const userId = user.user_id;
  let connection = null;

  try {
    connection = await db.getConnection();
    const [result] = await connection.query(AlarmQuery(userId));

    if (!userNotification[userId]) {
      userNotification[userId] = [];
    }

    for (let i = 0; i < result.length; i++) {
      let temp = {
        "case": result[i].case,
        "sender": result[i].sender
      };
      console.log("temp: ", temp);
      userNotification[userId].push(temp);
    }

    const timeout = setTimeout(async () => {
      await connection.query(deleteAlarmQuery(userId)); // 알림 삭제 쿼리 실행
      res.status(204).end(); // 응답이 없는 경우 204 No Content로 응답
    }, 30000); // 30초 동안 응답이 없으면 요청 타임아웃 처리

    const checkNotifications = () => {
      if (userNotification[userId].length > 0) {
        clearTimeout(timeout);

        if (!res.headersSent) {
          res.json(userNotification[userId].shift());
        }
        if (userNotification[userId].length > 0) {
          setTimeout(checkNotifications, 1000);
        }
      } else {
        setTimeout(checkNotifications, 1000);
      }
    };
    checkNotifications();
  } catch (err) {
    connection?.release();
    logger.error("/routes/notification 폴더, get, err: ", err);
    res.status(500).send('Internal Server Error');
  }
});



export default router;