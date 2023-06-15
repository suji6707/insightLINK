import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { useTheme } from "next-themes";
import Link from "next/link";
// Components
import UserModal from "@/features/User/UserModal";
// Assets
import { AiTwotoneBell } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsShare, BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { GET } from "@/axios/GET";

export default function NavBar() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [userProfile, setUserProfile] = useState("");
  const [isUserModalOpen, setUserModalOpen] = useState(false);

  const getProfileImg = async () => {
    const token = localStorage.getItem("token");
    const response = await GET("user/profile", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (response) {
      console.log(response);
      setUserProfile(response.userProfile);
    }
  };

  useEffect(() => {
    getProfileImg();
  });

  const handleUserIconClick = () => {
    setUserModalOpen(true);
  };

  const closeModal = () => {
    setUserModalOpen(false);
  };

  const CategoryLink = tw.p`
  text-xl font-bold hover:underline underline-offset-8 active:text-yellow-400 mr-4
  `;

  return (
    <div className="flex flex-row p-7 justify-between items-center">
      <Link href="/dashboard">
        <p className="text-3xl font-extrabold">insightLINK</p>
      </Link>
      <div className="flex flex-row w-2/3 justify-start ml-4">
        <Link href="/social">
          <CategoryLink>소셜</CategoryLink>
        </Link>
        {/* url 수정 필요 */}
        <Link href="/explore">
          <CategoryLink>탐색</CategoryLink>
        </Link>
      </div>
      <div className="flex flex-row w-1/6 justify-between items-center">
        <BsShare size={30} />
        <AiTwotoneBell size={30} />
        {userProfile ? (
          <img src={userProfile} className="w-10 h-10 rounded-full" />
        ) : (
          <BiUser size={30} onClick={handleUserIconClick} />
        )}
        {currentTheme === "dark" ? (
          <BsSunFill size={30} onClick={() => setTheme("light")} />
        ) : (
          <BsFillMoonFill size={30} onClick={() => setTheme("dark")} />
        )}
      </div>
      {isUserModalOpen && <UserModal closeModal={closeModal} />}
    </div>
  );
}
