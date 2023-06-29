import React from "react";
import { useRouter } from "next/router";

export default function AlarmModal() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/social");
  };

  return (
    <div className="w-[15rem] max-h-[20rem] min-h-[10rem] bg-slate-100 absolute z-20 top-10 rounded-3xl py-3">
      <div className="px-1 pb-2 text-xl border-b font-mediums">새로운 알림</div>
      <div className="border-b h-[2rem] pt-1" onClick={handleRedirect}>
        &#34;신병규&#34;님이 새로운 스크린샷을 ...
      </div>
    </div>
  );
}
