import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Main_graph_Api } from "@/axios/dashBoardApi";

type MainGraphProps = {
  openCard: boolean;
  setOpenCard: (value: boolean) => void;
};

export default function Main_graph({ openCard, setOpenCard }: MainGraphProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [graph, setGraph] = useState<any>();

  const handleNodeClick = () => {
    console.log(openCard);
    setOpenCard(!openCard);
    console.log(openCard);
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
      let myChart = echarts.init(chartRef.current);

      myChart.showLoading();

      myChart.hideLoading();

      graph.nodes.forEach((node: any) => {
        node.label = {
          show: node.symbolSize > 30,
        };
      });

      const option: any = {
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
          handleNodeClick();
        }
        if (openCard) {
          myChart.resize();
        } else {
          myChart.resize();
        }
      });

      // window.addEventListener("resize", function () {
      //   myChart.resize();
      // });
    }
  }, [graph]);

  return (
    <div
      className={openCard ? "w-1/2 h-screen flex" : "w-full h-screen flex"}
      ref={chartRef}
    ></div>
  );
}
