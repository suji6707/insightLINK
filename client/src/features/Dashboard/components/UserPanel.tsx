import React, { useState } from "react";
import UserInfo from "./UseInfo";
import SearchBar from "./SearchBar";
// Assets
import { BsCamera } from "react-icons/bs";

export default function UserPanel({ setShowImgModal }: any) {
  return (
    <>
      <div className="flex justify-between w-full">
        <UserInfo />
        <div className="flex">
          <BsCamera size={30} onClick={() => setShowImgModal(true)} />
          <SearchBar />
        </div>
      </div>
    </>
  );
}
