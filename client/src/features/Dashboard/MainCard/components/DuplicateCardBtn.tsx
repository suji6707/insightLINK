import React, { useState } from "react";
import { useRouter } from "next/router";
import { Duplicate_Card_API } from "@/axios/dashBoardApi";

export default function DuplicateCardBtn() {
  const handleDuplicateCard = async () => {
    const DuplicateCard = await Duplicate_Card_API();
  };

  return (
    <>
      <button onClick={handleDuplicateCard} className="follow-btn">
      복제
      </button>
    </>
  );
}
