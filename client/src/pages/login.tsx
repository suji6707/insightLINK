import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// recoil
import { useSetRecoilState } from "recoil";
import { LoginStateAtom } from "@/recoil/atoms/LoginStateAtom";

import { POST } from "@/axios/POST";

export default function Home() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const setLoginId = useSetRecoilState(LoginStateAtom);

  const handleLogin = async () => {
    const response: any = await POST(
      "login/generic",
      {
        email: userEmail,
        password: password,
      },
      false
    );

    if (response.data.success) {
      alert(`다시 만나서 반가워요 : )`);
      const token = response.data.token;
      const userId = response.data.userId;

      setLoginId(userId);

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      router.push("/dashboard");
    } else {
      alert("로그인 실패");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="container flex flex-col items-end max-w-md mx-auto">
        <div className="flex items-center justify-end mb-4">
          <label
            className="block mr-2 text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            이메일:
          </label>
          <input
            id="email"
            value={userEmail}
            onChange={(event) => setUserEmail(event.target.value)}
            placeholder="이메일"
            className="inline-block px-2 py-1 border border-gray-300 rounded form_input"
          />
        </div>
        <div className="flex items-center justify-end mb-4">
          <label
            className="block mr-2 text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            비밀번호:
          </label>
          <input
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="비밀번호"
            type="password"
            className="inline-block px-2 py-1 border border-gray-300 rounded form_input"
          />
        </div>
        <button
          onClick={handleLogin}
          className="px-[5rem] py-2 font-bold text-white bg-black rounded cursor-pointer"
        >
          로그인
        </button>
      </div>
    </div>
  );
}
