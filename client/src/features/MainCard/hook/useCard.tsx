import React, { useState, useEffect } from "react";
// recoil
import { useRecoilValue } from "recoil";
import { NodeIdAtom } from "@/recoil/atoms/MainGraphAtom";
// Api call
import { Card_Info_Api, Card_Info_Api_DTO } from "@/axios/dashBoardApi";

function useCard() {
  const [data, setData] = useState<Card_Info_Api_DTO>();
  const nodeId = useRecoilValue(NodeIdAtom)

  useEffect(() => {
    const getCardData = async () => {
      const cardData = await Card_Info_Api(nodeId);
      setData(cardData);
    };
    getCardData();
  }, [nodeId]);

  return data;
}

export default useCard;
