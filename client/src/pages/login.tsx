import React, { useEffect, useState } from "react";
// Component
import NavBar from "../features/User/NavBar";
import LoginButton from "../features/User/LoginButton";
import axios from "axios";
import { useRouter } from "next/router";

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
      console.log(token);

      // Store the token in local storage
      localStorage.setItem("token", token);

      router.push("/dashboard");
    } else {
      alert("fail!!");
    }
  };

  useEffect(() => {
    async function loadGapi() {
      const { gapi } = await import("gapi-script");

      // const clientId = process.env.GOOGLE_CLIENT_ID;
      const clientId =
        "862985060268-bns768k2p01btrjkdk94f8hkrvqlt5d8.apps.googleusercontent.com";

      if (gapi && gapi.client) {
        await gapi.client.init({
          clientId,
          scope: "",
        });
      }
    }

    loadGapi();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="container mx-auto max-w-md flex flex-col items-end">
          {" "}
          {/* Updated class */}
          <div className="mb-4 flex items-center justify-end">
            {" "}
            {/* Updated class */}
            <label
              className="block text-gray-700 text-sm font-bold mr-2"
              htmlFor="email"
            >
              이메일:
            </label>
            <div className="input-box ml-auto">
              <input
                id="email"
                value={userEmail}
                onChange={(event) => setUserEmail(event.target.value)}
                placeholder="이메일"
                className="form_input inline-block border border-gray-300 rounded px-2 py-1"
              />
            </div>
          </div>
          <div className="mb-4 flex items-center justify-end">
            {" "}
            {/* Updated class */}
            <label
              className="block text-gray-700 text-sm font-bold mr-2"
              htmlFor="password"
            >
              비밀번호:
            </label>
            <div className="input-box ml-auto">
              <input
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="비밀번호"
                type="password"
                className="form_input inline-block border border-gray-300 rounded px-2 py-1"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          {" "}
          {/* Updated class */}
          <button
            onClick={handleLogin}
            className="bg-black text-white font-bold py-2 px-4 rounded mr-4"
          >
            로그인
          </button>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
