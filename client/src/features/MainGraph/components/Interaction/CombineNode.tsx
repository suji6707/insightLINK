import animateCombineNodes from "./AnimateCombineNodes";

const combineNodes = ({
  myChart,
  nodes,
  links,
  node1,
  node2,
}: CombineNodesParams) => {
  // 새 노드 생성
  const newNode: ChartNode = {
    id: node1.id,
    name: node1.name,
    x: node2.x,
    y: node2.y,
    symbolSize: node1.symbolSize + node2.symbolSize,
    category: node1.category,
  };

  // 애니메이션 시작
  animateCombineNodes(myChart, nodes, links, node1, node2, newNode, 1000); // 1000ms duration

  return 1;
};

export default combineNodes;
