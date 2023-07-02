import React from "react";
import { useRouter } from "next/router";

import { HeaderNoti_DTO } from "@/types/notification.types";

export default function AlarmModal(notiArr: HeaderNoti_DTO[]) {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/social");
  };

  console.log("useNoti data 값 모달까지 전달: ", notiArr);
  return (
    <div className="w-[15rem] max-h-[20rem] min-h-[10rem] bg-slate-100 absolute z-20 top-10 rounded-3xl py-3">
      <div className="px-1 pb-2 text-xl border-b font-mediums">새로운 알림</div>
      {notiArr && notiArr.length > 0 ? (
        notiArr.map((noti, idx) => {
          let message;
          switch (noti.case) {
            case "Following":
              message = `&#34;${noti.sender}&#34;님이 회원님을 팔로우했습니다.`;
              break;
            case "CardDuplicate":
              message = `&#34;${noti.sender}&#34;님이 회원님의 카드를 복사했습니다.`;
              break;
            default:
              message = `&#34;${noti.sender}&#34;님으로부터 알림이 있습니다.`;
          }

          return (
            <div
              className="border-b h-[2rem] pt-1"
              onClick={handleRedirect}
              key={idx}
            >
              {message}
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}
