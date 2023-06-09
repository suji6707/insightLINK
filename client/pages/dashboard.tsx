import React, { useRef } from "react";
// Component
import NavBar from "../components/NavBar";
// Assets
import { BsCamera } from "react-icons/bs";
import { POSTImg } from "../axios/dashboard";

export default function Dashboard() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getImg = () => {
    fileInputRef.current?.click();
  };

  // image input 받기
  const uploadImg = (e: any) => {
    const selectedImg = e.target.files;
    if (!selectedImg) {
      e.preventDefault();
    }
    console.log(selectedImg);
    const formData = new FormData();
    for (let i = 0; i < selectedImg.length; i++) {
      formData.append("files", selectedImg[i]);
    }

    POSTImg(formData); // 결과 리턴
  };

  return (
    <div>
      <NavBar />
      <label htmlFor="input-file" onChange={uploadImg}>
        <input
          type="file"
          multiple
          accept=".jpg, .jpeg, .png"
          className="hidden"
          ref={fileInputRef}
        />
        <BsCamera size={40} onClick={getImg} />
      </label>
    </div>
  );
}
