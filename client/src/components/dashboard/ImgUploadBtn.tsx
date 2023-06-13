import React, { useRef, useState } from "react";
// Assets
import { BsCamera } from "react-icons/bs";
import Link from "next/link";
import { POST } from "@/axios/POST";
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

    console.log(formData)
    // 로컬 이미지 업로드 API
    const uploadImg = async () => {
      const data = await POST("/", formData, {
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
      <Link href="/image">
        <BsCamera size={30} />
      </Link>
    </div>
  );
}
