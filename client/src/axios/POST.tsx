import axios from "axios";

export const POST = async (uri: string, data: any, headers: any) => {
  try {
    const res = await axios.post(
      `http://localhost:8800/api/${uri}`,
      data,
      headers
    );
    console.log(`${uri} - POST 성공`);
    return res.data;
  } catch (err) {
    console.log(`${uri} - POST 실패`, err);
    return err;
  }
};
