import React from "react";
import { useRouter } from "next/router";
// Component
import NavBar from "../features/Dashboard/components/NavBar";
import { Wrapper } from "@/styles/wrapper";
import SearchResult from "@/features/Search/ContentSearch";
// Assets
import { GrFormNext } from "react-icons/gr";

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
        <div className="w-full flex flex-col px-2">
          <div className="flex flex-row justify-between items-center mb-4">
            <p className="text-2xl font-bold px-2">키워드</p>
            <GrFormNext onClick={moreKeyword} className="text-xl text-gray-500">
              더보기
            </GrFormNext>
          </div>
          <SearchResult data={data} />
        </div>
        <div className="w-full flex flex-col mt-4 px-2">
          <div className="flex flex-row justify-between items-center mb-4">
            <p className="text-2xl font-bold px-2">내용</p>
            <GrFormNext onClick={moreContent} className="text-xl text-gray-500">
              더보기
            </GrFormNext>
          </div>
          <SearchResult data={data} />
        </div>
      </Wrapper>
    </div>
  );
}
