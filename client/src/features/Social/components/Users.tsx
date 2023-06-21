import React, { useEffect, useState } from "react";

import getToken from "@/axios/getToken";
import { GET } from "@/axios/GET";
import { POST } from "@/axios/POST";
import { DELETE } from "@/axios/DELETE";
// Assets
import { AiFillCheckCircle, AiOutlinePlusCircle } from "react-icons/ai";

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);

  // 추천 친구 조회
  const getUsers = async () => {
    const token = getToken();
    const data = await GET("social/user", token);
    if (data) {
      setUsers(data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // 팔로잉 등록
  const handleAddFollow = async (userId: number) => {
    const token = getToken();
    await POST(`social/follow?followId=${userId}`, null, token);
    getUsers();
  };

  // 팔로잉 취소
  const handleDeleteFollow = async (userId: number) => {
    const token = getToken();
    await DELETE(`social/follow?followId=${userId}`, token);
    getUsers();
  };

  return (
    <div className="fixed top-96 left-3/4 ml-10">
      <ul>
        {users &&
          users.map((u) => (
            <li
              key={u.userId}
              className="flex flex-row items-center justify-around py-2 border"
            >
              <img
                src={u.img}
                className="w-10 h-10 rounded-full cursor-pointer"
                alt="profile"
              />
              <p className="text-lg font-semibold">{u.userName}</p>
              <ul>
                {u.tags.map((t: string, index: number) => (
                  <li key={index} className="flex flex-row">
                    #{t}
                  </li>
                ))}
              </ul>
              {u.isFriend ? (
                <AiFillCheckCircle
                  className="text-xl"
                  onClick={() => handleDeleteFollow(u.userId)}
                />
              ) : (
                <AiOutlinePlusCircle
                  className="text-xl"
                  onClick={() => handleAddFollow(u.userId)}
                />
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Users;
