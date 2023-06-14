import React, { useState } from "react";
// Component
import NavBar from "../features/Dashboard/components/NavBar";
import { Button, Divider, Input } from "antd";
import axios from "axios";
import bcrypt from "bcryptjs";

const serverPath = "http://localhost:8800";

export default function Home() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
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

    // Hash the password
    const hashedPassword = bcrypt.hashSync(
      password,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    );

    const response = await axios.post(`${serverPath}/api/signup`, {
      email: userEmail,
      name: userName,
      imageUrl: userName,
      password: hashedPassword,
    });

    setUserEmail("");
    setPassword("");
    setConfirmPassword("");
    setUserName("");
    setUserImg("");

    if (response.data.success) {
      alert(`Success! User ${userName} was successfully created!`);
    } else {
      alert("fail!!");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="container mx-auto" style={{ width: "400px" }}>
          <Divider />
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <label className="w-32" style={{ width: "200px" }}>
                이메일:
              </label>
              <Input
                value={userEmail}
                onChange={(event) => setUserEmail(event.target.value)}
                placeholder="이메일"
                size="large"
                className="form_input"
              />
            </div>
            {emailFormatError && (
              <div className="text-red-500 text-right">
                이메일 형식이 아닙니다.
              </div>
            )}
            <div className="flex space-x-4">
              <label className="w-32" style={{ width: "200px" }}>
                비밀번호:
              </label>
              <Input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="비밀번호"
                size="large"
                type="password"
                className="form_input"
              />
            </div>
            <div className="flex space-x-4">
              <label className="w-32" style={{ width: "200px" }}>
                비밀번호 확인:
              </label>
              <Input
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="비밀번호 확인"
                size="large"
                type="password"
                className="form_input"
              />
            </div>
            {passwordMatchError && (
              <div className="text-red-500 text-right">
                비밀번호가 일치하지 않습니다.
              </div>
            )}
            <div className="flex space-x-4">
              <label className="w-32" style={{ width: "200px" }}>
                이름:
              </label>
              <Input
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                placeholder="이름"
                size="large"
                className="form_input"
              />
            </div>
            <div className="flex space-x-4">
              <label className="w-32" style={{ width: "200px" }}>
                프로필 사진 url:
              </label>
              <Input
                value={userImg}
                onChange={(event) => setUserImg(event.target.value)}
                placeholder="프로필 사진 url"
                size="large"
                className="form_input"
              />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Button
              onClick={doUserRegistration}
              size="large"
              className="bg-black text-white font-bold py-2 px-4 rounded"
            >
              회원가입
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
