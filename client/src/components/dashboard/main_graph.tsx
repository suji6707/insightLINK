import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import axios from "axios";
import { Main_graph_Api } from "@/axios/dashBoardApi";

const Main_graph = () => {
  const chartRef = useRef();
  const [graphData, setGraphData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (chartRef.current) {
        let myChart = echarts.init(chartRef.current);
        myChart.showLoading();

        const graph: any = await Main_graph_Api();
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
    };

    fetchData();
  }, []);

  return <div className="w-full h-screen" ref={chartRef}></div>;
};

export default Main_graph;
