import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// recoil
import { useRecoilValue } from "recoil";
import { ClickedCardDetailAtom } from "@/recoil/atoms/MainGraphAtom";
// Api call
import { Card_Detail_Api } from "@/axios/dashBoardApi";
// types
import { CardDataDetail } from "@/types/dashborad.types";

function useDetail() {
  const [data, setData] = useState<CardDataDetail>();
  const cardId = useRecoilValue(ClickedCardDetailAtom);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const getCardData = async () => {
      const userid = Array.isArray(router.query.userid)
        ? router.query.userid[0]
        : router.query.userid;

      const cardData = await Card_Detail_Api(cardId, userid);
      setData(cardData);
    };
    getCardData();
  }, [cardId]);

  return data;
}

export default useDetail;
