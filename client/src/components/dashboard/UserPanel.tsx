import React from "react";
import UserInfo from "./UseInfo";
import ImgUploadBtn from "../ImgUploadBtn";
import SearchBar from "./SearchBar";

export default function UserPanel() {
  return (
    <div>
      <UserInfo />
      <ImgUploadBtn />
      <SearchBar />
    </div>
  );
}
