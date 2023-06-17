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

// 태그 병합
type ChartNode = {
  id: string;
  name: string;
  x: number;
  y: number;
  symbolSize: number;
  category: string;
  itemStyle?: {
    borderColor: string;
    borderWidth: number;
  };
};

type ChartLink = {
  source: string;
  target: string;
};

type CombineNodesParams = {
  chart: any; // 타입 변경 필요
  nodes: ChartNode[];
  links: ChartLink[];
  node1: ChartNode;
  node2: ChartNode;
};
