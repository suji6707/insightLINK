import React, { useEffect, useState } from "react";
// recoil
import { useRecoilValue } from "recoil";
import { CardDetailOpenAtom, NodeNameAtom } from "@/recoil/atoms/MainGraphAtom";
// components
import Card from "@/features/Dashboard/MainCard/components/Card";
import CardDetail from "@/features/Dashboard/MainCard/components/CardDetail";
// custom hook
import useCard from "@/features/Dashboard/MainCard/hook/useCard";
// types
import { CardData } from "@/types/dashborad.types";

function CardPanel() {
  const [cardData, setCardData] = useState<CardData[]>([]);
  const detailOpen = useRecoilValue(CardDetailOpenAtom);
  const nodeName = useRecoilValue(NodeNameAtom);
  const getData = useCard();

  useEffect(() => {
    if (getData) {
      setCardData(getData);
    }
  }, [getData]);

  return (
    <div>
      {detailOpen ? (
        <div className="w-[32rem] h-[33rem]">
          <CardDetail />
        </div>
      ) : (
        <>
          <div className="flex flex-row justify-between mb-4">
            <div className="px-4 font-semibold leading-6 text-white bg-blue-600 rounded">
              # {nodeName}
            </div>
            <div></div>
          </div>
          <div className="grid grid-cols-3 grid-flow-row w-[32rem] gap-y-3">
            {cardData?.map((data: CardData, index: number) => {
              return <Card data={data} key={index} isFeed={false} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default CardPanel;
