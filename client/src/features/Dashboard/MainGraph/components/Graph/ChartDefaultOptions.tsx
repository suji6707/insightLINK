import { Main_graph_Api_DTO } from "@/types/dashborad.types";
import setCategories from "./setCategories";

const ChartDefaultOptions = (graph: Main_graph_Api_DTO) => {
  return {
    tooltip: {},
    // legend: [
    //   {
    //     data: setCategories(graph?.cnt).map(function (a) {
    //       return a.name;
    //     }),
    //   },
    // ],
    animation: true,
    animationDuration: 1500,
    animationEasingUpdate: "quinticInOut",
    series: [
      {
        type: "graph",
        layout: "force",
        data: graph?.nodes,
        links: graph?.links,
        categories: setCategories(graph?.cnt),
        roam: true,
        draggable: true,
        label: {
          show: true, // 노드 이름 항상 표시
          position: "top", // 레이블을 위로 정렬
          formatter: "{b}",
        },
        labelLayout: {
          hideOverlap: true,
        },
        scaleLimit: {
          min: 1,
          max: 5,
        },
        lineStyle: {
          width: 2, // edge의 두께
          color: "source",
          curveness: 0, // edge의 곡률, 0은 직선
        },
        emphasis: {
          focus: "adjacency",
          lineStyle: {
            width: 5,
          },
        },
        force: {
          repulsion: 350, // 노드 간 반발력 조정
          gravity: 0.5, // 중력
          edgeLength: [20, 90], // 노드 간 거리 [minlength, maxlength]
        },
      },
    ],
  };
};

export default ChartDefaultOptions;
