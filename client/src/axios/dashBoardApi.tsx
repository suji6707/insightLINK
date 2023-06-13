import axios from "axios";
const api = "http://localhost:4000";

interface GraphNode {
  id: string
  name: string
  symbolSize: number
  category: number
}

interface GraphLink {
  source: string
  target: string
}

export interface Main_graph_Api_DTO {
  nodes: GraphNode[]
  links: GraphLink[]
}

export const Main_graph_Api = async ():Promise<Main_graph_Api_DTO> => {
  const response = await axios.get(`${api}/graph`);
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

// export const Search_api = async (params: string | undefined) => {
//   try {
//     const response = await axios.post();
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };
