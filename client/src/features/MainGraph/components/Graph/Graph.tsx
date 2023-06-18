import React, { useEffect, useRef, useState, useCallback } from "react";
// recoil
import { useRecoilState } from "recoil";
import { DashBoardCardAtom, NodeIdAtom } from "@/recoil/atoms/MainGraphAtom";
// library
import * as echarts from "echarts";
// type
import { Main_graph_Api_DTO } from "@/axios/dashBoardApi";

import handleNodeUnclick from "../OnClickEvent/MouseUp";
import handleNodeLongClick from "../OnClickEvent/MouseDown";

type MainGraphProps = {
  data: Main_graph_Api_DTO;
};

function Graph({ data: graph }: MainGraphProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [lastClickedNode, setLastClickedNode] = useState<string>("");
  const [openCard, setOpenCard] = useRecoilState(DashBoardCardAtom);
  const [nodeId, setNodeId] = useRecoilState(NodeIdAtom);
  const pressTimer = useRef<any>(null);
  const longPressNode = useRef<string | null>(null);

  const [options, setOptions] = useState<echarts.EChartsOption>({
    title: {
      text: "ㅇㅇ의 인사이트",
      subtext: "여기 정보가 나오는 건 어때?",
      top: "top",
      left: "left",
    },
    tooltip: {},
    animationDuration: 1500,
    animationEasingUpdate: "quinticInOut",
    series: [
      {
        type: "graph",
        layout: "force",
        data: graph?.nodes,
        links: graph?.links,
        roam: false,
        label: {
          show: true, // 노드 이름 항상 표시
          position: "inside", // 레이블을 위로 정렬
          fontSize: 12,
          formatter: "{b}",
        },
        lineStyle: {
          width: 2, // edge의 두께
          color: "source",
          curveness: 0.1, // edge의 곡률, 0은 직선
        },
        emphasis: {
          focus: "adjacency",
          lineStyle: {
            width: 5,
          },
        },
        force: {
          repulsion: 100, // 노드 간 반발력 조정
          gravity: 0.1, // 중력
          edgeLength: [100, 500], // 노드 간 거리
          initLayout: "none",
        },
      },
    ],
  });

  const handleNodeClick = useCallback(
    (nodeId: string) => {
      setNodeId((currNodeId) => (currNodeId === null ? nodeId : null));
      const isLastClickedNode = lastClickedNode === nodeId;
      setOpenCard(isLastClickedNode ? !openCard : true);
      setLastClickedNode(nodeId);
    },
    [lastClickedNode, openCard, setNodeId]
  );

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption(options);

      const clickHandler = function (params: any) {
        if (params.dataType === "node") {
          console.log("node clicked");
          handleNodeClick(params.data.id as string);
        }
      };

      chart.on("click", clickHandler);

      // 마우스 오래 클릭시 태그 병합
      const handleMouseDown = (params: any) =>
        handleNodeLongClick(params, chart, longPressNode, pressTimer);

      chart.getZr().on("mousedown", handleMouseDown);
      chart.getZr().on("mouseup", handleNodeUnclick(pressTimer));

      // Cleanup function
      return () => {
        chart.off("click", clickHandler);
        chart.getZr().off("mousedown", handleMouseDown);
      };
    }
  }, [options, handleNodeClick]);

  // Add a new useEffect for resizing
  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.getInstanceByDom(chartRef.current);
      if (chart) {
        chart.resize();
      }
    }
  }, [nodeId, openCard]);

  return (
    <div
      className={openCard ? "w-2/3 h-screen flex" : "w-full h-screen flex"}
      ref={chartRef}
    ></div>
  );
}

export default Graph;
