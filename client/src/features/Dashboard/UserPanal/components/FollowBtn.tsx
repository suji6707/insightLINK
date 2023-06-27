import React from "react";
import { useRouter } from "next/router";
import {
  Add_Follow_API,
  Cancel_Follow_API,
} from "@/axios/dashBoardApi";

export default function FollowBtn() {
  const router = useRouter();

  const handleAddFollow = async () => {
    const userid = Array.isArray(router.query.userid)
      ? router.query.userid[0]
      : router.query.userid;

    const addFriend = await Add_Follow_API(userid);
    return;
  };

  const handleCancelFollow = async () => {
    const userid = Array.isArray(router.query.userid)
      ? router.query.userid[0]
      : router.query.userid;

    const CancelFriend = await Cancel_Follow_API(userid);
    return;
  };

  return (
    <>
          <button onClick={handleAddFollow}>팔로우</button>
          <button onClick={handleCancelFollow}>언팔로우</button>
    </>
  );
}
