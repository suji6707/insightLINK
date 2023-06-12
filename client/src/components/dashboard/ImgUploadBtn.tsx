import React, { useRef } from "react";
// Assets
import { BsCamera } from "react-icons/bs";
import { POSTImg } from "../../axios/ImgUploadBtn";

export default function ImgUploadBtn() {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    POSTImg(formData); // 💡 결과 리턴
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
