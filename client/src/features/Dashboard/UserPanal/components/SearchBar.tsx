import React, { useState, KeyboardEvent, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [keywords, setKeywords] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      e.preventDefault();
      router.push({
        pathname: "/search",
        query: { search: keywords.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9]/g, " ") },
      });
      setKeywords("");
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const containerClasses = classNames("flex", "w-[25.5625rem]", "h-[2.75rem]", "px-0.25rem", "justify-between", "items-center", "flex-shrink-0", {
    "border-b border-blue-500 bg-[#F4F4F4]": isInputFocused,
    "border-b border-gray-900 bg-white": !isInputFocused,
  });

  const searchIconClasses = classNames("h-4", "w-4", {
    "text-blue-500 mx-2": isInputFocused,
    "mx-2": !isInputFocused,
  });

  return (
    <>
      <div className={containerClasses}>
        <FiSearch size={20} className={searchIconClasses} />
        <input
          ref={inputRef}
          type="text"
          className="w-full h-10 font-medium bg-transparent outline-none ring-none"
          value={keywords}
          placeholder="Find your insight"
          onChange={(e) => {
            setKeywords(e.target.value);
          }}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyPress={onKeyPress}
        />
      </div>
    </>
  );
}
