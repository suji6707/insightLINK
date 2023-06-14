const combineNodes = ({
  myChart,
  nodes,
  links,
  node1,
  node2,
}: CombineNodes) => {
  // 새 노드 생성. 속성은 두 노드를 기반으로 선택적으로 설정 가능
  const newNode = {
    id: node1.id,
    name: node1.name,
    symbolSize: node1.symbolSize + node2.symbolSize,
    category: node1.category,
  };
  // 두 노드와 연결된 모든 링크를 찾아 새 노드에 연결되도록 업데이트
  links.forEach((link) => {
    if (link.source === node1.id || link.source === node2.id) {
      link.source = newNode.id;
    }
    if (link.target === node1.id || link.target === node2.id) {
      link.target = newNode.id;
    }
  });
  // 두 노드 제거
  nodes = nodes.filter((node) => node.id !== node1.id && node.id !== node2.id);
  // 새 노드 추가
  nodes.push(newNode);
  // 새 데이터로 차트를 리렌더링
  myChart.setOption({ series: [{ data: nodes, links: links }] });
};

export default combineNodes;
