import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { DashBoardCardAtom } from "@/recoil/atoms/MainGraphAtom";
// Component
import NavBar from "../features/Dashboard/components/NavBar";
import UserPanel from "@/features/Dashboard/components/UserPanel";
import MainGraph from "@/features/MainGraph/components/MainGraph/MainGraph";
import CardPanel from "@/features/MainCard/components/CardPanel";
import ImageUpload from "@/features/ImageUpload/ImageUpload";

export default function Dashboard() {
  const [openCard, setOpenCard] = useRecoilState(DashBoardCardAtom);
  const [showImgModal, setShowImgModal] = useState(false);

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-between w-full">
        <UserPanel
          showImgModal={showImgModal}
          setShowImgModal={setShowImgModal}
        />
        <div className="flex flex-row justify-between w-full">
          <MainGraph />
          {openCard ? <CardPanel /> : <></>}
        </div>
      </div>
      {showImgModal && (
        <ImageUpload
          showImgModal={showImgModal}
          setShowImgModal={setShowImgModal}
        />
      )}
    </>
  );
}
