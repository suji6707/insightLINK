import React from "react";
//componenets
import Graph from "@/features/MainGraph/components/Graph/Graph";
//custom hook
import useResizeGraph from "@/features/MainGraph/hooks/useResizeGraph";

function MainGraph({ data }: any) {
  useResizeGraph();
  if (data) {
    return <Graph data={data} />;
  }

  return null;
}

export default MainGraph;
