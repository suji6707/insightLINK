import React, { useEffect, useState } from "react";
// recoil
import { useRecoilValue } from "recoil";
import { CardDetailOpenAtom } from "@/recoil/atoms/MainGraphAtom";
// components
import Card from "@/features/MainCard/components/Card";
import CardDetail from "@/features/MainCard/components/CardDetail";
// custom hook
import useCard from "@/features/MainCard/hook/useCard";
// types
import { CardData, CardData_DTO } from "@/types/dashborad.types";

function CardPanel() {
  const [cardData, setCardData] = useState<CardData_DTO>();
  const detailOpen = useRecoilValue(CardDetailOpenAtom);
  const getData = useCard();

  useEffect(() => {
    if (getData) {
      setCardData(getData);
    }
  }, [getData]);

  return (
    <div className="flex flex-wrap w-1/2 h-full bg-slate-100">
      {detailOpen ? (
        <CardDetail />
      ) : (
        cardData?.map((data: CardData, index: number) => {
          return <Card data={data} key={index} />;
        })
      )}
    </div>
  );
}

export default CardPanel;
