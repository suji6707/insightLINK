import React from "react";
// type
import { Card_Info_Api_DTO } from "@/axios/dashBoardApi";

function Card(data: Card_Info_Api_DTO) {
  return (
    <div className="w-2/5 bg-red-200 h-1/3">
      <div>{data?.cardTag}</div>
      <div>{data?.cardContent}</div>
    </div>
  );
}

export default Card;
