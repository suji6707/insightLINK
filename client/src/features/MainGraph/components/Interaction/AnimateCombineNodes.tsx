const animateCombineNodes = (
  myChart: any,
  nodes: ChartNode[],
  links: ChartLink[],
  node1: ChartNode,
  node2: ChartNode,
  newNode: ChartNode,
  duration: number
) => {
  const startTime = performance.now();

  const animateStep = (timestamp: number) => {
    const progress = (timestamp - startTime) / duration;

    if (progress < 1) {
      // node1을 node2 쪽으로 이동
      const x = node1.x + progress * (node2.x - node1.x);
      const y = node1.y + progress * (node2.y - node1.y);

      // 새 노드 크기를 점점 키우기
      const symbolSize =
        node1.symbolSize + progress * (newNode.symbolSize - node1.symbolSize);

      nodes = nodes.map((node) => {
        if (node.id === node1.id) {
          return { ...node, x, y, symbolSize };
        }
        return node;
      });

      myChart.setOption({ series: [{ data: nodes, links }] });

      requestAnimationFrame(animateStep);
    } else {
      // 애니메이션이 끝나면 새 노드로 대체
      nodes = nodes.filter(
        (node) => node.id !== node1.id && node.id !== node2.id
      );
      nodes.push(newNode);

      myChart.setOption({ series: [{ data: nodes, links }] });
    }
  };

  requestAnimationFrame(animateStep);
};

export default animateCombineNodes;
