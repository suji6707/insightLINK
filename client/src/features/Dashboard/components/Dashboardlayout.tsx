import React, { ReactNode } from "react";
// recoil
import { useRecoilValue } from "recoil";
import { DashBoardCardAtom, ImgModalAtom } from "@/recoil/atoms/MainGraphAtom";
// Component
import NavBar from "@/features/Dashboard/components/NavBar";
import UserPanel from "@/features/Dashboard/UserPanal/UserPanel";
import CardPanel from "@/features/Dashboard/MainCard/components/CardPanel";
import ImageUpload from "@/features/ImageUpload/ImageUpload";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const openCard = useRecoilValue(DashBoardCardAtom);
  const showImgModal = useRecoilValue(ImgModalAtom);

  return (
    <>
      <div className="h-screen max-w-[75rem] mx-auto">
        <NavBar />
        <div className="max-w-[75rem] flex flex-col items-center justify-between m-auto">
          <UserPanel />
          <div className="flex flex-row justify-between w-full">
            {children}
            {openCard ? <CardPanel /> : <></>}
          </div>
        </div>
        {showImgModal && <ImageUpload />}
      </div>
    </>
  );
}
