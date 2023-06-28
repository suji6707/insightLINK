import React, { useState, KeyboardEvent, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [searchBar, setSearchBar] = useState<boolean>(false);
  const [keywords, setKeywords] = useState("");
  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      e.preventDefault();
      router.push({
        pathname: "/search",
        query: { search: keywords.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9]/g, " ") },
      });
      setKeywords("");
      setSearchBar(false);
    }
  };

  return (
    <>
      <form className="transition-all hover:bg-slate-100 flex items-center px-1 w-[25rem] ring ring-inset ring-gray-100 hover:ring-0 dark:ring-white/20 h-[2rem] border-b-2">
        <FiSearch size={20} className="mx-2" />
        <input
          ref={inputRef}
          type="text"
          className="w-full h-10 font-medium bg-transparent outline-none ring-none"
          value={keywords}
          placeholder="검색"
          onChange={(e) => {
            setKeywords(e.target.value);
          }}
          onBlur={() => setSearchBar(false)}
          onKeyPress={onKeyPress}
        />
      </form>
    </>
  );
}
