// Recoil
import { useRecoilState } from "recoil";
import { UploadedImgAtom } from "@/recoil/atoms/MainGraphAtom";
// Component
import UploadImagesToS3 from "../UploadImagesToS3";

const useUploadImagesToS3 = () => {
  const [imageUrl, setImageUrl] = useRecoilState(UploadedImgAtom);

  const handleUploadImagesToS3 = async (imgList: ImgInfo[]) => {
    try {
      const uploadedImageUrls = await UploadImagesToS3(imgList);
      setImageUrl(uploadedImageUrls);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };

  return handleUploadImagesToS3;
};

export default useUploadImagesToS3;
