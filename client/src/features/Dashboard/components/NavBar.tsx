import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
//recoil
import { useRecoilValue, useRecoilState } from "recoil";
import { ImgModalAtom, AlarmCntAtom } from "@/recoil/atoms/MainGraphAtom";
import { LoginStateAtom } from "@/recoil/atoms/LoginStateAtom";

import { GET } from "@/axios/GET";
import useNotification from "@/features/Dashboard/components/hooks/useNotification";
// Components
import UserModal from "@/features/User/UserModal";
// Assets
import { AiOutlineUpload, AiTwotoneBell } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsShareFill } from "react-icons/bs";

import tw from "tailwind-styled-components";
import html2canvas from "html2canvas";
import AlarmModal from "@/features/Dashboard/components/AlarmModal";

export default function NavBar() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [userProfile, setUserProfile] = useState("");
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [showImgModal, setShowImgModal] = useRecoilState(ImgModalAtom);

  const [openAlarm, setOpenAlarm] = useState(false);
  const [alarmCnt, setAlarmCnt] = useRecoilState(AlarmCntAtom);

  const loginId = useRecoilValue(LoginStateAtom);

  const getProfileImg = async () => {
    const data = await GET("user/profile", true);
    if (data.status === 200) {
      setUserProfile(data.data.userProfile);
    }
  };

  const handleUserIconClick = () => {
    setUserModalOpen(true);
  };

  const closeModal = () => {
    setUserModalOpen(false);
  };

  const CategoryLink = tw.p`
  text-xl font-bold hover:underline underline-offset-8 active:text-yellow-400 mr-4
  `;

  const handleShareIconClick = () => {
    html2canvas(document.documentElement).then((canvas) => {
      canvas.toBlob((blob) => {
        if (blob !== null) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const imageUrl = reader.result;
            console.log("Image URL:", imageUrl);

            // Use Kakao.Link.sendDefault to send the image URL to KakaoTalk
            if (window.Kakao) {
              window.Kakao.Link.sendDefault({
                objectType: "text",
                text: "나의 그래프를 확인해봐요.",
                link: {
                  mobileWebUrl: "http://localhost:3000/dashboard/" + loginId,
                  webUrl: "http://localhost:3000/dashboard/" + loginId,
                },
              });
            }
          };
          reader.readAsDataURL(blob);
        }
      });
    });
  };

  const handleOpenAlarm = () => {
    setOpenAlarm(!openAlarm);
    setAlarmCnt(false);
    console.log("알람 모달 상태", openAlarm);
  };

  useEffect(() => {
    getProfileImg();
  }, []);

  const notiArr = useNotification();

  return (
    <div className="flex items-center self-stretch justify-between flex-shrink-0 h-20 py-0 ">
      <Link href="/dashboard">
        <p className="text-3xl font-extrabold">insightLINK</p>
      </Link>
      <div>
        <Link href="/social">
          <CategoryLink>소셜</CategoryLink>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center self-stretch gap-4">
          <div className="flex flex-col items-center justify-center w-7 h-7">
            <BsShareFill
              className="leading-normal text-gray-800 cursor-pointer text-1xl font-xeicon"
              onClick={handleShareIconClick}
            />
          </div>
          <button
            className="relative flex flex-col items-center justify-center cursor-pointer w-7 h-7"
            onClick={handleOpenAlarm}
          >
            <AiTwotoneBell className="text-gray-800 text-[1rem] font-xeicon leading-normal" />
            {alarmCnt && (
              <div className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -right-1 -top-1 z-1">
                1
              </div>
            )}
            {openAlarm && <AlarmModal />}
          </button>
        </div>
        {userProfile ? (
          <div className="relative w-10 h-10">
            <Image
              src={`/${userProfile}`}
              alt=""
              layout="fill"
              className="rounded-full cursor-pointer"
              onClick={handleUserIconClick}
            />
          </div>
        ) : (
          <BiUser
            className="text-gray-800 text-[1rem] font-xeicon leading-normal  cursor-pointer"
            onClick={handleUserIconClick}
          />
        )}
        {/* {currentTheme === "dark" ? (
          <BsSunFill size={30} onClick={() => setTheme("light")} />
        ) : (
          <BsFillMoonFill size={30} onClick={() => setTheme("dark")} />
        )} */}
        <div
          className="flex items-center justify-center h-10 gap-1 px-4 bg-gray-900 rounded cursor-pointer"
          onClick={() => setShowImgModal(true)}
        >
          <AiOutlineUpload className="text-white text-[1rem] font-xeicon leading-normal" />
          <p className="text-white text-[1.125rem] font-kanit font-semibold leading-normal tracking-tighter">
            업로드
          </p>
        </div>
      </div>
      {isUserModalOpen && <UserModal closeModal={closeModal} />}
    </div>
  );
}
