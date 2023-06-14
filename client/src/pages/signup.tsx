import React, { useState } from "react";
// Component
import NavBar from "../features/User/NavBar";
import axios from "axios";
import { useRouter } from "next/router";

const serverPath = "http://localhost:8800";

export default function Home() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [emailFormatError, setEmailFormatError] = useState(false);

  const doUserRegistration = async (res: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      setEmailFormatError(true);
      setPasswordMatchError(false);
      return;
    } else {
      setEmailFormatError(false);
    }

    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      setEmailFormatError(false);
      return;
    } else {
      setPasswordMatchError(false);
    }

    const response = await axios.post(`${serverPath}/api/signup`, {
      email: userEmail,
      name: userName,
      password: password,
    });

    setUserEmail("");
    setPassword("");
    setConfirmPassword("");
    setUserName("");

    if (response.data.success) {
      alert(`Success! User ${userName} was successfully created!`);
      router.push("/login");
    } else {
      alert("fail!!");
    }
  };

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
          {emailFormatError && (
            <div className="text-red-500 text-right">
              이메일 형식이 아닙니다.
            </div>
          )}
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
          <div className="mb-4 flex items-center justify-end">
            {" "}
            {/* Updated class */}
            <label
              className="block text-gray-700 text-sm font-bold mr-2"
              htmlFor="confirmPassword"
            >
              비밀번호 확인:
            </label>
            <div className="input-box ml-auto">
              <input
                id="confirmPassword"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="비밀번호 확인"
                type="password"
                className="form_input inline-block border border-gray-300 rounded px-2 py-1"
              />
            </div>
          </div>
          {passwordMatchError && (
            <div className="text-red-500 text-right">
              비밀번호가 일치하지 않습니다.
            </div>
          )}
          <div className="mb-4 flex items-center justify-end">
            {" "}
            {/* Updated class */}
            <label
              className="block text-gray-700 text-sm font-bold mr-2"
              htmlFor="userName"
            >
              이름:
            </label>
            <div className="input-box ml-auto">
              <input
                id="userName"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                placeholder="이름"
                className="form_input inline-block border border-gray-300 rounded px-2 py-1"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          {" "}
          {/* Updated class */}
          <button
            onClick={doUserRegistration}
            className="bg-black text-white font-bold py-2 px-4 rounded"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
