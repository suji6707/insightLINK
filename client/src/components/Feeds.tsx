import React, { useState } from "react";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

export default function Feeds() {
  const [cards, setCards] = useState([]);

  return (
    <div>
      <p className="text-3xl font-semibold">Friends</p>
      <ul>
        {cards &&
          cards.map((c) => {
            return (
              <li key={c.id} className="flex flex-col border-2 my-4">
                <div className="flex justify-between border-b-2 p-2">
                  <div>
                    <p>#{c.tags}</p>
                  </div>
                  <div className="flex">
                    <FiThumbsUp className="mr-2" />
                    <FiThumbsDown className="mr-2" />
                    <AiOutlineClose className="mr-2" />
                  </div>
                </div>
                <p className="p-2">{c.content}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
