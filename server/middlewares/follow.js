import '../dotenv.js';
import { db } from '../connect.js';
import { followAddQuery } from '../db/followQueries.js';
import { followDeleteQuery } from '../db/followQueries.js';


export const followAdd = async (req, res) => {
  const { user } = res.locals;
  const userId = user.user_id;
  const following_id = req.query.followId;

  let connection = null;
  try {
    connection = await db.getConnection();
    const [result] = await connection.query(followAddQuery, [userId, following_id]);
    connection.release();
    res.status(200).send(`User ${userId} has started following User ${following_id}.`);
  } catch (err) {
    connection?.release();
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};


export const followDelete = async (req, res) => {
  const { user } = res.locals;
  const userId = user.user_id;
  const following_id = req.query.followId;

  let connection = null;
  try {
    connection = await db.getConnection();
    const [result] = await connection.query(followDeleteQuery, [userId, following_id]);
    connection.release();
    res.status(200).send(`User ${userId} has canceled a follow to User ${following_id}.`);
  } catch (err) {
    connection?.release();
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};


