import React from "react";

interface SearchResultProps {
  data: any;
  keyword: string; // Add this line
}

const SearchResult: React.FC<SearchResultProps> = ({ data, keyword }) => {
  const highlightKeyword = (text: string, keyword: string) => {
    if (keyword && text.toLowerCase().includes(keyword.toLowerCase())) {
      const regex = new RegExp(`(${keyword})`, "gi");
      const parts = text.split(regex);
  
      return parts.map((part, index) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <mark key={index}>{part}</mark>
        ) : (
          part
        )
      );
    }
  
    return text;
  };
  
  
  

  return (
    <div className="w-full">
      {data &&
        data.map((r: any, index: number) => {
          return (
            <div
              key={index}
              className="w-full border border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md mb-4"
            >
              <div className="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 mb-2">
                <p className="text-xl font-bold">{r.cardKeyword}</p>
                <div className="flex flex-row">
                  {r.cardTags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full mr-2"
                    >
                      #{highlightKeyword(tag, keyword)}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-lg text-gray-800 dark:text-gray-200">
                {highlightKeyword(r.cardContent, keyword)}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default SearchResult;
