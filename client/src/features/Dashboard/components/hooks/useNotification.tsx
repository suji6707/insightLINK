import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Header_Notifications_API } from "@/axios/headerApi";
import { HeaderNoti_DTO } from "@/types/notification.types";
import exp from "constants";

const useNotification = () => {
  const [notiArr, setNotiArr] = useState<HeaderNoti_DTO[] | null>([]);

  const notification = async () => {
    const noti = await Header_Notifications_API();
    if (noti.length > 0) {
      // 알림이 있는 경우에만 상태를 업데이트
      setNotiArr((prevNotiArr) =>
        prevNotiArr ? [...prevNotiArr, ...noti] : noti
      );
    }
  };

  // notification();

  return notiArr;
};

export default useNotification;
