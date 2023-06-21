import React from "react";
// recoil
import { useRecoilState } from "recoil";
import {
  CardDetailOpenAtom,
  ClickedCardDetailAtom,
} from "@/recoil/atoms/MainGraphAtom";
// type import
import { CardData } from "@/types/dashborad.types";

// type declaration for the data prop
type CardProps = {
  data: CardData;
};

function Card({ data }: CardProps) {
  const [detailOpen, setDetailOpen] = useRecoilState(CardDetailOpenAtom);
  const [clickedDetail, setClickedDetail] = useRecoilState(
    ClickedCardDetailAtom
  );

  const handleCardClick = () => {
    setDetailOpen(!detailOpen);
    setClickedDetail(data?.cardId);
  };

  return (
    <div className="w-1/2 bg-red-200 h-1/3" onClick={handleCardClick}>
      <div> card </div>
      <div> tag {data?.cardTag}</div>
      <div> Content {data?.cardContent}</div>
    </div>
  );
}

export default Card;
