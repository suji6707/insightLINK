import express from 'express'
import '../dotenv.js'
import { db } from '../connect.js'

import { logger } from '../winston/logger.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const { user } = res.locals

  try {
    const userInfo = {
      name: user.user_name,
      email: user.email,
      image: user.profile_img,
    }
    logger.info(`/routes/mypage 폴더, get 성공 !`);
    res.send({ success: true, userInfo })
  } catch (err) {
    connection?.release()
    logger.error("/routes/mypage 폴더, get, err : ", err);
    res.status(500).send('Internal Server Error')
  }
})

router.patch('/', async (req, res) => {
  const userId = res.locals.user.user_id
  const editedNickname = req.body.editedNickname

  let connection = null
  try {
    connection = await db.getConnection();
    const sql = `UPDATE User
                    SET user_name = '${editedNickname}'
                    WHERE user_id = ${userId};`

    await connection.query(sql)
    connection.release()

    logger.info(`/routes/mypage 폴더, patch 성공 !`);
    res.send({ success: true })
  } catch (err) {
    connection?.release()
    logger.error("/routes/mypage 폴더, patch, err : ", err);
    res.status(500).send('Internal Server Error') // Send error response
  }
})

router.delete('/', async (req, res) => {
  const userId = res.locals.user.user_id
  console.log('탈퇴할 회원 id: ', userId)

  let connection = null
  try {
    connection = await db.getConnection()
    const sql = `DELETE FROM User WHERE user_id = ${userId};`

    await connection.query(sql)
    connection.release()

    logger.info(`/routes/mypage 폴더, userId : ${userId}, delete 성공 !`);
    res.send({ success: true })
  } catch (err) {
    connection?.release()
    logger.error("/routes/mypage 폴더, delete, err : ", err);
    res.status(500).send('Internal Server Error') // Send error response
  }
})

export default router
