import express from 'express';
import '../dotenv.js';
import { db } from '../connect.js';
import { graphCountQuery, graphDirectionQuery } from '../db/graphQueries.js';


const router = express.Router();


router.get('/', async (req, res) => {
  /* 유저정보 확인 */
  const { user } = res.locals;    // authMiddleware 리턴값
  const useId = user.user_id;
  console.log(useId);

  let connection = null;
  console.log(req.params.id);
  try {
    connection = await db.getConnection();
    // const selectUserByEmail = `SELECT user_id FROM Users 
    //     WHERE email = '${email}' AND imageUrl='${imageUrl}'`;
    // const [ userResult ] = await connection.query(selectUserByEmail);
    // const { user } = res.locals;
    // const userId = user.userId;    

    // if (result[0]) {
    console.log(`userId : ${useId} has been logged in!`);
    // const token = jwt.sign({ userId: 1 }, 'customized-secret-key');
    // let responseList = [];
    // responseList.push({ success: true, token });
    // responseList.push({"graph" : })
    const [ graphCountResult ] = await connection.query(graphCountQuery(useId));
    const [ graphDirectionResult ] = await connection.query(graphDirectionQuery(useId));
    let graph = {
      nodes: graphCountResult,
      links: sortDirection(graphDirectionResult),
    };
    // graph.nodes = graphCountResult;
    // graph.links = sortDirection(graphDirectionResult);
    console.log(graph);
    res.send(graph);  
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