import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Main_graph_Api, Main_graph_Api_DTO } from "@/axios/dashBoardApi";


type MainGraphProps = {
  data: Main_graph_Api_DTO; 
  openCard: boolean;
  setOpenCard: (value: boolean) => void;
};

export default function Main_graph({ data: graph, openCard, setOpenCard }: MainGraphProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts>(null);
  const [lastClickedNode, setLastClickedNode] = useState<string>('');

  const handleNodeClick = (nodeId: string) => {
    console.log("debug nodeId", nodeId);
    console.log("debug lastClickedNode", lastClickedNode);

    const isLastClickedNode = lastClickedNode === nodeId

    setOpenCard(isLastClickedNode ? !openCard : true) // 삼항으로 짰는데, 논리 연산자 쓰면 축약 가능
    setLastClickedNode(nodeId);
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

      myChart.showLoading();
      myChart.hideLoading();

      graph.nodes.forEach((node: any) => {
        node.label = {
          show: node.symbolSize > 30,
        };
      });

      const option = {
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
                width: 10,
              },
            },
            force: {
              repulsion: 100, // 노드 간 반발력
              gravity: 0.1, // 중력
              edgeLength: [50, 200], // 노드 간 거리
            },
          },
        ],
      };

      myChart.setOption(option);

      myChart.on("click", function (params) {
        if (params.dataType === "node") {
          handleNodeClick(params.data.id);
        }
      });
    }
  }, [graph]);


  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.resize();
    }
  }, [openCard]);

  return (
    <div
      className={openCard ? "w-2/3 h-screen flex" : "w-full h-screen flex"}
      ref={chartRef}
    ></div>
  );
}
