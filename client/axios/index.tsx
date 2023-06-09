import axios from "axios";

export const POSTImg = (data: any) => {
  axios
    .post("http://localhost:3000" + `upload/${1}`, data, {
      headers: {
        token: 1,
      },
    })
    .then((res: any) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err: any) => {
      console.log(err);
    });
};
