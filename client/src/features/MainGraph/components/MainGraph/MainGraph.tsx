import React from "react";
//componenets
import Graph from "@/features/MainGraph/components/Graph/Graph";
//custom hook
import useGraph from "@/features/MainGraph/hooks/useGraph";
import useResizeGraph from "@/features/MainGraph/hooks/useResizeGraph";

function MainGraph() {
  const [data] = useGraph();
  useResizeGraph();
  if (data) {
    return <Graph data={data} />;
  }

  return null;
}

export default MainGraph;
