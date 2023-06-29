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
  const [cardlist, setcardlist] = useState([]);

  const tagColors = ["#254D9B", "#7D46C5", "#195E31"];

  const keyword = router.query.search;
  // console.log("keyword : ",keyword)

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("api/search/tags", {
          params: {
            keyword: keyword,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          // Handle the response from the backend
          setTaglist(response.data.result);
        })
        .catch((error) => {
          // Handle any errors that occurred during the API request
          console.error("API error:", error);
        });
    };

    if (keyword) {
      fetchData();
    }
  }, [keyword]); // Include currentPage in the dependency array

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
        // console.log("API response:", response.data.result);
        setcardlist(response.data.result);
      })
      .catch((error) => {
        // Handle any errors that occurred during the API request
        console.error("API error:", error);
      });
  };

  return (
    <>
      <div className="h-screen max-w-[75rem] mx-auto">
        <NavBar />
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
                    <span className="text-base font-semibold tracking-tighter text-white font-kanit leading-150">
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
                <div className="flex items-center self-stretch justify-between">
                  {clickedTag && (
                    <>
                      <div className="flex items-center justify-center h-[2rem] py-0 px-[1rem] rounded-md bg-[#254D9B]">
                        <span className="text-base font-semibold tracking-tighter text-white font-kanit leading-150">
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
                  {cardlist &&
                    cardlist.map((card: { id: number }) => {
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
      </div>
    </>
  );
}
