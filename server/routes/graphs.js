import express from 'express';
import '../dotenv.js';
import { db } from '../connect.js';
import { graphCountQuery, graphDirectionQuery } from '../db/graphQueries.js';
// import { authMiddleware } from '../middlewares/auth-middleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
  /* 유저정보 확인 */
  const { user } = res.locals;
  console.log(user.user_id);
  let connection = null;
  console.log(req.params.id);
  try {
    connection = await db.getConnection();

    // if (result[0]) {
    console.log('userId : 1 has been logged in!');
    // const token = jwt.sign({ userId: user.user_id }, 'customized-secret-key');
    // let responseList = [];
    // responseList.push({ success: true, token });
    // responseList.push({"graph" : })
    const [ graphCountResult ] = await connection.query(graphCountQuery(1));
    const [ graphDirectionResult ] = await connection.query(graphDirectionQuery(1));
    const graph = graphCountResult;

    // graph.nodes = graphCountResult;
    // graph.links = graphDirectionResult;
    const links = sortDirection(graphDirectionResult);
    res.send({graph, links});  
    // } else {
    // console.log('there is no such user. please register');
    // }
    connection.release();
  } catch (err) {
    connection?.release();
    console.log(err);
    res.status(500).send('Internal Server Error'); // Send error response
  }
});

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
      output.push({ source: nodes[0], target: nodes[1] });
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