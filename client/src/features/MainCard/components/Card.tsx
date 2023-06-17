import React from "react";
// 타입 임포트
import { Card_Info_Api_DTO } from "@/axios/dashBoardApi";

function Card(data: Card_Info_Api_DTO) {
  return (
    <div className="w-2/5 bg-red-200 h-1/3">
      <div>{data.data[0]?.cardTag}</div>
      <div>{data.data[0]?.cardContent}</div>
    </div>
  );
}

export default Card;
