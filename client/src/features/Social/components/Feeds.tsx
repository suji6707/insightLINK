import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import getToken from "@/axios/getToken";
import { GET } from "@/axios/GET";
import Card from "@/features/Dashboard/MainCard/components/Card";
import CardDetail from "./CardDetail";
// Recoil
import { useRecoilState } from "recoil";
import { ReloadFeedsAtom } from "@/recoil/atoms/SocialAtom";
// Types
import { CardData } from "@/types/dashborad.types";

const Feeds = () => {
  const [cards, setCards] = useState<CardData[]>();
  // 모달
  const modalRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(1);
  const [cardId, setCardId] = useState(1);
  const [feedChange, setFeedChange] = useRecoilState(ReloadFeedsAtom);

  const router = useRouter();

  const getFeeds = async () => {
    const token = getToken();
    const data = await GET(`social/card`, token);
    if (data.response?.status === 400) {
      setCards([]);
    } else {
      setCards(data);
      setFeedChange(false);
    }
  };

  useEffect(() => {
    getFeeds();
  }, [feedChange]);

  const handleClick = (userid: number) => {
    router.push(`/dashboard/${userid}`);
  };

  const modalOutsideClicked = (e: any) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  return (
    <div className="flex pb-5 flex-col items-start gap-[2rem] self-stretch border-b border-gray-900 shadow-sm">
      <h2 className="text-gray-900 text-[1.5rem] font-kanit font-semibold leading-1.5 tracking-tighter">
        Feed
      </h2>
      <div className="grid grid-cols-3 grid-flow-row gap-y-3 self-stretch flex-wrap min-h-[53rem]">
        {cards?.map((data: CardData, index: number) => {
          return <Card data={data} key={index} isFeed={true} />;
        })}
        {/* {cards &&
          cards.map((c: Card, index: number) => {
            return (
              <li
                key={index}
                className={`flex flex-col py-4 border-t border-b  ${
                  !c.isFriend ? "bg-blue-100" : ""
                }`}
                onClick={() => setCardId(c.cardId)}
              >
                {!c.isFriend && (
                  <p className="mb-4">이런 인사이트는 어떤가요?</p>
                )}
                <div className="flex flex-row items-center w-full">
                  <img
                    src={c.img}
                    className="w-12 h-12 rounded-full cursor-pointer"
                    onClick={() => {
                      handleClick(c.userId);
                    }}
                  />
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
          })} */}
      </div>
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
