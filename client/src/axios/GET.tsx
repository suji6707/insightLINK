import axios, { AxiosResponse } from "axios";

export const GET = async (uri: string, headers?: any): Promise<any | null> => {
  try {
    let res: AxiosResponse;
    if (headers) {
      res = await axios.get(`${process.env.SOURCE_PATH}/api/${uri}`, headers);
    } else {
      res = await axios.get(`${process.env.SOURCE_PATH}/api/${uri}`);
    }
    console.log(`${uri} - GET 성공`);
    return res;
  } catch (err) {
    console.log(`${uri} - GET 실패`, err);
    return err;
  }
};
