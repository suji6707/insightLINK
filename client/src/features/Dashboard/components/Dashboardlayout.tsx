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

  const handleHomeClick = () => {
    router.push("/");
  };

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
                <>
                  <p 
                  className="flex flex-col self-stretch text-center text-2xl font-ibm-plex-sans font-bold leading-150 tracking-tighter"
                  onClick={handleHomeClick}
                  >
                    insightLINK
                  </p>
                </>
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
                <div className="flex w-[36.25rem] py-12 flex-col justify-center items-center bg-white mt-2 mb-12 rounded-lg border border-gray-100 shadow-md">
                  <div className="flex flex-col justify-center items-center gap-6">
                    <p className="flex flex-col self-stretch text-center text-2xl font-ibm-plex-sans font-bold leading-150 tracking-tighter">
                      <span>
                        <span style={{ color: "#9A60B4" }}>{userName}</span>{" "}
                        님의 상세 정보를 보고 싶으시면,{" "}
                      </span>
                      <br />
                      회원가입이나 로그인을 진행해주세요!{" "}
                    </p>
                    <LoginBtn />
                    <SignupButton />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
