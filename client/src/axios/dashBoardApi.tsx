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

export interface Card_Info_Api_DTO {
  data: {
    cardTag: string[]; // Add cardTag property
    cardContent: string; // Add cardContent property or modify as per your data structure
  }[];
}

export const Main_graph_Api = async (): Promise<Main_graph_Api_DTO> => {
  const response = await axios.get(`${api}/graph`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  const graph = response.data as Main_graph_Api_DTO;
  return graph;
};

export const User_Info_Api = async (params: number | undefined) => {
  try {
    const response = await axios.get(`${api}/members/${params}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// –

// export const Search_api = async (params: string | undefined) => {
//   try {
//     const response = await axios.post();
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }
