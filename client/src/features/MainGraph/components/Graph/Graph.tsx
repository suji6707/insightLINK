import React, { useEffect, useRef, useState, useCallback } from "react";
// recoil
import { useRecoilState } from "recoil";
import {
  DashBoardCardAtom,
  ChartInstanceAtom,
  NodeIdAtom,
} from "@/recoil/atoms/MainGraphAtom";
// library
import * as echarts from "echarts";
// type
import { Main_graph_Api_DTO } from "@/axios/dashBoardApi";

type MainGraphProps = {
  data: Main_graph_Api_DTO;
};

function Graph({ data: graph }: MainGraphProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [lastClickedNode, setLastClickedNode] = useState<string>("");
  const [openCard, setOpenCard] = useRecoilState(DashBoardCardAtom);
  const [nodeId, setNodeId] = useRecoilState(NodeIdAtom);

  const [options, setOptions] = useState({
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
          position: "insight", // label의 위치
          fontSize: 12, // label의 폰트 크기
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
          repulsion: 100, // 노드 간 반발력
          gravity: 0.1, // 중력
          edgeLength: [250, 1000], // 노드 간 거리
        },
      },
    ],
  });

  const handleNodeClick = useCallback(
    (nodeId: string) => {
      setNodeId(nodeId);
      const isLastClickedNode = lastClickedNode === nodeId;
      setOpenCard(isLastClickedNode ? !openCard : true);
      setLastClickedNode(nodeId);
    },
    [lastClickedNode, openCard]
  );

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption(options);

      const clickHandler = function (params) {
        if (params.dataType === "node") {
          console.log("node clicked");
          handleNodeClick(params.data.id);
        }
      };
      chart.on("click", clickHandler);
      // Cleanup function
      return () => {
        chart.off("click", clickHandler);
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
