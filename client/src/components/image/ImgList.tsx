import React from "react";

type ImageListProps = {
  imgList: { fileName: string; url: string }[];
  deleteImg: (index: number) => void;
};

const ImageList: React.FC<ImageListProps> = ({ imgList, deleteImg }) => {
  return (
    <ul className="border h-full border-black p-4 mb-6 overflow-y-auto">
      {imgList &&
        imgList.map((img: any, index: number) => {
          return (
            <li key={index} className="flex flex-row my-2">
              <p
                className="text-xl border px-2 text-red-600 border-red-600 rounded-lg"
                onClick={() => deleteImg(index)}
              >
                -
              </p>
              <p className="text-lg ml-4 truncate">{img.name}</p>
            </li>
          );
        })}
    </ul>
  );
};

export default ImageList;
