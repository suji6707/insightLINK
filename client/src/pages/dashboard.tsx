import React, { useRef } from "react";
// Component
import NavBar from "../components/NavBar";
import ImgUploadBtn from "../components/ImgUploadBtn";

export default function Dashboard() {
  return (
    <div>
      <NavBar />
      <ImgUploadBtn />
    </div>
  );
}
