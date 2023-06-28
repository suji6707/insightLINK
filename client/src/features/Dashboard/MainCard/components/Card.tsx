import React from "react";

import getToken from "@/axios/getToken";
import { GET } from "@/axios/GET";
// Recoil
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  CardDetailOpenAtom,
  ClickedCardDetailAtom,
} from "@/recoil/atoms/MainGraphAtom";
import { ReloadFeedsAtom } from "@/recoil/atoms/SocialAtom";
// Types
import { CardData } from "@/types/dashborad.types";
// Assets
import { BiFullscreen } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

interface CardProps {
  data: CardData;
  isFeed: boolean;
}

const Card: React.FC<CardProps> = ({ data, isFeed }) => {
  const [detailOpen, setDetailOpen] = useRecoilState(CardDetailOpenAtom);
  const setClickedDetail = useSetRecoilState(ClickedCardDetailAtom);
  const [feedChange, setFeedChange] = useRecoilState(ReloadFeedsAtom);

  console.log(data);

  const handleCardClick = () => {
    setDetailOpen(!detailOpen);
    setClickedDetail(data?.cardId);
  };

  const rejectCard = async (id: number) => {
    const data = await GET(`graph?userId=${id}`, getToken());
    if (data) {
      // const newCards = cards.filter((c) => c.id !== id);
      // setCards(newCards);
      setFeedChange(true);
    }
  };

  const handleClose = (id: number) => {
    rejectCard(id);
  };

  return (
    <div className="w-[10rem] bg-gray-100 h-[10rem] border-2 rounded border-gray-300 relative hover:border-blue-500 flex justify-center items-center">
      <img src={data?.cardImg} className="object-cover max-w-full max-h-full" />
      {isFeed && (
        <button
          onClick={() => handleClose(data?.userId)}
          className="absolute svg-button-nomal left-3 bottom-3 cursor-pointer"
        >
          <AiOutlineClose className="self-center z-1" size="1rem" />
        </button>
      )}
      <button
        onClick={handleCardClick}
        className="absolute svg-button-nomal right-3 bottom-3 cursor-pointer"
      >
        <BiFullscreen className="self-center z-1" size="1rem" />
      </button>
    </div>
  );
};

export default Card;
