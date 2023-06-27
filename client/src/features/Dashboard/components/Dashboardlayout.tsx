import React from "react";
// recoil
import { useRecoilValue } from "recoil";
import {
  DashBoardCardAtom,
  ShowImgModalAtom,
} from "@/recoil/atoms/MainGraphAtom";
// Component
import NavBar from "@/features/Dashboard/components/NavBar";
import UserPanel from "@/features/Dashboard/UserPanal/UserPanel";
import CardPanel from "@/features/Dashboard/MainCard/components/CardPanel";
import ImageUpload from "@/features/ImageUpload/ImageUpload";
import { Wrapper } from "@/styles/wrapper";

export default function DashboardLayout({ children }: React.JSX.Element) {
  const openCard = useRecoilValue(DashBoardCardAtom);
  const showImgModal = useRecoilValue(ShowImgModalAtom);

  return (
    <>
      <main className="">
        <NavBar />
        <Wrapper>
          <div className="w-[75rem] flex flex-col items-center justify-between m-auto">
            <UserPanel />
            <div className="flex flex-row justify-between w-full">
              {children}
              {openCard ? <CardPanel /> : <></>}
            </div>
          </div>
          {showImgModal && <ImageUpload />}
        </Wrapper>
      </main>
    </>
  );
}
