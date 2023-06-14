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
            <h3 className="text-4xl font-bold mb-5">insightLINK</h3>
            <p className="text-lg mb-20">
              갤러리 속 숨겨진 인사이트를 이어주는 아카이브
            </p>
            <div className="flex justify-center">
              <button
                onClick={SignupPageHandler}
                className="font-bold py-2 px-4 rounded mr-4 border-black border"
              >
                회원가입
              </button>
              <button
                onClick={LoginPageHandler}
                className="font-bold py-2 px-4 rounded mr-4 border-black border"
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
