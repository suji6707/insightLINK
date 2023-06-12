import React, { useRef } from "react";
// Component
import NavBar from "../components/NavBar";
import UserInfo from "../components/dashboard/UseInfo";
import ImgUploadBtn from "../components/dashboard/ImgUploadBtn";
import MainGraph from "../components/dashboard/MainGraph";
import SearchBar from "../components/dashboard/SearchBar";

export default function Dashboard() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-between w-full">
        <div className="flex justify-between w-full">
          <UserInfo />
          <div className="flex">
            <ImgUploadBtn />
            <SearchBar />
          </div>
        </div>
        <MainGraph />
      </div>
    </>
  );
}
