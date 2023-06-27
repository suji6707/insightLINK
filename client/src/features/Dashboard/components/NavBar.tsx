import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { useTheme } from "next-themes";
import Link from "next/link";

import { GET } from "@/axios/GET";
import getToken from "@/axios/getToken";
// Components
import UserModal from "@/features/User/UserModal";
// Assets
import { AiOutlineUpload, AiTwotoneBell } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsSunFill, BsFillMoonFill, BsShareFill } from "react-icons/bs";

import html2canvas from "html2canvas";
import { useRecoilState } from "recoil";
import { ImgModalAtom } from "@/recoil/atoms/MainGraphAtom";

export default function NavBar() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [userProfile, setUserProfile] = useState("");
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [showImgModal, setShowImgModal] = useRecoilState(ImgModalAtom);

  const getProfileImg = async () => {
    const token = getToken();
    const response = await GET("user/profile", token);
    if (response) {
      console.log(response);
      setUserProfile(response.userProfile);
    }
  };

  useEffect(() => {
    getProfileImg();
  }, []);

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
                  mobileWebUrl: "http://localhost:3000/dashboard/" + 21,
                  webUrl: "http://localhost:3000/dashboard/" + 21,
                },
              });
            }
          };
          reader.readAsDataURL(blob);
        } else {
          console.log("Failed to capture canvas image.");
        }
      });
    });
  };

  return (
    <div className="flex items-center justify-between h-20 flex-shrink-0 self-stretch py-0 px-10">
      <Link href="/dashboard">
        <p className="text-3xl font-extrabold">insightLINK</p>
      </Link>
      <div>
        <Link href="/social">
          <CategoryLink>소셜</CategoryLink>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 self-stretch">
          <div className="flex w-7 h-7 flex-col justify-center items-center">
            <BsShareFill
              className="text-gray-800 text-1xl font-xeicon leading-normal"
              onClick={handleShareIconClick}
            />
          </div>
          <div className="flex w-7 h-7 flex-col justify-center items-center">
            <AiTwotoneBell className="text-gray-800 text-[1rem] font-xeicon leading-normal" />
          </div>
        </div>
        {userProfile ? (
          <img
            src={userProfile}
            className="w-10 h-10 rounded-full"
            onClick={handleUserIconClick}
          />
        ) : (
          <BiUser
            onClick={handleUserIconClick}
            className="text-gray-800 text-[1rem] font-xeicon leading-normal"
          />
        )}
        {/* {currentTheme === "dark" ? (
          <BsSunFill size={30} onClick={() => setTheme("light")} />
        ) : (
          <BsFillMoonFill size={30} onClick={() => setTheme("dark")} />
        )} */}
        <div
          onClick={() => setShowImgModal(true)}
          className="flex items-center justify-center h-10 px-4 gap-1 rounded bg-gray-900 cursor-pointer"
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
