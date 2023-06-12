import React, { useRef, useState } from "react";

import { POST } from "@/axios/POST";
// Assets
import { BsCamera } from "react-icons/bs";

export default function ImgUploadBtn() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState([]);

  const handleInput = () => {
    fileInputRef.current?.click();
  };

  // image input 받기
  const handleImgChange = (e: any) => {
    const selectedImg = e.target.files;
    if (!selectedImg) {
      e.preventDefault();
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < selectedImg.length; i++) {
      formData.append("photos", selectedImg[i]);
    }

    // 로컬 이미지 업로드 API
    const uploadImg = async () => {
      const data = await POST("/upload/1", formData, {
        "Content-Type": "multipart/form-data",
        token: 1,
      });
      if (data != null) {
        setImg(data);
      }
    };

    uploadImg();
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept=".jpg, .jpeg, .png"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImgChange}
      />
      <BsCamera size={40} onClick={handleInput} />
    </div>
  );
}
