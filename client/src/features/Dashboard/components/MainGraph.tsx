import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Main_graph_Api } from "@/axios/dashBoardApi";
import { POST } from "@/axios/POST";
import combineNodes from "@/features/MainGraph/components/Interaction/CombineNode";

type MainGraphProps = {
  openCard: boolean;
  setOpenCard: (value: boolean) => void;
};

export default function Main_graph({ openCard, setOpenCard }: MainGraphProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [graph, setGraph] = useState<any>();
  const [lastClickedNode, setLastClickedNode] = useState<any>();
  const pressTimer = useRef<any>(null);
  let longPressNode: string | null = null;

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
      let myChart: any;
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
              edgeLength: [125, 300], // 노드 간 거리
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

      // 마우스 오래 클릭시 combineNodes
      myChart.getZr().on("mousedown", (params: any) => {
        console.log("mouse!!");
        console.log(params.target);

        const ecInnerKey = Object.keys(params.target).find((key) =>
          key.startsWith("__ec_inner_")
        );

        if (ecInnerKey && params.target[ecInnerKey].dataType === "node") {
          const dataIndex = params.target[ecInnerKey].dataIndex;

          pressTimer.current = setTimeout(() => {
            console.log("selected");

            // 노드의 옵션 가져오기
            const nodesOption = myChart.getOption().series[0].data as any[]; // 적절한 타입으로 변경하세요.
            const nodeId = nodesOption[dataIndex].id;
            const currentNode = nodesOption.find((node) => node.id === nodeId);

            if (longPressNode) {
              // 이전에 길게 누른 노드 객체 가져오기
              const prevNode = nodesOption.find(
                (node) => node.id === longPressNode
              );
              console.log({
                myChart,
                nodes: nodesOption,
                links: myChart.getOption().series[0].links as any[], // 적절한 타입으로 변경하세요.
                node1: prevNode!,
                node2: currentNode!,
              });
              let success = 0;

              // 두 노드를 결합하는 함수 호출
              success = combineNodes({
                myChart,
                nodes: nodesOption,
                links: myChart.getOption().series[0].links as any[], // 적절한 타입으로 변경하세요.
                node1: prevNode!,
                node2: currentNode!,
              });

              const POSTMerge = async () => {
                const token = localStorage.getItem("token")
console.log(                  { tagId1: prevNode.id, tagId2: currentNode.id },
  )
                const result = await POST(
                  "tag/merge",
                  { tagId1: prevNode.id, tagId2: currentNode.id },
                  {
                    headers: {
                      authorization: `Bearer ${token}`,
                    },
                  }
                );
                console.log(result);
              };

              if (success) {
                POSTMerge();
              }

              longPressNode = null; // longPressNode 초기화
            } else {
              longPressNode = nodeId; // 길게 클릭한 노드 저장

              // 노드의 stroke 색상 변경 (노드를 노란색으로 바꾸기)
              currentNode!.itemStyle = {
                borderColor: "yellow",
                borderWidth: 3,
              };
              myChart.setOption({ series: [{ data: nodesOption }] });
            }
          }, 2000); // 2초 이상 길게 누르면 long press로 간주
        }
      });

      myChart.getZr().on("mouseup", () => {
        if (pressTimer.current !== null) {
          clearTimeout(pressTimer.current);
          pressTimer.current = null;
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
