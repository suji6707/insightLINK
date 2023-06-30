import React from "react";
// recoil
import { useRecoilState } from "recoil";
import { EditModeAtom } from "@/recoil/atoms/MainGraphAtom";

export default function GraphEditBtn() {
  const [editMode, setEditMode] = useRecoilState(EditModeAtom);

  return (
    <>
      {editMode ? (
        <button
          onClick={() => setEditMode(false)}
          className="follow-btn  cursor-pointer"
        >
          수정 완료
        </button>
      ) : (
        <button
          onClick={() => setEditMode(true)}
          className="follow-btn cursor-pointer"
        >
          그래프 수정
        </button>
      )}
    </>
  );
}
