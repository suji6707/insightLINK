import express from 'express';
import '../dotenv.js';
import { db } from '../connect.js';
import { graphCountQuery, graphDirectionQuery } from '../db/graphQueries.js';
/* log */
import { logger } from '../winston/logger.js';



function cycleCount(graphLinks, n, m) {
  // n은 노드 개수, m은 간선 개수
  let adj = Array.from({ length: n }, () => []);   // 노드의 개수(n+1)를 기반으로 각 노드에 대해 빈 배열 초기화
  let visited = Array(n).fill(0);                  // [0] * (n + 1)
  let count = 0;

  // 양방향 연결 표시. 결국 중복제거 하지만, DFS하려면 어쩔 수 없음.
  for (let link of graphLinks) {
    let [a, b] = link.map(num => num - 1); // a and b are 0-based
    adj[a].push(b);
    adj[b].push(a);
  }   
  let groupList = [];

  for (let i = 0; i < n; i++) {
    if (visited[i] === 0) {
      DFS(i, adj, count, visited, groupList);
      // groupList.push(count);
      count += 1;
    }
  }

  return groupList;
}

/* m과 연결된 노드를 방문 */
function DFS(v, adj, count, visited, groupList) {
  visited[v] = 1;
  groupList[v] = count;

  for (const next_node of adj[v]) {
    if (visited[next_node] === 0) {
      DFS(next_node, adj, count, visited, groupList);
    }
  }
}



const router = express.Router();

router.get('/', async (req, res) => {

  let userId = undefined;
  if(Object.keys(res.locals).length !==0) { // /api/graph 이면서 token 값 있는 경우 사용자 정보
    /* 로그인 유저*/
    const {user} = res.locals;
    userId = user.user_id;
  }

  /* 다른 유저 */
  const otherUserId = req.query.userId;

  logger.info(`/routes/graphs 폴더, get, otherUserId : ${otherUserId}`);

  try {
    /* 다른 유저 그래프 조회 */
    if (otherUserId) {
      const graphData = await getGraphData(otherUserId);
      logger.info(
        `/routes/graphs 폴더, get, 다른 유저 ${otherUserId} 그래프 조회 !`
      )
      return res.send(graphData)
    } 
    
    /* 기본 내 그래프 조회 */
    const graphData = await getGraphData(userId);
    logger.info(`/routes/graphs 폴더, get, 내 ${userId} 그래프 조회 !`);
    res.send(graphData);
  } catch (err) {
    logger.error('/routes/graphs 폴더, get, err : ', err);
    res.status(500).send('Internal Server Error'); // Send error response
  }
});





const getGraphData = async (userId) => {
  let connection = null;
  try {
    connection = await db.getConnection();
    logger.info(
      `/routes/graphs 폴더, get, userId : ${userId} has been logged in!`,
    );

    const [graphCountResult] = await connection.query(graphCountQuery(userId));

    /* get Max size */
    let maxSymbolSize = 0;
    for (let i = 0; i < graphCountResult.length; i++) {
      const symbolSize = graphCountResult[i].symbolSize;
      maxSymbolSize = symbolSize > maxSymbolSize ? symbolSize : maxSymbolSize;
    }
    /* 심볼사이즈 정규화 */
    for (let i = 0; i < graphCountResult.length; i++) {
      const symbolSize = graphCountResult[i].symbolSize;
      // const newSymbolSize = (symbolSize / maxSymbolSize) * 70;
      const newSymbolSize = (Math.log(symbolSize + 1) / Math.log(maxSymbolSize + 1)) * 70;
      graphCountResult[i].symbolSize = newSymbolSize;
    }

    const [graphDirectionResult] = await connection.query(
      graphDirectionQuery(userId),
    );

    let graph = {
      nodes: graphCountResult,
      links: sortDirection(graphDirectionResult),
    };

    // ============================================
    const graphLinks = graph.links.map((link) => [link.source, link.target]);
    const n = graph.nodes.length;
    const m = graphLinks.length;

    const categoryList = cycleCount(graphLinks, n, m);
    graph.nodes.forEach((node, index) => {
      node.category = categoryList[index];
    }); 
    // ============================================

    // graph.cnt  
    let maxCategory = -Infinity;
    for (const node of graph.nodes) {
      if (node.category > maxCategory) {
        maxCategory = node.category;
      }
    }
    graph.cnt = maxCategory;

    return graph;
  } catch (err) {
    connection?.release();
    logger.error('/routes/graphs 폴더, get, err : ', err);
    throw new Error('Internal Server Error');
  }
};








const getCombination = (arr, result) => {
  for (let i = 0; i < arr.length; i++) {   // 각 node
    for (let j = i + 1; j < arr.length; j++) {
      result.push({ source: arr[i].toString(), target: arr[j].toString() });
    }
  }
  return result;
};

const compareObjects = (obj1, obj2) => {
  return (
    (obj1.source === obj2.target && obj1.target === obj2.source) ||
    (obj1.source === obj2.source && obj1.target === obj2.target)
  );
};





const sortDirection = (graphDirectionResult) => {
  const fileAndNode = graphDirectionResult;
  // console.log('fr: fileAndNode: ', fileAndNode);
  const output = [];

  const groupedNodes = fileAndNode.reduce((acc, { file, node }) => {
    if (!acc[file]) {
      acc[file] = [node];
    } else {
      acc[file].push(node);
    }
    return acc;
  }, {});

  for (const file in groupedNodes) {    // 한 file = '6': [50, 51, 52]
    const nodes = groupedNodes[file];   // nodes = [50, 51, 52]  
    if (nodes.length > 1) {
      getCombination(nodes, output);
    }
  }

  const uniqueList = output.filter((obj, index, self) => {
    return index === self.findIndex((o) => compareObjects(o, obj));
  });

  return uniqueList;
};

export default router;
