import React from "react";
// recoil
import { useRecoilState } from "recoil";
import { EditModeAtom } from "@/recoil/atoms/MainGraphAtom";

export default function GraphEditBtn() {
  const [editMode, setEditMode] = useRecoilState(EditModeAtom);

  return (
    <>
      {editMode ? (
        <p onClick={() => setEditMode(false)}>수정 완료</p>
      ) : (
        <p onClick={() => setEditMode(true)}>그래프 수정</p>
      )}
    </>
  );
}
