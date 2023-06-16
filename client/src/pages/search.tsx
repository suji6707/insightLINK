import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
// Component
import NavBar from "../features/Dashboard/components/NavBar";
import { Wrapper } from "@/styles/wrapper";
import SearchResult from "@/features/Search/ContentSearch";
// Assets
import { GrFormNext } from "react-icons/gr";

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

  const [contentsData, setContentsData] = useState<ResponseData | null>(null);
  const [tagsData, setTagsData] = useState<ResponseData | null>(null);
  const [contentsAllData, setContensAllData] = useState<ResponseData | null>(null);
  const [tagsAllData, setTagsAllData] = useState<ResponseData | null>(null);

  useEffect(() => {
    const contentsData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/dashboard/contents', {
          params: {
            search: keywords
          }
        });
        setContentsData(response.data);
      } catch (error) {
        console.error(error); // Handle any errors that occurred during the request
      }
    };

    const contentsAllData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/dashboard/contents/all', {
          params: {
            search: keywords
          }
        });
        setContensAllData(response.data);
      } catch (error) {
        console.error(error); // Handle any errors that occurred during the request
      }
    };

    const tagsData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/dashboard/tags', {
          params: {
            search: keywords
          }
        });
        setTagsData(response.data);
      } catch (error) {
        console.error(error); // Handle any errors that occurred during the request
      }
    };
  
    const tagsAllData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/dashboard/tags/all', {
          params: {
            search: keywords
          }
        });
        setTagsAllData(response.data);
      } catch (error) {
        console.error(error); // Handle any errors that occurred during the request
      }
    };

    if (keywords) {
      contentsData();
      tagsData();
      contentsAllData();
      tagsAllData();
    }
  }, [keywords]);

  console.log(contentsData?.results);
  console.log(tagsData?.results)
  console.log(contentsAllData?.results)


  const moreTag = () => {
    router.push({
      pathname: '/searchTag',
      query: {search : keywords}
    })
  };

  const moreContent = () => {
    router.push({
      pathname: '/searchContent',
      query: {search : keywords}
    })
  };

  return (
    <div>
      <NavBar />
      <Wrapper className="items-start">
        <p className="w-full p-4 border-b border-black dark:border-white text-3xl my-4">
          '{keywords}'의 검색 결과입니다
        </p>
        <div className="w-full flex flex-col px-2">
          <div className="flex flex-row justify-between items-center mb-4">
            <p className="text-2xl font-bold px-2">내용 {(contentsData?.results[0])? contentsAllData?.results.length + '개' : '0개'}</p>
            <GrFormNext onClick={moreContent} className="text-xl text-gray-500">
              더보기
            </GrFormNext>
          </div>
          {(contentsData?.results[0]) ? <SearchResult data={contentsData?.results} /> : <div>검색 결과가 없습니다.</div>}
          {/* <SearchResult data={contentsData?.results} /> */}
        </div>
        <div className="w-full flex flex-col mt-4 px-2">
          <div className="flex flex-row justify-between items-center mb-4">
            <p className="text-2xl font-bold px-2">태그 {(tagsData?.results[0])? tagsAllData?.results.length + '개' : '0개'}</p>
            <GrFormNext onClick={moreTag} className="text-xl text-gray-500">
              더보기
            </GrFormNext>
          </div>
          {(tagsData?.results[0]) ? <SearchResult data={tagsData?.results} /> : <div>검색 결과가 없습니다.</div>}
          {/* <SearchResult data={tagsData?.results} /> */}
        </div>
      </Wrapper>
    </div>
  );
}
