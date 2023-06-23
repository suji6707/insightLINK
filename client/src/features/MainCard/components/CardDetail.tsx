import React, { useEffect, useState } from "react";
// recoil
import { useRecoilState } from "recoil";
import { CardDetailOpenAtom } from "@/recoil/atoms/MainGraphAtom";
// library
import { BiUndo } from "react-icons/bi";
// custom hook
import useDetail from "@/features/MainCard/hook/useDetail";
// types
import { CardDataDetail } from "@/types/dashborad.types";

function CardDetail() {
  const [cardDetailData, setCardDetailData] = useState<CardDataDetail>({});
  const [detailOpen, setDetailOpen] = useRecoilState(CardDetailOpenAtom);

  const detailData = useDetail();

  const handleDetailOpen = () => {
    setDetailOpen(!detailOpen);
  };

  useEffect(() => {
    if (detailData) {
      setCardDetailData(detailData);
    }
  }, [detailOpen, detailData]);

  return (
    <div className="w-full h-full bg-red-200">
      <div className="flex ml-auto">
        <button onClick={handleDetailOpen}>
          <BiUndo />
        </button>
      </div>

      <div>Tag: {cardDetailData?.cardTag}</div>
      <div>Content: {cardDetailData?.content}</div>
      <div>Image: {cardDetailData?.cardImage}</div>
    </div>
  );
}

export default CardDetail;
