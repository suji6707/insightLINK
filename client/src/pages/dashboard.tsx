import React, { useRef, useState } from "react";
// Component
import NavBar from "../components/NavBar";
import UserPanel from "@/components/dashboard/UserPanel";
import Main_graph from "@/components/dashboard/MainGraph";
// import MainGraph from "@/features/MainGraph/components/MainGraph"
import CardPanel from "@/components/dashboard/CardPanel";
import ImageUpload from "@/components/image/ImageUpload";

export default function Dashboard() {
  const [openCard, setOpenCard] = useState(false);
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
          <Main_graph openCard={openCard} setOpenCard={setOpenCard} />
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
