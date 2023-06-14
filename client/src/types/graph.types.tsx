type NodeType = {
  id: string;
  name: string;
  symbolSize: number;
  category: number;
};

type LinkType = {
  source: string;
  target: string;
};

interface CombineNodes {
  myChart: any;
  node1: NodeType; // 병합 목적지 노드 객체
  node2: NodeType; // 병합할 노드 객체
  nodes: NodeType[]; // 노드 리스트
  links: LinkType[]; // 링크 리스트
}
