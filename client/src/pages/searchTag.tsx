import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
// Component
import NavBar from "@/features/Dashboard/components/NavBar";
import { Wrapper } from "@/styles/wrapper";
import SearchResult from "@/features/Search/ContentSearch";

interface ResponseData {
  hasNext: boolean;
  results: {
    cardTags: string[];
    cardKeyword: string;
    cardContent: string;
  }[];
}

export default function Search() {
  const router = useRouter();
  const keywords = router.query.search;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const resultsPerPage = 2; // Number of results to show per page

  const [findData, setFindData] = useState<ResponseData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/dashboard/tags/all",
          {
            params: {
              search: keywords,
              page: currentPage,
              perPage: resultsPerPage,
            },
          }
        );
        setFindData(response.data.results);
        setTotalPages(response.data.totalPages);
        setHasNextPage(response.data.hasNextPage);
        console.log(response.data);
      } catch (error) {
        console.error(error); // Handle any errors that occurred during the request
      }
    };

    if (keywords) {
      fetchData();
    }
  }, [keywords, currentPage]); // Include currentPage in the dependency array

  const goBack = () => {
    router.back();
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <NavBar />
      <Wrapper className="items-start">
        <p className="w-full p-4 border-b border-black dark:border-white text-3xl my-4">
          &apos;{keywords}&apos; 의 검색 결과입니다
        </p>
        <div className="flex flex-col w-full px-2 mt-4">
          <div className="flex flex-row items-center justify-between mb-4">
            <p className="px-2 text-2xl font-bold">태그</p>
            <p onClick={goBack} className="text-xl text-gray-500">
              이전
            </p>
          </div>
          <SearchResult
            data={findData}
            keyword={
              Array.isArray(keywords) ? keywords.join(", ") : keywords || ""
            }
          />
        </div>
        <div className="flex items-center justify-center mt-4">
          {currentPage > 1 && (
            <button
              onClick={goToPreviousPage}
              className="px-4 py-2 mx-2 text-gray-700 bg-gray-200 rounded"
            >
              이전 페이지
            </button>
          )}
          {hasNextPage &&(
            <button
            onClick={goToNextPage}
            disabled={!hasNextPage}
            className="px-4 py-2 mx-2 text-gray-700 bg-gray-200 rounded"
          >
            다음 페이지
          </button>)}
        </div>
      </Wrapper>
    </div>
  );
}
