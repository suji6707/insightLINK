import axios from "axios";

export const POST = async (uri: string, data: any, headers: any) => {
  try {
    const res = await axios.post(
      uri,
      data,
      headers
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
