import { GET } from "@/axios/GET";
import getToken from "@/axios/getToken";
import React, { useEffect, useState } from "react";
import { AiFillPlusCircle, AiOutlinePlusCircle } from "react-icons/ai";

import { CardDetail } from "@/types/social.types";
import { POST } from "@/axios/POST";

const CardDetail = ({
  modalRef,
  modalOutsideClicked,
  cardId,
  userId,
}: CardDetail) => {
  const [detail, setDetail] = useState<any>();
  const [isPlus, setIsPlus] = useState(false);

  const getDetail = async () => {
    const token = getToken();
    const data = await GET(
      `cards/info?cardId=${cardId}&userId=${userId}`,
      token
    );
    if (data) {
      setDetail(data);
    }
  };

  const cloneCard = async () => {
    const token = getToken();
    await POST(`social/clone`, { cardId: cardId }, token);
    setIsPlus(true);
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-30"
      ref={modalRef}
      onClick={(e) => modalOutsideClicked(e)}
    >
      <div className="absolute flex-col justify-start w-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border top-1/2 left-1/2 h-4/6 drop-shadow-xl rounded-xl">
        <div className="flex flex-row justify-between p-2 p-4 border-b border-current">
          <div className="flex flex-row">
            <img
              src={detail?.profile_img}
              className="w-24 h-24 rounded-full"
              alt="profile"
            />
            <p>{detail?.userName}</p>
            {detail?.cardTag &&
              detail?.cardTag.map((t: string, index: number) => {
                return (
                  <p key={index} className="p-2 m-2">
                    #{t}
                  </p>
                );
              })}
          </div>
        </div>
        <div>
          <p>{detail?.content}</p>
          <img
            src={detail?.cardImage}
            className="w-24 h-24 cursor-pointer"
            alt="screenshot"
          />
        </div>
        <div className="flex justify-center w-full">
          {isPlus ? (
            <AiFillPlusCircle className="w-12 h-12" />
          ) : (
            <AiOutlinePlusCircle className="w-12 h-12" onClick={cloneCard} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
