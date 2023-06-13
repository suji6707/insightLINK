import React, { useState } from "react";
// Component
import NavBar from "../components/NavBar";
import { Wrapper } from "@/styles/wrapper";
import SearchResult from "@/components/searchResult/ContentSearch";
import { useRouter } from 'next/router';

export default function Search() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 3; // Number of results to show per page
  
  const data = {
    hasNext: true,
    results: [
      {
        cardTags: ["태그 명", "태그 명"],
        cardKeyword: "키워드 명 1",
        cardContent: "내용",
      },
      {
        cardTags: ["태그 명", "태그 명"],
        cardKeyword: "키워드 명 2",
        cardContent: "내용",
      },
      {
        cardTags: ["태그 명", "태그 명"],
        cardKeyword: "키워드 명 3",
        cardContent: "내용",
      },
      {
        cardTags: ["태그 명", "태그 명"],
        cardKeyword: "키워드 명 4",
        cardContent: "내용",
      },
      {
        cardTags: ["태그 명", "태그 명"],
        cardKeyword: "키워드 명 5",
        cardContent: "내용",
      },
      {
        cardTags: ["태그 명", "태그 명"],
        cardKeyword: "키워드 명 6",
        cardContent: "내용",
      },
      {
        cardTags: ["태그 명", "태그 명"],
        cardKeyword: "키워드 명 7",
        cardContent: "내용",
      },
      {
        cardTags: ["태그 명", "태그 명"],
        cardKeyword: "키워드 명 8",
        cardContent: "내용",
      },
      {
        cardTags: ["태그 명", "태그 명"],
        cardKeyword: "키워드 명 9",
        cardContent: "내용",
      },
      {
        cardTags: ["태그 명", "태그 명"],
        cardKeyword: "키워드 명 10",
        cardContent: "내용",
      },
      {
        cardTags: ["태그 명", "태그 명"],
        cardKeyword: "키워드 명 11",
        cardContent: "내용",
      },
      {
        cardTags: ["태그 명", "태그 명"],
        cardKeyword: "키워드 명 12",
        cardContent: "내용",
      },
      {
        cardTags: ["태그 명", "태그 명"],
        cardKeyword: "키워드 명 13",
        cardContent: "내용",
      },
    ],
  };

//   console.log(data.results.length);
  const totalResults = data.results.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);


  const testData = {
    hashNext: currentPage < totalPages,
    results: data.results.slice(
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
    ),
  };

  // Function to handle pagination
  const handlePageChange = (page: any) => {
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
          ㅇㅇ의 검색 결과입니다
        </p>
        <div className="w-full flex flex-col">
          <div className="flex flex-row justify-between items-center mb-4">
            <p className="text-2xl font-bold">내용</p>
            <p onClick={goBack} className="text-xl text-gray-500">이전</p>
          </div>
          <SearchResult data={testData} />
          {data.hasNext && (
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
