import React, { useRef, useState } from "react";
// Component
import NavBar from "../components/NavBar";
import UserPanel from "@/components/dashboard/UserPanel";
import MainGraph from "../components/dashboard/MainGraph";
import CardPanel from "@/components/dashboard/CardPanel";

export default function Dashboard() {
  const [openCard, setOpenCard] = useState(false);

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-between w-full">
        <UserPanel />
        <div className="flex flex-row justify-between w-full">
          <MainGraph openCard={openCard} setOpenCard={setOpenCard} />
          {openCard ? <CardPanel /> : <></>}
        </div>
      </div>
    </>
  );
}
