import React, { useEffect, useState } from "react";
import LogoutBtn from "./LogoutBtn";
import GoogleLogoutBtn from "@/features/User/GoogleLogoutBtn";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";

type UserModalProps = {
  closeModal: () => void;
};

const UserModal: React.FC<UserModalProps> = ({ closeModal }) => {
  const { data: sessionData } = useSession();
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [editedNickname, setEditedNickname] = useState<string>("");
  const [isEditingNickname, setIsEditingNickname] = useState(false);

  const router = useRouter();

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

  const handleWithdrawal = async () => {
    try {
      const response = await axios.delete("http://localhost:8800/api/myinfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        // localStorage.removeItem("token");
        console.log("Withdrawal successful!");
        // router.push("/");
      }
    } catch (error) {
      console.error("Withdrawal failed:", error);
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
              <p>Name: {userInfo?.name}</p>
              <button
                onClick={() => handleNicknameEdit(userInfo?.name)}
                className="text-blue-500 hover:text-blue-700 ml-2"
              >
                수정
              </button>
            </>
          )
        ) : null}

        {token ? (
          <>
            <p>Email: {userInfo?.email}</p>
            <p>
              Profile Picture:
              <img
                src={userInfo?.image as string}
                alt="Profile"
                className="rounded-full w-20 h-20 mx-auto mt-4 mb-2"
              />
            </p>
          </>
        ) : null}

        {typeof window !== "undefined" && sessionData?.user && token ? (
          <GoogleLogoutBtn />
        ) : token ? (
          <LogoutBtn />
        ) : null}

        {token ? (
          <button
            className="bg-black text-white font-bold py-2 px-4 rounded mt-2"
            onClick={handleWithdrawal}
          >
            탈퇴
          </button>
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
