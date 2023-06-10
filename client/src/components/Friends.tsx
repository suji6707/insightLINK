import React, { useRef, useState } from "react";

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const listRef = useRef<HTMLUListElement>(null);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) => {
    setIsMouseDown(true);
    setStartX(e.clientX - (listRef.current?.offsetLeft || 0));
    setScrollLeft(listRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.clientX - (listRef.current?.offsetLeft || 0);
    const walk = x - startX; // 여기서 walk 값으로 스크롤 양을 조절합니다
    if (listRef.current) {
      listRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div>
      <p className="text-3xl font-semibold">Friends</p>
      <ul
        ref={listRef}
        className="flex justify-start py-5 overflow-x-hidden overflow-y-hidden scrolling-touch select-none w-full cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {friends &&
          friends.map((f) => {
            return (
              <li
                key={f.id}
                className="m-3 p-1 flex-shrink-0 bg-gradient-to-tr from-violet-600 to-yellow-300 rounded-full"
              >
                <img
                  src={f.image}
                  className="w-20 h-20 rounded-full transform transition hover:-rotate-6"
                  alt="profile"
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
