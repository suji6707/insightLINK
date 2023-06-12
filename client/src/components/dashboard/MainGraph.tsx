import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Main_graph_Api } from "@/axios/dashBoardApi";

export default function Main_graph() {
  const chartRef = useRef();
  const [graph, setGraph] = useState<any>();

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

      graph.nodes.forEach((node) => {
        node.label = {
          show: node.symbolSize > 30,
        };
      });

      const option: any = {
        title: {
          text: "ㅇㅇ의 인사이트",
          subtext: "2023.06.12(현재 날짜)",
          top: "top",
          left: "right",
        },
        tooltip: {},
        legend: [
          {
            data: graph.categories.map((a) => a.name),
          },
        ],
        animationDuration: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "force",
            data: graph.nodes,
            links: graph.links,
            categories: graph.categories,
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
    }
  }, [graph]);

  return <div className="w-full h-screen" ref={chartRef}></div>;
}
