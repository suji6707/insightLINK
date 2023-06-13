import axios from "axios";

export const POST = async (uri: string, data: any, headers: any) => {
  try {
    const res = await axios.post("http://localhost:8800" + uri, data, {
      headers: headers,
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
