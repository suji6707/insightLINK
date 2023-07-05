import React, { useEffect, useState } from "react";
// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { FollowCntAtom, LoginStateAtom } from "@/recoil/atoms/LoginStateAtom";

import { useRouter } from "next/router";
// components
import FollowBtn from "@/features/Dashboard/UserPanal/components/FollowBtn";
import GraphEditBtn from "@/features/Dashboard/UserPanal/components/GraphEditBtn";
import { User_Info_Api } from "@/axios/dashBoardApi";
// types
import { UserInfo_DTO } from "@/types/dashborad.types";

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo_DTO>();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const loginId = useRecoilValue(LoginStateAtom);
  const [followCnt, setFollowCnt] = useRecoilState(FollowCntAtom);
  const router = useRouter();

  useEffect(() => {
    const getUserInfoData = async () => {
      const userid = Array.isArray(router.query.userid)
        ? router.query.userid[0]
        : router.query.userid;

      const response = await User_Info_Api(userid);
      setUserInfo(response);
      setFollowCnt(response.followCnt);
      if (userid) {
        if (loginId == userid) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      } else {
        setIsLogin(true);
      }
    };
    getUserInfoData();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between px-4 mb-2">
          <h1 className="mb-1 text-2xl font-medium">{userInfo?.userName}</h1>

          {isLogin ? (
            <GraphEditBtn />
          ) : userInfo ? (
            <FollowBtn follow={userInfo?.isFollow} />
          ) : (
            <></>
          )}
        </div>

        <div className="flex gap-4">
          <div className="user-info-cnt">
            <div>태그 수</div>
            <div className="user-info-cnt-num">{userInfo?.tagCnt}</div>
          </div>
          <div className="user-info-cnt">
            <div>카드 수</div>
            <div className="user-info-cnt-num">{userInfo?.cardCnt}</div>
          </div>
          <div className="user-info-cnt">
            <div>친구 수</div>
            <div className="user-info-cnt-num">{userInfo?.followCnt}</div>
          </div>
        </div>
      </div>
    </>
  );
}
