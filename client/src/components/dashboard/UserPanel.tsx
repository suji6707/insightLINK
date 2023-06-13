import React from "react";
import UserInfo from "./UseInfo";
import ImgUploadBtn from "./ImgUploadBtn";
import SearchBar from "./SearchBar";

export default function UserPanel() {
  return (
    <>
      <div className="flex justify-between w-full">
        <UserInfo />
        <div className="flex">
          <ImgUploadBtn />
          <SearchBar />
        </div>
      </div>
    </>
  );
}
