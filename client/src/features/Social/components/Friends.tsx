import React, { useEffect, useRef, useState } from "react";
import getToken from "@/axios/getToken";
import { GET } from "@/axios/GET";
import CardDetail from "@/features/Social/components/CardDetail";
import { Friends } from "@/types/social.types"


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
  const [userId, setUserId] = useState(1);
  const [cardId, setCardId] = useState(1);

  // 최근 업데이트 친구 조회
  const getFriends = async () => {
    const token = getToken();
    const data = await GET("social/updated", token);
    console.log(data);
    if (data != null) {
      setFriends(data);
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
        className="flex justify-start w-full py-5 overflow-x-hidden overflow-y-hidden scrolling-touch cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {friends &&
          friends.map((f: Friends) => {
            return (
              <li
                key={f.userId}
                className="flex-shrink-0 p-2 m-2 rounded-full bg-gradient-to-tr from-violet-600 to-yellow-300"
              >
                <img
                  src={f.profile_img}
                  className="w-24 h-24 transition transform rounded-full cursor-pointer hover:-rotate-6"
                  alt="profile"
                  onClick={() => {
                    setShowModal(true);
                    setCardId(f.cardId);
                    setUserId(f.userId);
                  }}
                />
              </li>
            );
          })}
      </ul>
      {showModal && (
        <CardDetail
          modalRef={modalRef}
          modalOutsideClicked={modalOutsideClicked}
          cardId={cardId}
          userId={userId}
        />
      )}
    </div>
  );
};

export default Friends;
