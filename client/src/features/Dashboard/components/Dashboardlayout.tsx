import React, { ReactNode, useEffect, useState } from "react";
// recoil
import { useRecoilValue } from "recoil";
import { DashBoardCardAtom, ImgModalAtom } from "@/recoil/atoms/MainGraphAtom";
// Component
import NavBar from "@/features/Dashboard/components/NavBar";
import UserPanel from "@/features/Dashboard/UserPanal/UserPanel";
import CardPanel from "@/features/Dashboard/MainCard/components/CardPanel";
import ImageUpload from "@/features/ImageUpload/ImageUpload";

import LoginBtn from "@/features/User/LoginBtn";
import SignupButton from "@/features/User/SignupButton";

import axios from "axios";

import { useRouter } from "next/router";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const openCard = useRecoilValue(DashBoardCardAtom);
  const showImgModal = useRecoilValue(ImgModalAtom);

  const [userName, setUserName] = useState("");
  const router = useRouter();

  let token: any;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  useEffect(() => {
    const { userid } = router.query;
  
    if (userid) {
      // Axios request to fetch user name
      axios
        .get(`/api/share/info?userId=${userid}`)
        .then((response) => {
          // Assuming the response contains the user name in the 'userName' property
          setUserName(response.data.userName);
        })
        .catch((error) => {
          console.error("Error fetching user name:", error);
        });
    }
  }, [router.query]);
  

  return (
    <>
      <div className="h-screen max-w-[75rem] mx-auto">
        {token && <NavBar />}
        <div className="max-w-[75rem] flex flex-col items-center justify-between m-auto">
          {token && <UserPanel />}
          <div className="flex flex-row justify-between w-full">
            <>
              {children}
              {openCard && token ? (
                <CardPanel />
              ) : token ? (
                <></>
              ) : (
                <>insightLINK</>
              )}
            </>
          </div>
        </div>
        {showImgModal && <ImageUpload />}

        {token ? (
          <></>
        ) : (
          <>
            <div className="flex justify-center items-center">
              <div className="text-center">
                <p className="mb-2">
                  {userName} 님의 상세 정보를 보고 싶으시면, 회원가입이나
                  로그인을 진행해주세요!
                  <LoginBtn />
                  <SignupButton />
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
