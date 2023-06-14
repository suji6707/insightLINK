import jwt from'jsonwebtoken';
import '../dotenv.js';
import { db } from '../connect.js';

export const authMiddleware = async (req, res, next) => {
  // console.log(req.headers);
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || '').split(' ');

  if (!authToken || authType !== 'Bearer') {
    res.status(401).send({
      errorMessage: 'This function is available after logging in.',
    });
    return;
  }

  try {
    const { userId } = jwt.verify(authToken, 'customized-secret-key');
    console.log(userId);

    const connection = await db.getConnection();
    const sql = `SELECT * FROM User
                   WHERE user_id = '${userId}'`;
    const [result] = await connection.query(sql);
    connection.release();

    if (result.length === 0) {
      res.status(401).send({
        errorMessage: 'User not found.',
      });
      return;
    }
