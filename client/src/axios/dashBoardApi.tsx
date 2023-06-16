import axios from "axios";

const api = "http://localhost:8800/api";
const testapi = "http://localhost:4000";

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

interface Card {
  cardId: number;
  cardTag: string[];
  cardKeyword: string;
}

export interface Card_Info_Api_DTO {
  data: Card[];
}

export const Main_graph_Api = async (): Promise<Main_graph_Api_DTO> => {
  const response = await axios.get(`${testapi}/graph`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  const graph = response.data as Main_graph_Api_DTO;
  return graph;
};

export const User_Info_Api = async (params: number | undefined) => {
  try {
    const response = await axios.get(`${testapi}/members/${params}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const Card_Info_Api = async (
  params: string | undefined
): Promise<Card_Info_Api_DTO> => {
  const response = await axios.get(`${testapi}/tag?tagname=${params}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  const card = response.data as Promise<Card_Info_Api_DTO>;
  return card;
};

// export const Search_api = async (params: string | undefined) => {
//   try {
//     const response = await axios.post();
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };
