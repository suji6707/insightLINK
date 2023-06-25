import axios from "axios";
import {
  UserInfo,
  Main_graph_Api_DTO,
  CardData,
  CardDataDetail,
} from "@/types/dashborad.types";

const api = "http://localhost:8800/api";
const testapi = "http://localhost:4000";

export const Main_graph_Api = async (
  userid?: string
): Promise<Main_graph_Api_DTO> => {
  console.log("api", userid);
  let url = `${api}/graph`;
  if (userid) {
    url += `?userId=${userid}`;
  }
  console.log("url check 1", url);

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  const graph = response.data as Main_graph_Api_DTO;

  console.log("url check 2", url);

  return graph;
};

export const User_Info_Api = async (
  userid: string | undefined
): Promise<UserInfo> => {
  let url = `${api}/user`;
  if (userid) {
    url += `/${userid}`;
  }

  const response = await axios.get(`${api}/user`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  const userData = response.data as Promise<UserInfo>;
  console.log("User_Info_Api 호출");
  return userData;
};

export const Card_Info_Api = async (
  params: string | null,
  userid: string | undefined
): Promise<CardData[]> => {
  let url = `${api}/cards/tag?tagname=${params}`;
  if (userid) {
    url += `&{:userId}`;
  }

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  const card = response.data as Promise<CardData[]>;
  console.log("Card_Info_Api 호출");
  return card;
};

export const Card_Detail_Api = async (
  params: number | null,
  userid: string | undefined
): Promise<CardDataDetail> => {
  let url = `${api}/cards/info?cardId=${params}`;
  if (userid) {
    url += `&${userid}`;
  }

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  const card = response.data as Promise<CardDataDetail>;
  console.log("Card_Detail_Api 호출");
  return card;
};

export const Card_Edit_Api = async (
  params: number | undefined,
  data: string | undefined
) => {
  const response = await axios.patch(
    `${api}/cards/update/${params}`,
    { content: data },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response;
};

export const Card_Delete_Api = async (params: number | undefined) => {
  const response = await axios.delete(`${api}/cards/delete/${params}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response;
};

export const Add_Follow_API = async (params: string | undefined) => {
  const response = await axios.get(`${api}/social/follow/${params}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response;
};

export const Cancel_Follow_API = async (params: string | undefined) => {
  const response = await axios.delete(`${api}/social/follow/${params}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response;
};
