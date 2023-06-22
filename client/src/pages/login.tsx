import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
// Component
import NavBar from "@/features/Dashboard/components/NavBar";
import { Wrapper } from "@/styles/wrapper";

const serverPath = "http://localhost:8800";

export default function Home() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (res: any) => {
    const response = await axios.post(`${serverPath}/api/login/generic`, {
      email: userEmail,
      password: password,
    });

    setUserEmail("");
    setPassword("");

    if (response.data.success) {
      alert(`로그인 성공!`);
      const token = response.data.token;

      // Store the token in local storage
      localStorage.setItem("token", token);

      router.push("/dashboard");
    } else {
      alert("fail!!");
    }
  };

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      // Redirect to the dashboard page
      router.push("/dashboard");
    }
  }, []);

  return (
    <div>
      <NavBar />
      <Wrapper>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="container flex flex-col items-end max-w-md mx-auto">
            <div className="flex items-center justify-end mb-4">
              <label
                className="block mr-2 text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                이메일:
              </label>
              <div className="ml-auto input-box">
                <input
                  id="email"
                  value={userEmail}
                  onChange={(event) => setUserEmail(event.target.value)}
                  placeholder="이메일"
                  className="inline-block px-2 py-1 border border-gray-300 rounded form_input"
                />
              </div>
            </div>
            <div className="flex items-center justify-end mb-4">
              <label
                className="block mr-2 text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                비밀번호:
              </label>
              <div className="ml-auto input-box">
                <input
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="비밀번호"
                  type="password"
                  className="inline-block px-2 py-1 border border-gray-300 rounded form_input"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleLogin}
              className="px-4 py-2 mr-4 font-bold text-white bg-black rounded"
            >
              로그인
            </button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
