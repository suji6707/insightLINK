import React from "react";
//recoil
import { useRecoilState } from "recoil";
import { CardDetailOpenAtom, ClickedCardDetailAtom } from "@/recoil/atoms/MainGraphAtom";
// 타입 임포트
import { CardData } from "@/types/dashborad.types";

function Card(data: CardData) {
  const [detailOpen, setDetailOpen] = useRecoilState(CardDetailOpenAtom);
  const [clickedDetail, setClickedDetail] = useRecoilState(ClickedCardDetailAtom);

  const handleCardClick = () => {
    setDetailOpen(!detailOpen);
    setClickedDetail(data?.data.cardId)
  };

  return (
    <div className="w-1/2 bg-red-200 h-1/3" onClick={handleCardClick}>
      <div> card </div>
      <div> tag {data?.data.cardTag}</div>
      <div> Content {data?.data.cardContent}</div>
    </div>
  );
}

export default Card;
