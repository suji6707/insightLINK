import React, { useEffect, useRef, useState } from "react";
import { GET } from "@/axios/GET";
import CardDetail from "./CardDetail";
import axios from "axios";
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
    // const data = await GET(`social/card?userId={}`);
    // 임시
    const data = await axios.get(`http://localhost:4000/feeds`);
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
      <p className="text-3xl font-bold mb-4">피드</p>
      <ul>
        {cards &&
          cards.map((c: Feeds) => {
            return (
              <li
                key={c.id}
                className="flex flex-col border-t border-b py-4"
                onClick={() => setCardId(c.id)}
              >
                <div className="flex flex-row items-center w-full">
                  <img src={c.profile} className="w-12 h-12 rounded-full" />
                  <div className="flex justify-between p-2 items-center w-full">
                    <p className="font-bold w-full">{c.nickName}</p>
                    <div className="flex justify-end items-center w-full">
                      <p className="mr-2">#{c.tags}</p>
                      <AiOutlineCloseCircle
                        className="text-xl"
                        onClick={() => handleClose(c.id)}
                      />
                    </div>
                  </div>
                </div>

                <p
                  className="p-2 inline-block white space-normal w-full break-words cursor-pointer"
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
