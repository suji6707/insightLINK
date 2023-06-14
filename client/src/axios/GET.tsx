import axios, { AxiosResponse } from "axios";

export const GET = async (uri: string, headers?: any): Promise<any | null> => {
  try {
    let res: AxiosResponse;
    if (headers) {
      res = await axios.get(`http://localhost:8800/api/${uri}`, headers);
    } else {
      res = await axios.get(`http://localhost:8800/api/${uri}`);
    }
    console.log("GET 성공");
    return res.data;
  } catch (err) {
    console.log("GET 실패", err);
    return null;
  }
};
