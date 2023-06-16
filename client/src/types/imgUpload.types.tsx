type ImageListProps = {
  imgList: string[];
  deleteImg: (index: number) => void;
};

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
  myChart: any; // 타입 변경 필요
  nodes: ChartNode[];
  links: ChartLink[];
  node1: ChartNode;
  node2: ChartNode;
};
