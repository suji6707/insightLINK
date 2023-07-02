import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { GET } from "@/axios/GET";
import { DELETE } from "@/axios/DELETE";
// Recoil
import { useRecoilState } from "recoil";
import { SocialUserAtom } from "@/recoil/atoms/SocialAtom";

import User from "./User";
// Assets
import { AiOutlineReload } from "react-icons/ai";

const Users = () => {
  const [users, setUsers] = useRecoilState(SocialUserAtom);
  const router = useRouter();

  // 추천 친구 조회
  const getUsers = async () => {
    const data = await GET("social/user", true);
    if (data.status === 200) {
      setUsers(data.data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // 팔로잉 취소
  const handleDeleteFollow = async (userId: number) => {
    await DELETE(`social/follow?followId=${userId}`, true);
    getUsers();
  };

  const handleRedirectToDashboard = (userid: number) => {
    router.push(`/dashboard/${userid}`);
  };

  const handleRedirectToSearch = (tag: string) => {
    router.push(`/search?search=${tag}`);
  };

  return (
    <div className="w-[20rem] py-[3.75rem] flex-col items-start space-y-6 self-stretch">
      <div className="flex justify-between items-center self-stretch">
        <p className="text-gray-900 text-2xl  font-semibold leading-6 tracking-tight">
          Connect more...
        </p>
        <div className="flex w-7 h-7 flex-col justify-center items-center">
          <AiOutlineReload
            className="text-gray-800 text-base font-xeicon leading-normal cursor-pointer"
            onClick={() => getUsers()}
          />
        </div>
      </div>
      <ul className="flex flex-col items-start gap-3 self-stretch">
        <User />
      </ul>
    </div>
  );
};

export default Users;
