import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { DashBoardCardAtom } from "@/recoil/atoms/MainGraphAtom";
// Component
import NavBar from "@/features/Dashboard/components/NavBar";
import UserPanel from "@/features/Dashboard/components/UserPanel";
import MainGraph from "@/features/MainGraph/components/MainGraph/MainGraph";
import CardPanel from "@/features/MainCard/components/CardPanel";
import ImageUpload from "@/features/ImageUpload/ImageUpload";
import { Wrapper } from "@/styles/wrapper";
import Loading from "@/features/MainGraph/components/Loading/Loading";
import useGraph from "@/features/MainGraph/hooks/useGraph";

export default function Dashboard() {
  const router = useRouter();
  const { userid } = router.query;

  const [openCard, setOpenCard] = useRecoilState(DashBoardCardAtom);
  const [showImgModal, setShowImgModal] = useState(false);

  console.log("대시보드 아이디:" , userid)
  
  const graphData = useGraph(userid as string);
  
  return (
    <>
      {graphData ? (
        <>
          <NavBar />
          <Wrapper className="w-full px-10">
            <div className="flex flex-col justify-between w-full">
              <UserPanel
                showImgModal={showImgModal}
                setShowImgModal={setShowImgModal}
              />
              <div className="flex flex-row justify-between w-full">
                <MainGraph data={graphData} />
                {openCard ? <CardPanel /> : <></>}
              </div>
            </div>
            {showImgModal && (
              <ImageUpload
                showImgModal={showImgModal}
                setShowImgModal={setShowImgModal}
              />
            )}
          </Wrapper>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}