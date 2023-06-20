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
  const [cardId, setCardId] = useState(1);

  const getFeeds = async () => {
    const data = await GET(`social/card?`, getToken());
    if (data != null) {
      setCards(data.data);
    }
  };

  useEffect(() => {
    getFeeds();
  }, []);

  const handleClose = (id: number) => {
    const newCards = cards.filter((c) => c.id !== id);
    setCards(newCards);
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
          cards.map((c: Feeds) => {
            return (
              <li
                key={c.id}
                className="flex flex-col py-4 border-t border-b"
                onClick={() => setCardId(c.id)}
              >
                <div className="flex flex-row items-center w-full">
                  <img src={c.profile} className="w-12 h-12 rounded-full" />
                  <div className="flex items-center justify-between w-full p-2">
                    <p className="w-full font-bold">{c.nickName}</p>
                    <div className="flex items-center justify-end w-full">
                      <p className="mr-2">#{c.tags}</p>
                      <AiOutlineCloseCircle
                        className="text-xl"
                        onClick={() => handleClose(c.id)}
                      />
                    </div>
                  </div>
                </div>

                <p
                  className="inline-block w-full p-2 break-words cursor-pointer white space-normal"
                  onClick={() => setShowModal(true)}
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
        />
      )}
    </div>
  );
};

export default Feeds;
