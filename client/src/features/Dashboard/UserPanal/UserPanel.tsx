import React from "react";
// recoil
import { useRecoilState, useSetRecoilState } from "recoil";
import { ShowImgModalAtom, EditModeAtom } from "@/recoil/atoms/MainGraphAtom";

import UserInfo from "@/features/Dashboard/UserPanal/components/UserInfo";
import SearchBar from "@/features/Dashboard/components/SearchBar";
// Assets
import { BsCamera } from "react-icons/bs";

export default function UserPanel() {
  const setShowImgModal = useSetRecoilState(ShowImgModalAtom);
  const [editMode, setEditMode] = useRecoilState(EditModeAtom);

  return (
    <>
      <div className="flex justify-between w-full">
        <UserInfo />
        <div className="flex">
          {editMode ? (
            <p onClick={() => setEditMode(false)}>수정 완료</p>
          ) : (
            <p onClick={() => setEditMode(true)}>그래프 수정</p>
          )}
          <SearchBar />
        </div>
      </div>
    </>
  );
}
