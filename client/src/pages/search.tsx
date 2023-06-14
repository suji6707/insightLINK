import React from "react";
// Component
import NavBar from "../features/Dashboard/components/NavBar";
import { Wrapper } from "@/styles/wrapper";
import SearchResult from "@/features/Search/ContentSearch";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();

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

  const moreKeyword = () => {
    router.push("/searchKeyword");
  };

  const moreContent = () => {
    router.push("/searchContent");
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
            <p className="text-2xl font-bold">키워드</p>
            <p onClick={moreKeyword} className="text-xl text-gray-500">
              더보기
            </p>
          </div>
          <SearchResult data={data} />
        </div>
        <div className="w-full flex flex-col mt-8">
          <div className="flex flex-row justify-between items-center mb-4">
            <p className="text-2xl font-bold">내용</p>
            <p onClick={moreContent} className="text-xl text-gray-500">
              더보기
            </p>
          </div>
          <SearchResult data={data} />
        </div>
      </Wrapper>
    </div>
  );
}
