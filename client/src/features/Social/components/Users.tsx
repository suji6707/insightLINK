import React, { useEffect, useState } from "react";

import getToken from "@/axios/getToken";
import { GET } from "@/axios/GET";
import { DELETE } from "@/axios/DELETE";
// Assets
import { AiFillCheckCircle, AiOutlinePlusCircle } from "react-icons/ai";

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);

  // 추천 친구 조회
  const getUsers = async () => {
    const data = await GET("social/user", getToken());
    if (data.data) {
      setUsers(data.data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // 팔로잉 등록
  const handleAddFollow = async (userId: number) => {
    await GET(`friend/${userId}`);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isFriend: true } : user
      )
    );
  };

  // 팔로잉 취소
  const handleDeleteFollow = async (userId: number) => {
    await DELETE(`friend/${userId}`);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isFriend: false } : user
      )
    );
  };

  return (
    <div className="fixed top-96 left-3/4 ml-10">
      <ul>
        {users &&
          users.map((u) => (
            <li
              key={u.userId}
              className="flex flex-row items-center justify-around w-60 py-2 border"
            >
              <img
                src={u.img}
                className="w-10 h-10 rounded-full transform transition hover:-rotate-6 cursor-pointer"
                alt="profile"
              />
              <p className="text-lg font-semibold">{u.userName}</p>
              {u.tags.map((t: string, index: number) => (
                <li key={index} className="flex flex-row">
                  #{t}
                </li>
              ))}
              {u.isFriend ? (
                <AiFillCheckCircle
                  className="text-xl"
                  onClick={() => handleDeleteFollow(u.id)}
                />
              ) : (
                <AiOutlinePlusCircle
                  className="text-xl"
                  onClick={() => handleAddFollow(u.id)}
                />
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Users;
