import React from "react";
// Assets
import { AiFillMinusCircle } from "react-icons/ai";

const ImageList: React.FC<ImageListProps> = ({ imgList, deleteImg }) => {
  return (
    <ul
      className="flex flex-col items-start gap-2.5 flex-1 self-stretch h-full overflow-scroll"
      style={{
        borderTop: "1px solid #DADADA",
        background: "#FFF",
      }}
    >
      {imgList &&
        imgList.map((img: any, index: number) => {
          return (
            <li
              key={index}
              className="flex items-center"
              style={{
                height: "3.75rem",
                padding: "0 1rem",
                gap: "0.5rem",
                alignSelf: "stretch",
                borderRadius: "4px",
              }}
            >
              <AiFillMinusCircle
                className="flex w-4 h-4 justify-center items-center rounded-lg cursor-pointer"
                style={{ color: "#5667FF" }}
                onClick={() => deleteImg(index)}
              />
              <p
                className="text-sm font-light leading-6"
                style={{
                  color: "#181818",
                  fontFamily: "IBM Plex Sans",
                  letterSpacing: "-0.02625rem",
                  lineHeight: "160%",
                }}
              >
                {img.name}
              </p>
            </li>
          );
        })}
    </ul>
  );
};

export default ImageList;
