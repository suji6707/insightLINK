import express from 'express';
import '../dotenv.js';
import { db } from '../connect.js';
import { searchContent , searchTag} from '../db/searchQueries.js';

const router = express.Router();

router.get('/contents', async (req, res) => {
  // console.log(req.query);
  const { search } = req.query;

  let connection = null;

  try {
    connection = await db.getConnection();
    const [ result ] = await connection.query(searchContent(search));

    let arr = [];
    for (let i = 0; i < result.length / 2; i++) {
      arr.push({
        cardTags: [result[i * 2].tag, result[i + 1].tag],
        cardKeyword: '# 1',
        cardContent: result[i * 2].content,
      });
    }
    // console.log(arr[0]);

    return res.send({results: [arr[0]]});
  } catch(err) {
    connection?.release();
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/tags', async (req, res) => {
  // console.log(req.query);
  const { search } = req.query;
  console.log(req.query);

  let connection = null;

  try {
    connection = await db.getConnection();
    const [ result ] = await connection.query(searchTag(search));

    let arr = [];
    for (let i = 0; i < result.length / 2; i++) {
      arr.push({
        cardTags: [result[i * 2].tag, result[i + 1].tag],
        cardKeyword: '# 1',
        cardContent: result[i * 2].content,
      });
    }
    // console.log(arr[0]);

    return res.send({results: [arr[0]]});
  } catch(err) {
    connection?.release();
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/contents/all', async (req, res) => {
  // console.log(req.query);
  const { search } = req.query;

  let connection = null;

  try {
    connection = await db.getConnection();
    const [ result ] = await connection.query(searchContent(search));
    console.log(result.length);

    let arr = [];
    for (let i = 0; i < result.length / 2; i++) {
      arr.push({
        cardTags: [result[i * 2].tag, result[i + 1].tag],
        cardKeyword: `# ${i+1}`,
        cardContent: result[i * 2].content,
      });
    }
    // console.log(arr[0]);

    return res.send({results: arr});
  } catch(err) {
    connection?.release();
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/tags/all', async (req, res) => {
  // console.log(req.query);
  const { search } = req.query;

  let connection = null;

  try {
    connection = await db.getConnection();
    const [ result ] = await connection.query(searchTag(search));
    console.log(result.length);

    let arr = [];
    for (let i = 0; i < result.length / 2; i++) {
      arr.push({
        cardTags: [result[i * 2].tag, result[i + 1].tag],
        cardKeyword: `# ${i+1}`,
        cardContent: result[i * 2].content,
      });
    }
    // console.log(arr[0]);

    return res.send({results: arr});
  } catch(err) {
    connection?.release();
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

export default router;