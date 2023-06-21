import React, { useEffect, useRef, useState } from "react";
import getToken from "@/axios/getToken";

import { GET } from "@/axios/GET";
import CardDetail from "./CardDetail";
// Assets
import { AiOutlineCloseCircle } from "react-icons/ai";

interface Card {
  id: number;
  nickName: string;
  profile: string;
  tags: string;
  content: string;
}

const Feeds = () => {
  const [cards, setCards] = useState<Card[]>([]);
  // 모달
  const modalRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(1);
  const [cardId, setCardId] = useState(1);

  const getFeeds = async () => {
    const token = getToken();
    const data = await GET(`social/card?`, token);
    if (data != null) {
      setCards(data);
    }
  };

  useEffect(() => {
    getFeeds();
  }, []);

  const rejectCard = async (id: number) => {
    const data = await GET(`graph?userId=${id}`, getToken());
    if (data) {
      // const newCards = cards.filter((c) => c.id !== id);
      // setCards(newCards);
      getFeeds();
    }
  };

  const handleClose = (id: number) => {
    rejectCard(id);
  };

  const modalOutsideClicked = (e: any) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  return (
    <div className="w-full">
      <p className="mb-4 text-3xl font-bold">피드</p>
      <ul>
        {cards &&
          cards.map((c: Cards, index: number) => {
            return (
              <li
                key={index}
                className="flex flex-col py-4 border-t border-b"
                onClick={() => setCardId(c.cardId)}
              >
                <div className="flex flex-row items-center w-full">
                  <img src={c.img} className="w-12 h-12 rounded-full" />
                  <div className="flex items-center justify-between w-full p-2">
                    <p className="w-full font-bold">{c.userName}</p>
                    <div className="flex items-center justify-end w-full">
                      <p className="mr-2">#{c.tag}</p>
                      <AiOutlineCloseCircle
                        className="text-xl"
                        onClick={() => handleClose(c.cardId)}
                      />
                    </div>
                  </div>
                </div>

                <p
                  className="inline-block w-full p-2 break-words cursor-pointer white space-normal"
                  onClick={() => {
                    setShowModal(true);
                    setCardId(c.cardId);
                    setUserId(c.userId);
                  }}
                >
                  {c.content}
                </p>
              </li>
            );
          })}
      </ul>
      {showModal && (
        <CardDetail
          modalRef={modalRef}
          modalOutsideClicked={modalOutsideClicked}
          cardId={cardId}
          userId={userId}
        />
      )}
    </div>
  );
};

export default Feeds;
