import { GET } from "@/axios/GET";
import getToken from "@/axios/getToken";
import React, { useEffect, useState } from "react";

const CardDetail = ({
  modalRef,
  modalOutsideClicked,
  cardId,
  userId,
}: CardDetail) => {
  const [detail, setDetail] = useState<any>();

  const getDetail = async () => {
    const token = getToken();
    const data = await GET(
      `cards/info?cardId=${cardId}&userId=${userId}`,
      token
    );
    console.log(data);
    if (data) {
      setDetail(data);
    }
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
      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white flex-col justify-start w-1/2 h-4/6 border drop-shadow-xl rounded-xl">
        <div className="p-2 border-b border-current flex flex-row justify-between p-4">
          <div className="flex flex-row">
            <img
              src={detail?.profile_img}
              className="w-24 h-24 rounded-full"
              alt="screenshot"
            />
            <p>{detail.userName}</p>
            {detail.cardTag &&
              detail.cardTag.map((t: string, index: number) => {
                return (
                  <p key={index} className="m-2 p-2">
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
      </div>
    </div>
  );
};

export default CardDetail;
