import React from "react";

interface propsType {
  data: any;
}

export default function SearchResult({ data }: propsType) {
  const results = data.results;
  return (
    <div className="w-full p-2">
      {results &&
        results.map((r: any, index: number) => {
          return (
            <div
              key={index}
              className="w-full border p-4 text-xl border-black dark:border-white my-2"
            >
              <div className="w-full flex flex-row justify-between border-b border-black dark:border-white">
                <p>{r.cardKeyword}</p>
                <div className="flex flex-row">
                  <p>#{r.cardTags[0]}</p>
                  <p>#{r.cardTags[1]}</p>
                </div>
              </div>
              <p>{r.cardContent}</p>
            </div>
          );
        })}
    </div>
  );
}
