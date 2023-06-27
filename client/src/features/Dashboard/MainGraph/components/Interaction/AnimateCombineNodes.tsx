import { ECharts } from "echarts";

const animateCombineNodes = (
  chart: ECharts,
  nodes: ChartNode[],
  links: ChartLink[],
  node1: ChartNode,
  node2: ChartNode,
  newNode: ChartNode,
  duration: number
) => {
  const startTime = performance.now();

  // 🚨 서서히 node1으로 node2가 이동하게 수정 필요
  const animateStep = (timestamp: number) => {
    const progress = (timestamp - startTime) / duration;

    if (progress < 1) {
      const symbolSize =
        node1.symbolSize + progress * (newNode.symbolSize - node1.symbolSize);

      nodes = nodes.map((node) => {
        if (node.id === node1.id) {
          return { ...node, symbolSize };
        }
        if (node.id === node2.id) {
          return { ...node, x: newNode.x, y: newNode.y };
        }
        return node;
      });

      chart.setOption({ series: [{ data: nodes, links }] });

      requestAnimationFrame(animateStep);
    } else {
      // 애니메이션이 끝나면 새 노드로 대체
      nodes = nodes.filter(
        (node) => node.id !== node1.id && node.id !== node2.id
      );
      nodes.push(newNode);

      // 노드 병합에 따른 링크 수정
      links = links.map((link) => {
        if (link.source === node1.id || link.source === node2.id) {
          return { ...link, source: newNode.id };
        }
        if (link.target === node1.id || link.target === node2.id) {
          return { ...link, target: newNode.id };
        }
        return link;
      });

      chart.setOption({ series: [{ data: nodes, links }] });
    }
  };

  requestAnimationFrame(animateStep);
};

export default animateCombineNodes;
