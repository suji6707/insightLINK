import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { signIn, useSession, signOut } from "next-auth/react";
import NavBar from "@/features/Dashboard/components/NavBar";
import { Wrapper } from "@/styles/wrapper";
import SignupButton from "@/features/User/SignupButton";
import LoginBtn from "@/features/User/LoginBtn";
import GoogleLogoutBtn from "@/features/User/GoogleLogoutBtn";
import GoogleLoginBtn from "@/features/User/GoogleLoginBtn";

export default function Home() {
  const router = useRouter();
  const { data: sessionData, status } = useSession();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (status === "authenticated" && sessionData?.user) {
      saveUserData(sessionData.user);
    }
  }, [status, sessionData]);

  const saveUserData = async (userData: any) => {
    try {
      const response = await axios.post("http://localhost:8800/api/login", {
        email: userData.email,
        givenName: userData.name,
        imageUrl: userData.image,
      });

      console.log("사용자 정보가 성공적으로 저장되었습니다.");

      if (response.data.success) {
        alert("로그인 성공!");
        const token = response.data.token;
        localStorage.setItem("token", token);
        router.push("/dashboard");
      } else {
        alert("로그인에 실패했습니다.ㅠㅠ");
        console.log(response.data);
      }
    } catch (error) {
      console.error("사용자 정보 저장 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <div>
      <NavBar />
      <Wrapper>
        <div className="flex justify-center mt-20">
          <div className="text-center">
            <p className="text-2xl mt-20">
              갤러리 속 숨겨진 인사이트를 이어주는 아카이브
            </p>
            <p className="text-8xl font-bold mt-10 mb-32">insightLINK</p>
            <div className="flex justify-between h-11">
            {(!sessionData?.user && !token) ? (
                 <SignupButton />
              ): null}
              {(!sessionData?.user && !token) ? (
                <LoginBtn />
              ): null}
              {sessionData?.user ? (
                <GoogleLogoutBtn />
              ) : (
                <GoogleLoginBtn />
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}
