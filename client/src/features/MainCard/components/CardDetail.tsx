import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CardDetailOpenAtom } from "@/recoil/atoms/MainGraphAtom";
import useDetail from "@/features/MainCard/hook/useCard";
import { BiUndo } from "react-icons/bi";

function CardDetail() {
  const [cardDetailData, setCardDetailData] = useState<any>({});
  const [detailOpen, setDetailOpen] = useRecoilState(CardDetailOpenAtom);
  const detailData = useDetail();

  const handleDetailOpen = () => {
    setDetailOpen(!detailOpen);
  };

  useEffect(() => {
    if (detailData) {
      setCardDetailData(detailData);
    }
  }, [detailData]);

  return (
    <div className="w-full h-full bg-red-200">
      <div className="flex ml-auto">
        <button onClick={handleDetailOpen}>
          <BiUndo />
        </button>
      </div>
      {cardDetailData && cardDetailData.length > 0 ? (
        <>
          <div>Tag: {cardDetailData[0].cardTag}</div>
          <div>Content: {cardDetailData[0].cardContent}</div>
          <div>Image: {cardDetailData[0].cardImage}</div>
        </>
      ) : (
        <div>No card details found.</div>
      )}
    </div>
  );
}

export default CardDetail;
