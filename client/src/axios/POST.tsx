import axios from "axios";

export const POST = async (uri: string, data: any, headers: any) => {
  try {
    const res = await axios.post(`/api/${uri}`, data, headers);
    console.log(`${uri} - POST 성공`);
    return res;
  } catch (err) {
    console.log(`${uri} - POST 실패`, err);
    return err;
  }
};
