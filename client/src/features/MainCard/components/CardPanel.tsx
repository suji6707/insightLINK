import React from "react";
//components
import Card from "@/features/MainCard/components/Card";
// custom hook
import useCard from "@/features/MainCard/hook/useCard";
// type
import { Card_Info_Api_DTO } from "@/axios/dashBoardApi";

function CardPanel() {
  // const cardData = useCard();

  return (
    <div className="flex w-full h-full bg-slate-100">
      {/* {cardData?.map((data: Card_Info_Api_DTO, index: number) => {
        return <Card data={data} key={index} />;
      })} */}
    </div>
  );
}

export default CardPanel;
