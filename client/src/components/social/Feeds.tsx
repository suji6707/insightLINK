import React, { useEffect, useRef, useState } from "react";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { GET } from "@/axios/GET";
import CardDetail from "./CardDetail";

export default function Feeds() {
  const [cards, setCards] = useState([]);
  // 모달
  const modalRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [cardId, setCardId] = useState(1);

  const getFeeds = async () => {
    const data = await GET("feeds");
    if (data != null) {
      setCards(data);
    }
  };

  useEffect(() => {
    getFeeds();
  }, []);

  const modalOutsideClicked = (e: any) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  type CardType = {
    id: number;
    tags: string;
    content: string;
  };
  return (
    <div className="w-full">
      <p className="text-3xl font-semibold">피드</p>
      <ul>
        {cards &&
          cards.map((c: CardType) => {
            return (
              <li
                key={c.id}
                className="flex flex-col border-2 my-4"
                onClick={() => setCardId(c.id)}
              >
                <div className="flex justify-between border-b-2 p-2">
                  <div>
                    <p>#{c.tags}</p>
                  </div>
                  <div className="flex">
                    <FiThumbsUp className="mr-2" />
                    <FiThumbsDown className="mr-2" />
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
}
