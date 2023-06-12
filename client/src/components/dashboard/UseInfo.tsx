import React, { useEffect, useState } from "react";
import { User_Info_Api } from "@/axios/dashBoardApi";
import { UserInfo } from "@/types/dashborad.types";
import { UserInfo } from "os";

export default function UserInfo() {
  // 상태관리 로그인 id
  let userId = 1;

  const [userInfo, setUserInfo] = useState<UserInfo>();

  const getUserInfoData = async () => {
    const { data } = await User_Info_Api(userId);
    console.log(data);
    setUserInfo(data);
  };

  useEffect(() => {
    getUserInfoData();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-3xl">{userInfo?.username}</h1>
        <div className="flex">
          <div className="p-2">
            <div>tags</div>
            <div>+{userInfo?.tags}</div>
          </div>
          <div className="p-2">
            <div>cadss</div>
            <div>+{userInfo?.cards}</div>
          </div>
          <div className="p-2">
            <div>friends</div>
            <div>+{userInfo?.friends}</div>
          </div>
        </div>
      </div>
    </>
  );
}
