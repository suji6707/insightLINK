import axios from "axios";
const api = "http://localhost:4000";

export const Main_graph_Api = async () => {
  try {
    const response = await axios.get(`${api}/graph`);
    const graph = response.data;
    return graph;
  } catch (error) {
    console.log(error);
  }
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
