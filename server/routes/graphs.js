import express from 'express';
import '../dotenv.js';
import { db } from '../connect.js';
import { graphCountQuery, graphDirectionQuery } from '../db/graphQueries.js';

const router = express.Router();


router.get('/', async (req, res) => {
  /* 로그인 유저*/
  const { user } = res.locals;
  const userId = user.user_id;
  /* 다른 유저 */
  const otherUserId = req.query.userId;
  console.log(otherUserId);

  try {
    /* 다른 유저 그래프 조회 */
    if (otherUserId) {
      const graphData = await getGraphData(otherUserId);
      return res.send(graphData);
    }
    /* 기본 내 그래프 조회 */
    const graphData = await getGraphData(userId);
    res.send(graphData);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error'); // Send error response
  }
});



const getGraphData = async (userId) => {
  let connection = null;
  try {
    connection = await db.getConnection();

    console.log(`userId : ${userId} has been logged in!`);

    const [ graphCountResult ] = await connection.query(graphCountQuery(userId));
    const [ graphDirectionResult ] = await connection.query(graphDirectionQuery(userId));
    let graph = {
      nodes: graphCountResult,
      links: sortDirection(graphDirectionResult),
    };
    // console.log(graph);
    connection.release();
    return graph;  
  } catch (err) {
    connection?.release();
    console.log(err);
    throw new Error('Internal Server Error');
  }
};



const sortDirection = (graphDirectionResult) => {
  const fileAndNode = graphDirectionResult;
  const output = [];
  const groupedNodes = fileAndNode.reduce((acc, { file, node }) => {
    if (!acc[file]) {
      acc[file] = [node];
    } else {
      acc[file].push(node);
    }
    return acc;
  }, {});

  for (const file in groupedNodes) {
    const nodes = groupedNodes[file];
    if (nodes.length > 1) {
      output.push({ source: nodes[0].toString(), target: nodes[1].toString() });
    }
  }

  const compareObjects = (obj1, obj2) => {
    return (
      (obj1.source === obj2.target && obj1.target === obj2.source) ||
      (obj1.source === obj2.source && obj1.target === obj2.target)
    );
  };
  
  const uniqueList = output.filter((obj, index, self) => {
    return index === self.findIndex((o) => compareObjects(o, obj));
  });
  
  return uniqueList;
};


export default router;