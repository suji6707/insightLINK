import React from "react";
import { useRouter } from "next/router";
// Component
import LoginButton from "../features/User/LoginButton";
import NavBar from "@/features/Dashboard/components/NavBar";
import { Wrapper } from "@/styles/wrapper";

export default function Home() {
  const router = useRouter();

  const LoginPageHandler = () => {
    router.push("/login");
  };

  const SignupPageHandler = () => {
    router.push("/signup");
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
              <button
                onClick={SignupPageHandler}
                className="font-bold py-2 px-4 rounded mr-4 border-black border w-full"
              >
                회원가입
              </button>
              <button
                onClick={LoginPageHandler}
                className="font-bold py-2 px-4 rounded mr-4 border-black border w-full"
              >
                로그인
              </button>
              <LoginButton />
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
