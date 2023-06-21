import React, { useEffect, useState } from "react";
import LogoutBtn from "./LogoutBtn";
import GoogleLogoutBtn from "@/features/User/GoogleLogoutBtn";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import { AiFillEdit } from "react-icons/ai";

import SwitchToggle from "./SwithToggle";
import WithdrawalBtn from "./WithdrawalBtn";

type UserModalProps = {
  closeModal: () => void;
};

const UserModal: React.FC<UserModalProps> = ({ closeModal }) => {
  const router = useRouter();

  const { data: sessionData } = useSession();
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [editedNickname, setEditedNickname] = useState<string>("");
  const [isEditingNickname, setIsEditingNickname] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/myinfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUserInfo(response.data.userInfo);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (token) {
      fetchUserInfo();
    }
  }, [token, isEditingNickname]);

  const handleNicknameEdit = (name: string) => {
    setIsEditingNickname(true);
    setEditedNickname(name);
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedNickname(event.target.value);
  };

  const handleNicknameSave = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:8800/api/myinfo",
        {
          editedNickname: editedNickname,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setIsEditingNickname(false);
        console.log(isEditingNickname);
      }
      console.log("Save edited nickname:", editedNickname);
    } catch (error) {
      console.error("Error saving the edited nickname:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="font-bold mb-4">User Modal</h2>
        {token ? (
          isEditingNickname ? (
            <>
              <input
                type="text"
                value={editedNickname}
                onChange={handleNicknameChange}
                className="mb-2"
              />
              <button
                onClick={handleNicknameSave}
                className="text-blue-500 hover:text-blue-700 ml-2"
              >
                저장
              </button>
            </>
          ) : (
            <>
              <p className="flex items-center justify-center">
                이름 : {userInfo?.name}
                <span className="ml-2">
                  <AiFillEdit
                    onClick={() => handleNicknameEdit(userInfo?.name)}
                  />
                </span>
              </p>
            </>
          )
        ) : null}

        {token ? (
          <>
            <p>이메일 : {userInfo?.email}</p>
            <p>
              프로필 이미지:
              <img
                src={userInfo?.image as string}
                alt="Profile"
                className="rounded-full w-20 h-20 mx-auto mt-4 mb-2"
              />
            </p>
            <SwitchToggle />
          </>
        ) : null}

        {typeof window !== "undefined" && sessionData?.user && token ? (
          <GoogleLogoutBtn />
        ) : token ? (
          <LogoutBtn />
        ) : null}

        {token ? (
          <WithdrawalBtn token={token} userInfo={userInfo} />
        ) : null}
        <div className="flex flex-col items-center justify-center space-y-4 mt-8">
          <button
            className="bg-black text-white font-bold py-2 px-4 rounded mt-2"
            onClick={closeModal}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
