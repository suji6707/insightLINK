import React, { useEffect } from "react";
// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import {
  DashBoardCardAtom,
  ChartInstanceAtom,
} from "@/recoil/atoms/MainGraphAtom";
// library
import * as echarts from "echarts";

function useResizeGraph() {
  const openCard = useRecoilValue(DashBoardCardAtom);
  const chartInstance = useRecoilValue(ChartInstanceAtom);

  useEffect(() => {
    console.log("useEffect openCard state: " + openCard);
    if (chartInstance && chartInstance.current) {
      chartInstance.current.resize();
    }
  }, [chartInstance, openCard]);

  return;
}

export default useResizeGraph;
