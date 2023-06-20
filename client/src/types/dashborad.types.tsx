export interface UserInfo {
  id: number;
  username: string;
  tags: number;
  cards: number;
  friends: number;
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
}

export interface CardData {
  cardId: number;
  cardTag: string[];
  cardContent: string;
}

export interface CardData_DTO {
  data: CardData[];
}
