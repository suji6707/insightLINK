import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import axios from "axios";

const Main_graph = () => {
  const chartRef = useRef();

  useEffect(() => {
    if (chartRef.current) {
      var myChart = echarts.init(chartRef.current);
      myChart.showLoading();

      axios
        .get("http://localhost:4000/graph")
        .then((response) => {
          const graph = response.data;

          myChart.hideLoading();

          graph.nodes.forEach((node) => {
            node.label = {
              show: node.symbolSize > 30,
            };
          });

          const option = {
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
                roam: true,
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
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, []);

  return <div className="main_graph"  ref={chartRef} style={{ width: "100%", height: "100vh" }}></div>;
};

export default Main_graph;
