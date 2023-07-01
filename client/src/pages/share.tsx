import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";

import axios from "axios";

import { Main_graph_Api_DTO } from "@/types/dashborad.types";

import MainGraph from "@/features/Dashboard/MainGraph/components/MainGraph/MainGraph";
import Graph from "@/features/Dashboard/MainGraph/components/Graph/Graph";

export default function Share() {

    const [data, setData] = useState<Main_graph_Api_DTO | undefined>(undefined);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const userId = router.query.userId;
            const response = await axios.get("api/share", {
              params: {
                userId,
              }
            });
            console.log("response : ", response.data);
            setData(response.data);
          } catch (error) {
            console.error("API error:", error);
          }
        };
    
        if (router.query.userId) {
          fetchData();
        }
      }, [router.query.userId]);

    return(
        <>
         {/* <MainGraph data={data} /> */}
         {/* <Graph data={data} /> */}
        </>
    );
}