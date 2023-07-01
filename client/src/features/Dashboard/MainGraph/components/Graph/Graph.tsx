import React, { useEffect, useRef, useState, useCallback } from "react";
// recoil
import { useRecoilState } from "recoil";
import { DashBoardCardAtom, NodeNameAtom } from "@/recoil/atoms/MainGraphAtom";
// library
import * as echarts from "echarts";
// type
import { Main_graph_Api_DTO, GraphNode } from "@/types/dashborad.types";

import handleNodeLongClick from "@/features/Dashboard/MainGraph/components/OnClickEvent/MouseDown";
import handleNodeUnclick from "@/features/Dashboard/MainGraph/components/OnClickEvent/MouseUp";

import ChartDefaultOptions from "@/features/Dashboard/MainGraph/components/Graph/ChartDefaultOptions";

type MainGraphProps = {
  data: Main_graph_Api_DTO;
  editMode: boolean;
};

function Graph({ data, editMode }: MainGraphProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [lastClickedNode, setLastClickedNode] = useState<string>("");
  const [openCard, setOpenCard] = useRecoilState(DashBoardCardAtom);
  const [nodeName, setNodeName] = useRecoilState(NodeNameAtom);
  const pressTimer = useRef<any>(null);
  const longPressNode = useRef<string | null>(null);
  // const [options, setOptions] = useState<any>(ChartDefaultOptions(data));

  const handleNodeClick = useCallback(
    (nodeName: string) => {
      if (!editMode) {
        // 이전에 클릭된 노드인지 확인
        const isLastClickedNode = lastClickedNode === nodeName;
        setLastClickedNode(nodeName);
        // 클릭된 노드 상태 업데이트
        if (isLastClickedNode) {
          setOpenCard(!openCard);
        } else {
          setOpenCard(true);
          setNodeName(nodeName);
        }
      }
    },
    [editMode, lastClickedNode, openCard]
  );
  

  useEffect(() => {
    if (chartRef.current && data) {
      const chart = echarts.init(chartRef.current);

      data.nodes.forEach((node: any) => {
        node.label = {
          show: node.symbolSize >= 10,
          fontSize: node.symbolSize >= 10 ? 17 : 15,
          // color: (params: any) => params.data.itemStyle.color,
        };
      });
      // console.log('options: ', options)
      
      chart.setOption(ChartDefaultOptions(data) as any);

      // 마우스 오래 클릭시 태그 병합
      const handleMouseDown = (params: any) => {
        if (editMode) {
          handleNodeLongClick(params, chart, longPressNode, pressTimer);
        }
      };
      chart.getZr().on("mousedown", handleMouseDown);

      const clickHandler = function (params: any) {
        if (params.dataType === "node" && !pressTimer.current) {
          handleNodeClick(params.name as string);
        }
      };
      chart.on("click", clickHandler);

      // Cleanup function
      return () => {
        chart.off("click", clickHandler);
        chart.getZr().off("mousedown", handleMouseDown);
      };
    }
  }, [editMode, handleNodeClick, data, chartRef]);

  // Add a new useEffect for resizing
  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.getInstanceByDom(chartRef.current);
      if (chart) {
        chart.resize();
      }
    }
  }, [nodeName, openCard]);

  return <div className="w-full h-[65vh]" ref={chartRef}></div>;
}

export default Graph;
