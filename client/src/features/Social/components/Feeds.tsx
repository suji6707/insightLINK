import React, { useEffect, useRef, useState } from "react";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { GET } from "@/axios/GET";
import CardDetail from "./CardDetail";
import axios from "axios";

const Feeds = () => {
  const [cards, setCards] = useState([]);
  // 모달
  const modalRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [cardId, setCardId] = useState(1);

  const getFeeds = async () => {
    // const data = await GET("feeds");
    // 임시
    const data = await axios.get(`http://localhost:4000/feeds`);
    if (data != null) {
      setCards(data.data);
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
                      <FiThumbsUp className="mr-2" />
                      <FiThumbsDown className="mr-2" />
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
