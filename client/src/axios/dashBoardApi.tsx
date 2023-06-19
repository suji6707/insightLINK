import axios from "axios";
import { Main_graph_Api_DTO, CardData_DTO } from "@/types/dashborad.types";

const api = "http://localhost:8800/api";
const testapi = "http://localhost:4000";

export const Main_graph_Api = async (): Promise<Main_graph_Api_DTO> => {
  const response = await axios.get(`${api}/graph`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  const graph = response.data as Main_graph_Api_DTO;
  return graph;
};

export const User_Info_Api = async (params: number | undefined) => {
  try {
    const response = await axios.get(`${api}/userinfo`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const Card_Info_Api = async (
  params: string | undefined
): Promise<CardData_DTO> => {
  const response = await axios.get(`${api}/cards/tag?tagname=${params}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  const card = response.data as Promise<CardData_DTO>;
  return card;
};

// export const Search_api = async (params: string | undefined) => {
//   try {
//     const response = await axios.post();
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }
