import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import axios from "axios";
import { Main_graph_Api } from "@/axios/dashBoardApi";

export default function Main_graph() {
  const chartRef = useRef();
  const [graph, setGraph] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const graphData: any = await Main_graph_Api();
      setGraph(graphData);
    };

    fetchData();
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
          text: "Les Miserables",
          subtext: "Default layout",
          top: "bottom",
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
            name: "Les Miserables",
            type: "graph",
            layout: "none",
            data: graph.nodes,
            links: graph.links,
            categories: graph.categories,
            roam: false,
            label: {
              position: "right",
              formatter: "{b}",
            },
            lineStyle: {
              color: "source",
              curveness: 0.3,
            },
            emphasis: {
              focus: "adjacency",
              lineStyle: {
                width: 10,
              },
            },
          },
        ],
      };

      myChart.setOption(option);
    }
  }, [graph]);

  return <div className="w-full h-screen" ref={chartRef}></div>;
}
