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
    const response = await axios.get(`${api}/member`);
    // const response = await axios.get(`${api}/member/${params}`);
  } catch (error) {
    console.log(error);
  }
};
