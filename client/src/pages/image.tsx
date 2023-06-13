import React, { useRef, useState } from "react";
import tw from "tailwind-styled-components";

import { POST } from "@/axios/POST";
// Components
import NavBar from "@/components/NavBar";
import { Wrapper } from "@/styles/wrapper";
// Assets
import { FiUploadCloud } from "react-icons/fi";
import { TiDocumentDelete } from "react-icons/ti";
import ImageList from "@/components/image/ImgList";

export default function Image() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLLiElement>(null);

  const [imgList, setImgList] = useState<string[]>([]);

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
    const selectedImgArray = [...selectedImg];
    setImgList(selectedImgArray);
  };

  const deleteImg = (selectedIndex: number) => {
    const newImgList = imgList.filter((_, index) => index !== selectedIndex); // 선택된 인덱스에 해당하는 값 삭제
    setImgList(newImgList);
  };

  const POSTImgAuto = () => {
    const formData = new FormData();
    for (let file of imgList) {
      formData.append("photos", file);
    }

    // 로컬 이미지 업로드 API
    const uploadImg = async () => {
      await POST("upload", formData, {
        "Content-Type": "multipart/form-data",
      });
    };

    uploadImg();
  };

  const ClasBtn = tw.p`
  h-16 w-5/12 py-8 flex justify-center items-center text-2xl border border-black rounded-lg hover:bg-yellow-300 hover:text-white transition-colors dark:border-white cursor-pointer
  `;

  return (
    <div>
      <NavBar />
      <Wrapper className="flex-row justify-between">
        <div className="border-8 w-2/4 h-4/6 border-dashed flex flex-col justify-center items-center">
          <input
            type="file"
            multiple
            accept=".jpg, .jpeg, .png"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImgChange}
          />
          <FiUploadCloud
            size={180}
            onClick={handleInput}
            className="text-gray-300 my-4"
          />
          <p className="text-lg">스크린샷을 업로드하세요</p>
        </div>
        <div className="w-5/12 h-4/6 flex flex-col justify-between">
          <ImageList imgList={imgList} deleteImg={deleteImg} />
          <div className="mx-auto flex flex-row justify-between w-full">
            <ClasBtn onClick={() => POSTImgAuto()}>자동</ClasBtn>
            <ClasBtn>수동</ClasBtn>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
