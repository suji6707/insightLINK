import React from "react";
// recoil
import { useRecoilValue } from "recoil";
import { DashBoardCardAtom, EditModeAtom } from "@/recoil/atoms/MainGraphAtom";
//componenets
import Graph from "@/features/Dashboard/MainGraph/components/Graph/Graph";
// types
import { Main_graph_Api_DTO } from "@types/dashboard.types";

function MainGraph({ data }: Main_graph_Api_DTO) {
  const openCard = useRecoilValue(DashBoardCardAtom);
  const editMode = useRecoilValue(EditModeAtom);

  return (
    <div  className={openCard ? "w-[42rem]" : "w-full"} > 
      <Graph data={data} editMode={editMode}/>
    </div>
  );
}

export default MainGraph;
