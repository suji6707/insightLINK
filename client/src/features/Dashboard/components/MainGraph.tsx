import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Main_graph_Api } from "@/axios/dashBoardApi";

type MainGraphProps = {
  openCard: boolean;
  setOpenCard: (value: boolean) => void;
};

export default function Main_graph({ openCard, setOpenCard }: MainGraphProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [graph, setGraph] = useState<any>();
  const [lastClickedNode, setLastClickedNode] = useState<any>();


  const handleNodeClick = (nodeId: string) => {
    console.log("debug nodeId", nodeId);
    console.log("debug lastClickedNode", lastClickedNode);
    if (lastClickedNode === nodeId) {
      setOpenCard(!openCard);
    } else {
      setOpenCard(true);
    }
    setLastClickedNode(nodeId);
  };

  useEffect(() => {
    const getGraphData = async () => {
      const graphData: any = await Main_graph_Api();
      setGraph(graphData);
    };
    getGraphData();
  }, []);

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

      const option: any = {
        tooltip: false,
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
          // console.log(params);
          // console.log(params.dataType);
          // console.log(params.data);
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
