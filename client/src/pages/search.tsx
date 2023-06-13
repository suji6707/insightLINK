import React from "react";
// Component
import NavBar from "../components/NavBar";
import { Wrapper } from "@/styles/wrapper";
import SearchResult from "@/components/searchResult/contentSearch";

export default function Search() {
  const data = {
    hasNext: false,
    results: [
      {
        cardTags: ["태그 명", "태그 명"],
        cardKeyword: "키워드 명",
        cardContent: "내용",
      },
      {
        cardTags: ["태그 명", "태그 명"],
        cardKeyword: "키워드 명",
        cardContent: "내용",
      },
    ],
  };
  return (
    <div>
      <NavBar />
      <Wrapper className="items-start">
        <p className="w-full p-4 border-b border-black dark:border-white text-3xl my-4">
          ㅇㅇ의 검색 결과입니다
        </p>
        <div className="w-full flex flex-col">
          <div className="flex flex-row justify-between">
            <p className="text-2xl">키워드</p>
            <p className="text-xl">더보기</p>
          </div>
          <SearchResult data={data} />
        </div>
        <div className="w-full flex flex-col">
          <div className="flex flex-row justify-between">
            <p className="text-2xl">내용</p>
            <p className="text-xl">더보기</p>
          </div>
          <SearchResult data={data} />
        </div>
      </Wrapper>
    </div>
  );
}
