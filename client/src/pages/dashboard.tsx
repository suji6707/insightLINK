import React, { useRef, useState } from "react";
// Component
import NavBar from "../components/NavBar";
import UserPanel from "@/components/dashboard/UserPanel";
import Main_graph from "@/components/dashboard/MainGraph";
// import MainGraph from "@/features/MainGraph/components/MainGraph"
import CardPanel from "@/components/dashboard/CardPanel";

export default function Dashboard() {
  const [openCard, setOpenCard] = useState(false);

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-between w-full">
        <UserPanel />
        <div className="flex flex-row justify-between w-full">
          <Main_graph openCard={openCard} setOpenCard={setOpenCard} />
          {openCard ? <CardPanel /> : <></>}
        </div>
      </div>
    </>
  );
}
