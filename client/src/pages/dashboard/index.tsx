import React from "react";
// recoil
import { useRecoilValue } from "recoil";
import { UploadingAtom } from "@/recoil/atoms/MainGraphAtom";
// Component
import MainGraph from "@/features/Dashboard/MainGraph/components/MainGraph/MainGraph";
import UploadLoading from "@/features/Dashboard/MainGraph/components/Loading/UploadLoading";
import DashboardLayout from "@/features/Dashboard/components/Dashboardlayout";
import GraphLoading from "@/features/Dashboard/MainGraph/components/Loading/GraphLoading";
//custom hook
import useGraph from "@/features/Dashboard/MainGraph/hooks/useGraph";

export default function Dashboard() {
  const uploading = useRecoilValue(UploadingAtom);

  const graphData = useGraph();

  return (
    <>
      {graphData ? (
        uploading ? (
          <UploadLoading />
        ) : (
          <DashboardLayout {...(<MainGraph data={graphData} />)}>
            <MainGraph data={graphData} />
          </DashboardLayout>
        )
      ) : (
        <GraphLoading />
      )}
    </>
  );
}
