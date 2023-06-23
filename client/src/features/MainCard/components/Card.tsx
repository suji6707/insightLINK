import React, { useState } from "react";
// recoil
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  CardDetailOpenAtom,
  ClickedCardDetailAtom,
} from "@/recoil/atoms/MainGraphAtom";
// types
import { CardData } from "@/types/dashborad.types";
import {
  AiOutlineExpandAlt,
} from "react-icons/ai";

interface CardProps {
  data: CardData;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const [detailOpen, setDetailOpen] = useRecoilState(CardDetailOpenAtom);
  const setClickedDetail = useSetRecoilState(
    ClickedCardDetailAtom
  );
  
  const handleCardClick = () => {
    setDetailOpen(!detailOpen);
    setClickedDetail(data?.cardId);
  };

  return (
    <div className="w-1/2 bg-red-200 h-1/3">
      <div>
        card <AiOutlineExpandAlt onClick={handleCardClick} />
      </div>
      <div>tag {data?.cardTag}</div>
      <div>{data?.cardContent}</div>
    </div>
  );
};

export default Card;
