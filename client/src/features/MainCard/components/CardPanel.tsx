import React, { useEffect, useState } from "react";
//recoil
import { useRecoilState } from "recoil";
import { CardDataAtom } from "@/recoil/atoms/MainGraphAtom";
//components
import Card from "@/features/MainCard/components/Card";
// custom hook
import useCard from "@/features/MainCard/hook/useCard";
// type
import { CardData } from "@/types/dashborad.types";

function CardPanel() {
  const [cardData, setCardData] = useState();

  const getData = useCard();

  console.log(getData);
  useEffect(() => {
    setCardData(getData);
  }, [getData]);

  // console.log("data :", data)
  console.log("cardData :", cardData);

  return (
    <div className="flex flex-wrap w-full h-full bg-slate-100">
      {cardData?.map((data: CardData, index: number) => {
        return <Card data={data} key={index} />;
      })}
    </div>
  );
}

export default CardPanel;
