import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="flex w-[25.5625rem] h-[2.75rem] px-0.25rem justify-between items-center flex-shrink-0 border-b border-blue-500 bg-gray-50">
      <CgSearch className="h-4 w-4 text-blue-500" />
      <input
        type="text"
        className="flex-1 px-2 text-gray-900 text-sm focus:outline-none bg-transparent text-base font-sans font-light leading-[170%]"
        placeholder="Search"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
