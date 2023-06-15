import React from "react";

interface SearchResultProps {
  data: any;
}

const SearchResult: React.FC<SearchResultProps> = ({ data }) => {

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
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-lg text-gray-800 dark:text-gray-200">
                {r.cardContent}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default SearchResult;
