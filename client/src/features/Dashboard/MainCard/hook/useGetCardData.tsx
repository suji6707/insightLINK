// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// // recoil
// import { useRecoilValue } from "recoil";
// import {
//   ClickedCardDetailAtom,
//   NodeNameAtom,
// } from "@/recoil/atoms/MainGraphAtom";
// // Api call
// import { Card_Detail_Api, Card_Info_Api } from "@/axios/dashBoardApi";
// // types
// import { CardData, CardDataDetail } from "@/types/dashborad.types";

// function useFetchData<T>(
//   fetchApi: (nodeName: string, userId: string | undefined) => Promise<T>,
//   dependency: string
// ): [T | undefined, boolean, any] {
//   const [data, setData] = useState<T | undefined>();
//   const [error, setError] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const userid = Array.isArray(router.query.userid)
//           ? router.query.userid[0]
//           : router.query.userid;

//         const fetchedData = await fetchApi(dependency, userid);
//         setData(fetchedData);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [router.isReady, ...dependency]);

//   return [data, loading, error];
// }

// // CardData와 CardDataDetail 타입을 사용하는 useCard와 useDetail 함수
// export function useCard(): [CardData[] | undefined, boolean, any] {
//   const nodeName = useRecoilValue(NodeNameAtom);
//   return useFetchData<CardData[]>(Card_Info_Api, [nodeName]);
// }

// export function useDetail(): [CardDataDetail | undefined, boolean, any] {
//   const cardId = useRecoilValue(ClickedCardDetailAtom);
//   return useFetchData<CardDataDetail>(Card_Detail_Api, [cardId]);
// }
