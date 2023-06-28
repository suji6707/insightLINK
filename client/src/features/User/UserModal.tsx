import React, { useEffect, useState } from "react";
import LogoutBtn from "./LogoutBtn";
import GoogleLogoutBtn from "@/features/User/GoogleLogoutBtn";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import { AiFillEdit, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

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
        const response = await axios.get(`${process.env.SOURCE_PATH}/api/myinfo`, {
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
        `${process.env.SOURCE_PATH}/api/myinfo`,
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
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed flex w-[37.5rem] pt-3 pr-6 pb-5 pl-6 flex-col items-start rounded-lg border border-gray-200 bg-white shadow-md z-50">
        <div className="flex h-[3.75rem] justify-between items-center self-stretch">
          <h2 className="text-gray-900 text-3xl font-kanit font-semibold leading-6 tracking-tighter">
            Account
          </h2>
          <AiOutlineClose
            onClick={closeModal}
            className="text-gray-400 text-base font-xeicon leading-normal"
          />
        </div>
        <div className="flex py-[2rem] items-start self-stretch border-b-2 border-gray-900">
          <p className="flex flex-col w-40 text-gray-900 text-xl font-kanit font-semibold leading-6 tracking-tighter">
            My Profile
          </p>
          <div className="flex items-center gap-3">
            {token && (
              <>
                <img
                  src={userInfo?.image as string}
                  alt="Profile"
                  className="rounded-full w-[4rem] h-[4rem]"
                />
                {isEditingNickname ? (
                  <div className="flex w-[12.5rem] h-11 px-1 justify-between items-center border-b border-blue-500 bg-gray-200">
                    <input
                      type="text"
                      value={editedNickname}
                      onChange={handleNicknameChange}
                      className="flex items-center gap-2 flex-1 bg-gray-200 text-gray-900 text-lg font-kanit font-light leading-6"
                    />
                  </div>
                ) : (
                  <div className="flex w-[12.5rem] h-11 px-1 justify-between items-center">
                    <p className="text-gray-900 text-lg font-kanit font-light leading-6">
                      {userInfo?.name}
                    </p>
                  </div>
                )}
                {isEditingNickname ? (
                  <button
                    onClick={handleNicknameSave}
                    className="flex items-center gap-[0.375rem]"
                  >
                    <AiOutlineCheck className="flex items-center gap-[0.375rem] text-colorBlue" />
                    <p className="text-colorBlue text-xl font-kanit leading-normal tracking-tight">
                      Done
                    </p>
                  </button>
                ) : (
                  <button
                    onClick={() => handleNicknameEdit(userInfo?.name)}
                    className="flex items-center gap-[0.375rem]"
                  >
                    <AiFillEdit
                      className="flex items-center gap-[0.375rem] text-colorBlue"
                      onClick={() => handleNicknameEdit(userInfo?.name)}
                    />
                    <p className="text-colorBlue text-xl font-kanit leading-normal tracking-tight">
                      Edit
                    </p>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex py-7 items-start self-stretch border-b-2 border-gray-900">
          <p className="flex flex-col w-40 text-gray-900 text-xl font-kanit font-semibold leading-6 tracking-tighter">
            Notification
          </p>
          <div className="flex flex-col items-start gap-3">
            <SwitchToggle text="Desktop notification" />
            <SwitchToggle text="Connect to Slack" />
          </div>
        </div>
        <div className="flex py-7 items-start self-stretch">
          <p className="flex flex-col w-40 text-gray-900 text-xl font-kanit font-semibold leading-6 tracking-tighter">
            Setting
          </p>
          <div className="flex flex-col items-start gap-4">
            {typeof window !== "undefined" && sessionData?.user && token ? (
              <GoogleLogoutBtn />
            ) : token ? (
              <LogoutBtn />
            ) : null}
            {token && <WithdrawalBtn token={token} userInfo={userInfo} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
