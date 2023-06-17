import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
// Component
import NavBar from "../features/Dashboard/components/NavBar";
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
            },
          }
        );
        setFindData(response.data);
      } catch (error) {
        console.error(error); // Handle any errors that occurred during the request
      }
    };

    if (keywords) {
      fetchData();
    }
  }, [keywords]);

  //   console.log(data.results.length);
  const totalResults = findData?.results?.length ?? 0;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const testData = {
    hasNext: currentPage < totalPages + 1,
    results: findData?.results.slice(
      (currentPage - 1) * resultsPerPage,
      currentPage * resultsPerPage
    ),
  };

  // Function to handle pagination
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div>
      <NavBar />
      <Wrapper className="items-start">
        <p className="w-full p-4 border-b border-black dark:border-white text-3xl my-4">
          `&apos;{keywords}&apos;`의 검색 결과입니다
        </p>
        <div className="w-full flex flex-col mt-4 px-2">
          <div className="flex flex-row justify-between items-center mb-4">
            <p className="text-2xl font-bold px-2">내용</p>
            <p onClick={goBack} className="text-xl text-gray-500">
              이전
            </p>
          </div>
          <SearchResult data={testData.results} />
          {testData.hasNext && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-black hover:bg-gray-300 text-white font-bold py-2 px-4 rounded mr-2"
              >
                이전
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-black hover:bg-gray-300 text-white font-bold py-2 px-4 rounded"
              >
                다음
              </button>
            </div>
          )}
        </div>
      </Wrapper>
    </div>
  );
}
