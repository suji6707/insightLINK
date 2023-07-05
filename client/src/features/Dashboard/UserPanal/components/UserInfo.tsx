import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { FollowCntAtom, LoginStateAtom } from "@/recoil/atoms/LoginStateAtom";
// components
import FollowBtn from "@/features/Dashboard/UserPanal/components/FollowBtn";
import GraphEditBtn from "@/features/Dashboard/UserPanal/components/GraphEditBtn";
import { User_Info_Api } from "@/axios/dashBoardApi";
// types
import { UserInfo_DTO } from "@/types/dashborad.types";

export default function UserInfo(
  { userInfo }: UserInfo_DTO | undefined,
  { isLogin }: boolean
) {
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between px-4 mb-2">
          <h1 className="mb-1 text-2xl font-medium">{userInfo?.userName}</h1>
          <div className="md:hidden">
            {isLogin ? (
              <></>
            ) : userInfo ? (
              <FollowBtn follow={userInfo?.isFollow} />
            ) : (
              <></>
            )}
          </div>
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
