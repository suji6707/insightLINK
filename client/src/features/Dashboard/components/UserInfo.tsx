import React, { useEffect, useState } from "react";
import { User_Info_Api } from "@/axios/dashBoardApi";
import { UserInfo } from "@/types/dashborad.types";

export default function UserInfo() {
  // 상태관리 로그인 id

  const [userInfo, setUserInfo] = useState<UserInfo>();

  const getUserInfoData = async () => {
    const response = await User_Info_Api();
    setUserInfo(response);
  };

  useEffect(() => {
    getUserInfoData();
    console.log(userInfo);
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-3xl">{userInfo?.userName}</h1>
        <div className="flex">
          <div className="p-2">
            <div>태그 수</div>
            <div>+{userInfo?.tagCnt}</div>
          </div>
          <div className="p-2">
            <div>카드 수</div>
            <div>+{userInfo?.cardCnt}</div>
          </div>
          <div className="p-2">
            <div>친구 수</div>
            <div>+{userInfo?.followCnt}</div>
          </div>
        </div>
      </div>
    </>
  );
}
