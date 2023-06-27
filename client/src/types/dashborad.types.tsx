export interface UserInfo {
  tagCnt: number;
  cardCnt: number;
  followCnt: number;
  userName: string;
}

export interface GraphNode {
  id: number;
  name: string;
  symbolSize: number;
  category: number;
  label: any;
}

interface GraphLink {
  source: string;
  target: string;
}

export interface Main_graph_Api_DTO {
  nodes: GraphNode[];
  links: GraphLink[];
  cnt: number;
}

export interface CardData {
  cardId: number;
  cardTag: string[];
  cardContent: string;
  cardImg: string;
}

export interface CardDataDetail {
  userId: number;
  cardId: number;
  cardTag: string[];
  content: string;
  cardImage: string;
}

export interface CardDetail_DTO {
  cardId: number;
  cardTag: string[];
  cardContent: string;
  cardImage: string;
}
