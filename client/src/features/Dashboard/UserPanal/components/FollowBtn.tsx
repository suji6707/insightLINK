import React, { useState } from "react";
import { useRouter } from "next/router";
import { Add_Follow_API, Cancel_Follow_API } from "@/axios/dashBoardApi";

export default function FollowBtn() {
  const [isFollow, setIsFollow] = useState(false);
  const router = useRouter();

  const handleAddFollow = async () => {
    const userid = Array.isArray(router.query.userid)
      ? router.query.userid[0]
      : router.query.userid;

    const addFriend = await Add_Follow_API(userid);
    setIsFollow(true);
    return;
  };

  const handleCancelFollow = async () => {
    const userid = Array.isArray(router.query.userid)
      ? router.query.userid[0]
      : router.query.userid;

    const CancelFriend = await Cancel_Follow_API(userid);
    setIsFollow(false);
    return;
  };

  return (
    <>
      {isFollow ? (
        <button onClick={handleCancelFollow} className="follow-btn">
          팔로우 취소
        </button>
      ) : (
        <button onClick={handleAddFollow} className="follow-btn">
          팔로우
        </button>
      )}
    </>
  );
}
