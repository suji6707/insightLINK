export interface UserInfo {
  userName: string;
  tagCnt: number;
  cardCnt: number;
  followCnt: number;
}

interface GraphNode {
  id: string;
  name: string;
  symbolSize: number;
  category: number;
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
  cardImage: string;
}

export interface CardData_DTO {
  data: CardData[];
}

export interface CardDetail_DTO {
  cardId: number;
  cardTag: string[];
  cardContent: string;
  cardImage: string;
}
