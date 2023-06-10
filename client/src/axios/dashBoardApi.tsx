import axios from "axios";
const api = "http://localhost:4000/";

export const Main_graph_Api = async () => {
  try {
    const response = await axios.get(`${api}graph`);
    const graph = response.data;
    return graph;
  } catch (error) {
    console.log(error);
  }
};
