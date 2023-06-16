import React, { useEffect, useRef, useState } from "react";
// recoil
import { useRecoilState } from "recoil";
import { DashBoardCardAtom } from "@/recoil/atoms/MainGraphAtom";
// library
import ECharts, { EChartsReactProps } from 'echarts-for-react';

import { Main_graph_Api_DTO } from "@/axios/dashBoardApi";

type MainGraphProps = {
  data: Main_graph_Api_DTO;
};

function Graph({ data: graph }: MainGraphProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts>(null);
  const [lastClickedNode, setLastClickedNode] = useState<string>("");

  const [openCard, setOpenCard] = useRecoilState(DashBoardCardAtom);

  const [options, setOptions] = useState({
    tooltip: {},
    animationDuration: 1500,
    animationEasingUpdate: "quinticInOut",
    series: [
      {
        type: "graph",
        layout: "force",
        data: graph.nodes,
        links: graph.links,
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

  const handleNodeClick = (nodeId: string) => {
    console.log("debug nodeId", nodeId);
    console.log("debug lastClickedNode", lastClickedNode);

    const isLastClickedNode = lastClickedNode === nodeId;

    setOpenCard(isLastClickedNode ? !openCard : true); // 삼항으로 짰는데, 논리 연산자 쓰면 축약 가능
    setLastClickedNode(nodeId);
    chartInstance.current.resize();
  };

  useEffect(() => {
    if (chartRef.current && graph) {
      let myChart;
      if (chartInstance.current) {
        myChart = chartInstance.current; // 이미 생성된 인스턴스를 사용
      } else {
        myChart = echarts.init(chartRef.current);
        chartInstance.current = myChart; // 생성된 인스턴스를 저장
      }
      // myChart.showLoading();
      // myChart.hideLoading();
      graph.nodes.forEach((node: any) => {
        node.label = {
          show: node.symbolSize > 25,
        };
      });

      myChart.setOption(options);

      myChart.on("click", function (params) {
        if (params.dataType === "node") {
          console.log("before click: " + openCard);
          handleNodeClick();
          // setOpenCard(!openCard);
          console.log("after click: " + openCard);
        }
      });
    }
  }, [options, chartRef]);

  // useEffect(() => {
  //   console.log("useEffect openCard state: " + openCard);
  //   if (chartInstance.current) {
  //     chartInstance.current.resize();
  //   }
  // }, [openCard]);

  return (

    <ECharts
    option={options}
    opts={{ renderer: 'svg', width: 'auto', height: '100%' }}
    className={openCard ? "w-2/3 h-screen flex" : "w-full h-screen flex"}
  />
  );
}

