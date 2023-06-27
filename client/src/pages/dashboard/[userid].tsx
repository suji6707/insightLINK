import React from "react";
// Component
import MainGraph from "@/features/Dashboard/MainGraph/components/MainGraph/MainGraph";
import DashboardLayout from "@/features/Dashboard/components/Dashboardlayout";
import Loading from "@/features/Dashboard/MainGraph/components/Loading/GraphLoading";
//custom hook
import useGraph from "@/features/Dashboard/MainGraph/hooks/useGraph";

export default function Dashboard() {
  const graphData = useGraph();

  return (
    <>
      {graphData ? (
        <DashboardLayout {...(<MainGraph data={graphData} />)}>
          <MainGraph data={graphData} />
        </DashboardLayout>
      ) : (
        <Loading />
      )}
    </>
  );
}
