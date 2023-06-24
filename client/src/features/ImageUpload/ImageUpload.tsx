import React, { useRef, useState } from "react";
import AWS from "aws-sdk";
import tw from "tailwind-styled-components";

import { POST } from "@/axios/POST";
// Components
import { Wrapper } from "@/styles/wrapper";
// Assets
import { FiUploadCloud } from "react-icons/fi";
import ImageList from "@/features/ImageUpload/ImgList";
import getToken from "@/axios/getToken";

type ImgInfo = {
  blob: Blob;
  name: string;
  size: number;
  type: string;
};

export default function ImageUpload({ setShowImgModal }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [imgList, setImgList] = useState<ImgInfo[]>([]);
  const [imageUrl, setImageUrl] = useState<string[]>();

  const handleInput = () => {
    fileInputRef.current?.click();
  };

  // image input 받기
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImg = e.target.files;
    if (!selectedImg) {
      e.preventDefault();
      return;
    }
    const selectedImgArray = Array.from(selectedImg).map((file) => {
      const blob = new Blob([file], { type: file.type });
      return { name: file.name, type: file.type, size: file.size, blob };
    });
    setImgList(selectedImgArray);
  };

  const deleteImg = (selectedIndex: number) => {
    const newImgList = imgList.filter((_, index) => index !== selectedIndex);
    setImgList(newImgList);
  };

  if (process.env.S3_ACCESS_KEY && process.env.S3_SECRET_KEY) {
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      },
      region: "ap-northeast-2",
      signatureVersion: "2023-06-23",
    });
  }

  const resizeImage = (image: Blob, width: number): Promise<Blob> => {
    return new Promise<Blob>((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(image);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (ctx) {
          const aspectRatio = img.width / img.height;
          const height = width / aspectRatio;

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (resizedBlob) => {
              if (resizedBlob) {
                resolve(resizedBlob);
              } else {
                reject(new Error("이미지 리사이징 실패"));
              }
            },
            "image/jpeg",
            0.9
          );
        } else {
          reject(new Error("캔버스 컨텍스트 가져오기 실패"));
        }
      };

      img.onerror = () => {
        reject(new Error("이미지 로딩 실패"));
      };
    });
  };

  const uploadImages = async () => {
    const startTime = performance.now();
    try {
      const promises = imgList.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const { blob } = file;
          const fileName = `${Date.now()}.${file.name}`;

          // 이미지 리사이징
          const width = 400;
          resizeImage(blob, width)
            .then((resizedBlob) => {
              console.log("원본 Image Size:", blob.size);
              console.log("Resized Image Size:", resizedBlob.size);

              // 리사이즈된 이미지 업로드
              const s3 = new AWS.S3();
              s3.upload(
                {
                  Bucket: "sw-jungle-s3",
                  Key: fileName,
                  Body: resizedBlob,
                  ContentType: file.type,
                },
                (
                  uploadError: Error | null,
                  data: AWS.S3.ManagedUpload.SendData
                ) => {
                  if (uploadError) {
                    reject(uploadError);
                  } else if (data && data.Location) {
                    resolve(data.Location);
                  } else {
                    reject(new Error("이미지 업로드 실패 - S3"));
                  }
                }
              );
            })
            .catch((error) => {
              reject(error);
            });
        });
      });

      const uploadedImageUrls = await Promise.all(promises);
      setImageUrl(uploadedImageUrls);

      const POSTImgLink = async () => {
        const token = getToken();
        const result = await POST("upload", uploadedImageUrls, token);

        const endTime = performance.now();
        const executionTime = endTime - startTime;
        console.log("Execution time:", executionTime, "ms");

        if (result) {
          setShowImgModal(false);
        }
        return result;
      };

      POSTImgLink();
    } catch (error) {
      console.error("이미지 업로드 실패", error);
    }
  };

  const modalOutsideClicked = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      setShowImgModal(false);
    }
  };

  const ClasBtn = tw.p`
  h-10 w-full py-8 flex justify-center items-center text-xl rounded-lg hover:bg-yellow-300 hover:text-white transition-colors dark:border-white cursor-pointer border drop-shadow-xl
  `;

  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-30"
      ref={modalRef}
      onClick={(e) => modalOutsideClicked(e)}
    >
      <Wrapper className="flex-row justify-between absolute top-2/3 left-1/2 transform -translate-y-2/3 -translate-x-1/2 bg-white w-3/5 h-4/6 border drop-shadow-xl px-12 rounded-xl">
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
          <ClasBtn onClick={uploadImages}>자동</ClasBtn>
        </div>
      </Wrapper>
    </div>
  );
}
