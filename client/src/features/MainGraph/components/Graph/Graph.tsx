import React, { useEffect, useRef, useState, useCallback } from "react";
// recoil
import { useRecoilState } from "recoil";
import { DashBoardCardAtom, NodeIdAtom } from "@/recoil/atoms/MainGraphAtom";
// library
import * as echarts from "echarts";
// type
import { Main_graph_Api_DTO } from "@/axios/dashBoardApi";
import combineNodes from "../Interaction/CombineNode";
import { POST } from "@/axios/POST";

type MainGraphProps = {
  data: Main_graph_Api_DTO;
};

function Graph({ data: graph }: MainGraphProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [lastClickedNode, setLastClickedNode] = useState<string>("");
  const [openCard, setOpenCard] = useRecoilState(DashBoardCardAtom);
  const [nodeId, setNodeId] = useRecoilState(NodeIdAtom);
  const pressTimer = useRef<any>(null);
  let longPressNode: string | null = null;

  const [options, setOptions] = useState<echarts.EChartsOption>({
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
          position: "inside", // 레이블을 위로 정렬
          fontSize: 12,
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
      setNodeId((currNodeId) => (currNodeId === null ? nodeId : null));
      const isLastClickedNode = lastClickedNode === nodeId;
      setOpenCard(isLastClickedNode ? !openCard : true);
      setLastClickedNode(nodeId);
    },
    [lastClickedNode, openCard, setNodeId]
  );

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption(options);

      const clickHandler = function (params: any) {
        if (params.dataType === "node") {
          console.log("node clicked");
          handleNodeClick(params.data.id as string);
        }
      };

      chart.on("click", clickHandler);

      // 마우스 오래 클릭시 combineNodes
      chart.getZr().on("mousedown", (params: any) => {
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
            const nodesOption = (chart.getOption() as any).series[0]
              .data as any[];
            const nodeId = nodesOption[dataIndex].id;
            const currentNode = nodesOption.find((node) => node.id === nodeId);

            if (longPressNode) {
              // 이전에 길게 누른 노드 객체 가져오기
              const prevNode = nodesOption.find(
                (node) => node.id === longPressNode
              );
              console.log({
                chart,
                nodes: nodesOption,
                links: (chart.getOption() as any).series[0].links as any[],
                node1: prevNode!,
                node2: currentNode!,
              });
              let success = 0;

              // 두 노드를 결합하는 함수 호출
              success = combineNodes({
                chart,
                nodes: nodesOption,
                links: (chart.getOption() as any).series[0].links as any[],
                node1: prevNode!,
                node2: currentNode!,
              });

              const POSTMerge = async () => {
                const token = localStorage.getItem("token");
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
              chart.setOption({ series: [{ data: nodesOption }] });
            }
          }, 2000); // 2초 이상 길게 누르면 long press로 간주
        }
      });

      chart.getZr().on("mouseup", () => {
        if (pressTimer.current !== null) {
          clearTimeout(pressTimer.current);
          pressTimer.current = null;
        }
      });

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
