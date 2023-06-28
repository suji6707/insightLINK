import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
// Component
import NavBar from "@/features/Dashboard/components/NavBar";
import { Wrapper } from "@/styles/wrapper";
import SearchBar from "@/features/Search/SearchBar";
import Card from "@/features/Search/Card";
// Assets
import { CgSearch } from "react-icons/cg";
import { AiOutlineExpand, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function Search() {
  const router = useRouter();
  const [clickedTag, setClickedTag] = useState("");
  const [taglist, setTaglist] = useState([]);

  const tagColors = ["#254D9B", "#7D46C5", "#195E31"];

  const cardsList = [
    {
      id: 1,
      imageUrl:
        "https://sw-jungle-s3.s3.ap-northeast-2.amazonaws.com/1687843535811.IMG_3173.PNG",
    },
    {
      id: 2,
      imageUrl:
        "https://sw-jungle-s3.s3.ap-northeast-2.amazonaws.com/1687773671502.IMG_8501.PNG",
    },
    {
      id: 3,
      imageUrl:
        "https://sw-jungle-s3.s3.ap-northeast-2.amazonaws.com/1687530677847.20180528_003830.jpg",
    },
    {
      id: 4,
      imageUrl:
        "https://sw-jungle-s3.s3.ap-northeast-2.amazonaws.com/1687851681338.%EC%A0%95%EA%B8%80.jpg",
    },
    {
      id: 5,
      imageUrl:
        "https://sw-jungle-s3.s3.ap-northeast-2.amazonaws.com/1687853694968.IMG_3531.PNG",
    },
    {
      id: 6,
      imageUrl:
        "https://sw-jungle-s3.s3.ap-northeast-2.amazonaws.com/1687843535811.IMG_3173.PNG",
    },
    {
      id: 7,
      imageUrl:
        "https://sw-jungle-s3.s3.ap-northeast-2.amazonaws.com/1687706804082.1576465200061.jpg",
    },
    {
      id: 8,
      imageUrl:
        "https://sw-jungle-s3.s3.ap-northeast-2.amazonaws.com/20180712_0105241687530374731.jpg",
    },
  ];

  const handleSearch = (value: string) => {
    // Perform actions with the search value (e.g., send to backend)
    console.log("Search value:", value);

    if (value.trim() === "") {
      alert("검색어를 입력하세요.");
      return;
    }

    axios
      .get("api/search/tags", {
        params: {
          keyword: value,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // Handle the response from the backend
        console.log("API response:", response.data.result);
        setTaglist(response.data.result);
      })
      .catch((error) => {
        // Handle any errors that occurred during the API request
        console.error("API error:", error);
      });
  };

  const handleExpandClick = (cardId: number) => {
    console.log("클릭한 카드 id : ", cardId);
  };

  const handleTagClick = (tag: string) => {
    console.log("Clicked tag:", tag);
    setClickedTag(tag);

    axios
      .post(
        "api/search/cards",
        { tag: tag }, // Replace 'tag' with the actual value you want to send
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // Handle the response from the backend
        console.log("API response:", response.data.result);
      })
      .catch((error) => {
        // Handle any errors that occurred during the API request
        console.error("API error:", error);
      });
  };

  return (
    <>
      <NavBar />
      <Wrapper className="flex items-center justify-center w-full">
        <div>
          <div className="flex justify-center items-end w-[75rem] h-[6.5rem]">
            <div className="w-[1200px] h-[104px] p-0 flex justify-center items-end">
              {/* search bar */}
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          <div className="flex flex-col items-start w-[75rem] py-[3.75rem] px-0 gap-[3.75rem]">
            <div className="flex flex-col gap-[2rem] items-start self-stretch pt-0 pr-0 pb-10 pl-0 border-b border-[#181818] shadow-1 mb-[0.5rem]">
              <div className="text-[#181818] leading-trim tracking-tight text-capitalize text-[1.25rem] font-kanit font-semibold">
                in Tags
              </div>
              <div className="flex items-start gap-[1rem] ">
                {taglist.map((tag, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-center h-[2rem] py-0 px-[1rem] rounded-md bg-[${tagColors[0]}]`}
                    onClick={() => handleTagClick(tag)}
                  >
                    <span className="text-white text-base font-kanit font-semibold leading-150 tracking-tighter">
                      # {tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start gap-[2rem] self-stretch pb-[2.5rem] border-b border-[#181818] shadow-1 mb-[0.5rem]">
              <div className="text-[#181818] leading-trim tracking-tight text-capitalize text-[1.25rem] font-kanit font-semibold">
                in Cards
              </div>

              <div className="flex flex-col items-start gap-[1rem] self-stretch">
                <div className="flex justify-between items-center self-stretch">
                  {clickedTag && (
                    <>
                      <div className="flex items-center justify-center h-[2rem] py-0 px-[1rem] rounded-md bg-[#254D9B]">
                        <span className="text-white text-base font-kanit font-semibold leading-150 tracking-tighter">
                          # {clickedTag}
                        </span>
                      </div>
                      <div className="flex items-center gap-[0.5rem]">
                        <div className="text-[#181818] text-[0.875rem] font-kanit font-weight-[300] leading-[160%] tracking-[-0.02625rem]">
                          1 - 12 of 12
                        </div>
                        <div className="flex items-center justify-center w-[1.75rem] h-[1.75rem] rounded-md bg-[#FFF]">
                          <AiOutlineLeft />
                        </div>
                        <div className="text-[#181818] text-[0.875rem] font-kanit font-weight-[300] leading-[160%] tracking-[-0.02625rem]">
                          1 / 1
                        </div>
                        <div className="flex items-center justify-center w-[1.75rem] h-[1.75rem] rounded-md bg-[#FFF]">
                          <AiOutlineRight />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex items-start content-start gap-[0.75rem] flex-1 self-stretch flex-wrap">
                  {cardsList &&
                    cardsList.map((card) => {
                      return (
                        <Card
                          key={card.id}
                          card={card}
                          handleExpandClick={handleExpandClick}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}