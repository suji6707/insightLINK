import axios from "axios";
import {
  UserInfo,
  Main_graph_Api_DTO,
  CardData,
  CardDataDetail,
} from "@/types/dashborad.types";

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const Main_graph_Api = async (
  userid?: string
): Promise<Main_graph_Api_DTO> => {
  let url = `/graph${userid ? `?userId=${userid}` : ""}`;

  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const User_Info_Api = async (userid?: string): Promise<UserInfo> => {
  let url = `/user${userid ? `/${userid}` : ""}`;

  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const Card_Info_Api = async (
  tagname?: string,
  userid?: string
): Promise<CardData[]> => {
  let url = `/cards/tag${tagname ? `?tagname=${tagname}` : ""}${
    userid ? `&userId=${userid}` : ""
  }`;

  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const Card_Detail_Api = async (
  cardId?: number,
  userid?: string
): Promise<CardDataDetail> => {
  let url = `/cards/info${cardId ? `?cardId=${cardId}` : ""}${
    userid ? `&userId=${userid}` : ""
  }`;

  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const Card_Edit_Api = async (params?: number, data?: string) => {
  try {
    const response = await axiosInstance.patch(`/cards/update/${params}`, {
      content: data,
    });
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const Card_Delete_Api = async (params?: number) => {
  try {
    const response = await axiosInstance.delete(`/cards/delete/${params}`);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const Add_Follow_API = async (followId?: string) => {
  try {
    const response = await axiosInstance.post(
      `/social/follow${followId ? `?followId=${followId}` : ""}`
    );
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const Cancel_Follow_API = async (params?: string) => {
  try {
    const response = await axiosInstance.delete(`/social/follow/${params}`);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const Duplicate_Card_API = async (cardId?: string, tagId?: string) => {
  let url = `/cards/copy${cardId ? `?cardId=${cardId}` : ""}${
    tagId ? `&tagId=${tagId}` : ""
  }`;

  try {
    const response = await axiosInstance.post(url);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
