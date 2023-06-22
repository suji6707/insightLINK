import React, { useEffect, useState } from "react";
// recoil
import { useRecoilValue } from "recoil";
import { CardDetailOpenAtom } from "@/recoil/atoms/MainGraphAtom";
// components
import Card from "@/features/MainCard/components/Card";
import CardDetail from "@/features/MainCard/components/CardDetail";
// custom hook
import useCard from "@/features/MainCard/hook/useCard";
// type
import { CardData} from "@/types/dashborad.types";

function CardPanel() {
  const [cardData, setCardData] = useState<CardData[]>([]);
  const detailOpen = useRecoilValue(CardDetailOpenAtom);
  const getData = useCard();

  useEffect(() => {
    if (getData) {
      setCardData(getData);
    }
  }, [getData]);

  console.log(cardData);

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
