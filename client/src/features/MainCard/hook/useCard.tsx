import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// recoil
import { useRecoilValue } from "recoil";
import { NodeNameAtom } from "@/recoil/atoms/MainGraphAtom";
// Api call
import { Card_Info_Api } from "@/axios/dashBoardApi";
// types
import { CardData } from "@/types/dashborad.types";

function useCard() {
  const [data, setData] = useState<CardData[]>();
  const nodeName = useRecoilValue(NodeNameAtom);
  const router = useRouter();

  useEffect(() => {
    const getCardData = async () => {
      const userid = Array.isArray(router.query.userid)
        ? router.query.userid[0]
        : router.query.userid;

      const cardData = await Card_Info_Api(nodeName, userid);
      setData(cardData);
    };
    getCardData();
  }, [nodeName]);

  return data;
}

export default useCard;
