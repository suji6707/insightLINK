import React, { useState, useEffect } from "react";
// recoil
import { useRecoilValue } from "recoil";
import { EditModeAtom, ImgUpLoadAtom } from "@/recoil/atoms/MainGraphAtom";

import { useRouter } from "next/router";
import { Main_graph_Api } from "@/axios/dashBoardApi";
import { Main_graph_Api_DTO } from "@/types/dashborad.types";

function useGraph() {
  const editMode = useRecoilValue(EditModeAtom);
  const imgUpLoad = useRecoilValue(ImgUpLoadAtom);

  const [data, setData] = useState<Main_graph_Api_DTO | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return; // if query values are not ready, return

    const getGraphData = async () => {
      const userid = Array.isArray(router.query.userid)
        ? router.query.userid[0]
        : router.query.userid;
      const graphData = await Main_graph_Api(userid);
      setData(graphData);
    };
    getGraphData();
    console.log('useGraph: ', data);
  }, [router.isReady, router.query.userid, editMode, imgUpLoad]); // add dependencies
 
    if(data){
      return data
    } 
}

export default useGraph;
