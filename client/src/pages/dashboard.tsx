import React, { useRef } from "react";
// Component
import NavBar from "../components/NavBar";
import UserInfo from '../components/dashboard/UseInfo';
import ImgUploadBtn from "../components/ImgUploadBtn";

export default function Dashboard() {
  return (
    <div>
      <NavBar />
      <UserInfo />
      <ImgUploadBtn />
    </div>
  );
}
