import React, { useRef } from "react";
// Component
import NavBar from "../features/Dashboard/components/NavBar";
import LoginButton from "../features/User/LoginButton";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="flex justify-center mt-20">
        <div className="text-center">
          <h3 className="text-4xl font-bold mb-5">insightLINK</h3>
          <p className="text-lg mb-20">
            갤러리 속 인사이트를 이어주는 아카이브
          </p>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
