import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
// Recoil
import { useRecoilState } from "recoil";
import { SocialImgModalAtom } from "@/recoil/atoms/SocialAtom";

import { GET } from "@/axios/GET";
import CardDetail from "./CardDetail";
// Types
import { CardData } from "@/types/dashborad.types";
// Assets
import { AiOutlineClose } from "react-icons/ai";

const Feeds = () => {
  const [cards, setCards] = useState<CardData[]>();
  // 모달
  const [showModal, setShowModal] = useRecoilState(SocialImgModalAtom);
  const [userId, setUserId] = useState(1);
  const [cardId, setCardId] = useState(1);

  const getFeeds = async () => {
    const data = await GET(`social/card`, true);
    if (data.status === 200) {
      setCards(data.data);
    }
    if (data.response?.status === 400) {
      setCards([]);
    }
  };

  useEffect(() => {
    getFeeds();
  }, []);

  const rejectCard = async (id: number) => {
    const data = await GET(`graph?userId=${id}`, true);
    if (data.status === 200) {
      getFeeds();
    }
  };

  const handleClose = (id: number) => {
    rejectCard(id);
  };

  return (
    <div className="flex pb-5 flex-col items-start gap-[2rem] self-stretch border-b border-gray-900 shadow-sm w-full">
      <h2 className="text-gray-900 text-[1.5rem]  font-semibold leading-1.5 tracking-tighter">
        Feed
      </h2>
      <div className="grid grid-cols-5 grid-flow-row gap-y-3 self-stretch flex-wrap min-h-[53rem] w-full">
        {cards &&
          cards.map((c: CardData, index: number) => {
            return (
              <div
                key={index}
                className="w-[10rem] bg-gray-100 h-[10rem] border-2 rounded border-gray-300 relative hover:border-blue-500 flex justify-center items-center"
              >
                <img
                  src={c?.cardImg}
                  className="object-cover max-w-full max-h-full cursor-pointer"
                  onClick={() => {
                    setShowModal(true);
                    setCardId(c.cardId);
                    setUserId(c.userId);
                  }}
                />
                <button
                  onClick={() => handleClose(c?.userId)}
                  className="absolute svg-button-nomal right-3 top-3 cursor-pointer"
                >
                  <AiOutlineClose className="self-center z-1" size="1rem" />
                </button>
              </div>
            );
          })}
      </div>
      {showModal && <CardDetail cardId={cardId} userId={userId} />}
    </div>
  );
};

export default Feeds;
