import React from "react";
// Assets
import { AiFillMinusCircle } from "react-icons/ai";

const ImageList: React.FC<ImageListProps> = ({ imgList, deleteImg }) => {
  return (
    <ul className="border h-full p-4 mb-6 overflow-y-auto drop-shadow-xl">
      {imgList &&
        imgList.map((img: any, index: number) => {
          return (
            <li key={index} className="flex flex-row my-2">
              <AiFillMinusCircle
                className="text-red-600 text-2xl w-8"
                onClick={() => deleteImg(index)}
              />
              <p className="text-lg ml-4 truncate w-full">{img.name}</p>
            </li>
          );
        })}
    </ul>
  );
};

export default ImageList;
