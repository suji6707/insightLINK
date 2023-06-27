import React from "react";
import { AiOutlineExpand } from "react-icons/ai";

type HandleExpandClickType = (id: number) => void;

function Card({ card, handleExpandClick }: { card: any; handleExpandClick: HandleExpandClickType }) {
  return (
    <div className="relative w-[10rem] h-[10rem] rounded-md border border-[#DADADA] bg-[#F4F4F4]">
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${card.imageUrl}')`,
        }}
      ></div>
      <div className="absolute right-[0.75rem] bottom-[0.75rem] w-[1.75rem] h-[1.75rem] flex items-center justify-center rounded-md bg-white">
        <AiOutlineExpand onClick={() => handleExpandClick(card.id)} />
      </div>
    </div>
  );
}

export default Card;
