import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { DashBoardCardAtom, ImgModalAtom } from "@/recoil/atoms/MainGraphAtom";
// Component
import MainGraph from "@/features/Dashboard/MainGraph/components/MainGraph/MainGraph";
import DashboardLayout from "@/features/Dashboard/components/Dashboardlayout";
import Loading from "@/features/Dashboard/MainGraph/components/Loading/GraphLoading";
//custom hook
import useGraph from "@/features/Dashboard/MainGraph/hooks/useGraph";

export default function Dashboard() {
  const [openCard, setOpenCard] = useRecoilState(DashBoardCardAtom);
  const [showImgModal, setShowImgModal] = useRecoilState(ImgModalAtom);

  const graphData = useGraph();

  return (
    <>
      {graphData ? (
        <DashboardLayout {...(<MainGraph data={graphData} />)}>
          <MainGraph data={graphData} />
        </DashboardLayout>
      ) : (
        <Loading />
      )}
    </>
  );
}
