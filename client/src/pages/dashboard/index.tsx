import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { DashBoardCardAtom, ImgModalAtom } from "@/recoil/atoms/MainGraphAtom";
// Component
import MainGraph from "@/features/Dashboard/MainGraph/components/MainGraph/MainGraph";
import UploadLoading from "@/features/Dashboard/MainGraph/components/Loading/UploadLoading";
import DashboardLayout from "@/features/Dashboard/components/Dashboardlayout";
import GraphLoading from "@/features/Dashboard/MainGraph/components/Loading/GraphLoading";
//custom hook
import useGraph from "@/features/Dashboard/MainGraph/hooks/useGraph";

export default function Dashboard() {
  const [openCard, setOpenCard] = useRecoilState(DashBoardCardAtom);
  const [uploading, setUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showImgModal, setShowImgModal] = useRecoilState(ImgModalAtom);

  const graphData = useGraph();

  return (
    <>
      {graphData ? (
        uploading ? (
          <UploadLoading />
        ) : (
          <DashboardLayout {...(<MainGraph data={graphData} />)}>
            <MainGraph data={graphData} />
          </DashboardLayout>
        )
      ) : (
        <GraphLoading />
      )}
    </>
  );
}
