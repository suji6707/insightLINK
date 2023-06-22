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
          "http://localhost:8800/dashboard/contents/all",
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
        <div className="w-full flex flex-col mt-4 px-2">
          <div className="flex flex-row justify-between items-center mb-4">
            <p className="text-2xl font-bold px-2">내용</p>
            <p onClick={goBack} className="text-xl text-gray-500">
              이전
            </p>
          </div>
          <SearchResult data={findData} keyword={Array.isArray(keywords) ? keywords.join(', ') : keywords || ""} />
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 rounded bg-gray-200 text-gray-700"
          >
            이전 페이지
          </button>
          <button
            onClick={goToNextPage}
            disabled={!hasNextPage}
            className="px-4 py-2 mx-2 rounded bg-gray-200 text-gray-700"
          >
            다음 페이지
          </button>
        </div>
      </Wrapper>
    </div>
  );
}
