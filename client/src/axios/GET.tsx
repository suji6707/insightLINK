import axios from "axios";

export const GET = async (uri: string, headers?: any) => {
  const config = headers ? { headers: headers } : {};
  try {
    const res = await axios.get("http://localhost:4000/" + uri, config);
    console.log("GET 성공");
    return res.data;
  } catch (err) {
    console.log("GET 실패", err);
    return null;
  }
};
