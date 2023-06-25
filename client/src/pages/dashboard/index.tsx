import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { DashBoardCardAtom } from "@/recoil/atoms/MainGraphAtom";
// Component
import NavBar from "@/features/Dashboard/components/NavBar";
import UserPanel from "@/features/Dashboard/components/UserPanel";
import MainGraph from "@/features/MainGraph/components/MainGraph/MainGraph";
import CardPanel from "@/features/MainCard/components/CardPanel";
import ImageUpload from "@/features/ImageUpload/ImageUpload";
import { Wrapper } from "@/styles/wrapper";
import useGraph from "@/features/MainGraph/hooks/useGraph";
import GraphLoading from "@/features/MainGraph/components/Loading/GraphLoading";
import UploadLoading from "@/features/MainGraph/components/Loading/UploadLoading";

export default function Dashboard() {
  const [openCard, setOpenCard] = useRecoilState(DashBoardCardAtom);
  const [showImgModal, setShowImgModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const graphData = useGraph();

  return (
    <>
      {graphData ? (
        uploading ? (
          <UploadLoading />
        ) : (
          <>
            <NavBar />
            <Wrapper className="w-full px-10">
              <div className="flex flex-col justify-between w-full">
                <UserPanel
                  showImgModal={showImgModal}
                  setShowImgModal={setShowImgModal}
                  editMode={editMode}
                  setEditMode={setEditMode}
                />
                <div className="flex flex-row justify-between w-full">
                  <MainGraph data={graphData} editMode={editMode} />
                  {openCard ? <CardPanel /> : <></>}
                </div>
              </div>
              {showImgModal && (
                <ImageUpload
                  setShowImgModal={setShowImgModal}
                  setUploading={setUploading}
                />
              )}
            </Wrapper>
          </>
        )
      ) : (
        <GraphLoading />
      )}
    </>
  );
}
