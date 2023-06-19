import React from "react";
// 타입 임포트
import { CardData } from "@/types/dashborad.types";

function Card(data: CardData) {
  return (
    <div className="w-2/5 bg-red-200 h-1/3">
      <div> card </div>
      <div> tag {data.data.cardTag}</div>
      <div> Content {data.data.cardContent}</div>
    </div>
  );
}

export default Card;
