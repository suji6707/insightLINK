import { GET } from "@/axios/GET";
import React, { useEffect, useRef, useState } from "react";
import CardDetail from "./CardDetail";
import axios from "axios";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const listRef = useRef<HTMLUListElement>(null);
  // 마우스로 드래그 앤 드롭
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  // 모달
  const modalRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

  // 최근 업데이트 친구 조회
  const getFriends = async () => {
    // const data = await GET("friends");
    // console.log("data", data);

    // 임시
    const data = await axios.get(`http://localhost:4000/friends`);
    if (data != null) {
      setFriends(data.data);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

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

  const handleMouseMove = (
    e: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.clientX - (listRef.current?.offsetLeft || 0);
    const walk = x - startX;
    if (listRef.current) {
      listRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const modalOutsideClicked = (e: any) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  return (
    <div className="w-full">
      <p className="text-3xl font-bold">친구</p>
      <ul
        ref={listRef}
        className="flex justify-start py-5 overflow-x-hidden overflow-y-hidden scrolling-touch w-full cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {friends &&
          friends.map((f: Friends) => {
            return (
              <li
                key={f.id}
                className="m-4 p-2 flex-shrink-0 bg-gradient-to-tr from-violet-600 to-yellow-300 rounded-full"
              >
                <img
                  src={f.image}
                  className="w-24 h-24 rounded-full transform transition hover:-rotate-6 cursor-pointer"
                  alt="profile"
                  onClick={() => setShowModal(true)}
                />
              </li>
            );
          })}
      </ul>
      {showModal && (
        <CardDetail
          modalRef={modalRef}
          modalOutsideClicked={modalOutsideClicked}
        />
      )}
    </div>
  );
};

export default Friends;