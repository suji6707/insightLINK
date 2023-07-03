import axios from "axios";
import { HeaderNoti_DTO } from "@/types/notification.types";

let token;

if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const Header_Notifications_API = async (): Promise<HeaderNoti_DTO[]> => {
  try {
    const response = await axiosInstance.get("/api/notification");
    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 204) {
      return Header_Notifications_API();
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
  return [];
};
