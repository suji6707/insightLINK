import React, { useEffect, useState } from "react";
// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { CardDetailOpenAtom } from "@/recoil/atoms/MainGraphAtom";
import { LoginStateAtom } from "@/recoil/atoms/LoginStateAtom";
// library
import { BiUndo } from "react-icons/bi";
// custom hook
import useDetail from "@/features/MainCard/hook/useDetail";
// types
import { CardDataDetail } from "@/types/dashborad.types";
// API
import { Card_Edit_Api, Card_Delete_Api } from "@/axios/dashBoardApi";

import {
  AiFillEdit,
  AiOutlineExpandAlt,
  AiOutlineDeliveredProcedure,
  AiOutlineClose,
} from "react-icons/ai";

function CardDetail() {
  const [cardDetailData, setCardDetailData] = useState<CardDataDetail>({});
  const [detailOpen, setDetailOpen] = useRecoilState(CardDetailOpenAtom);
  const isLogin = useRecoilValue(LoginStateAtom);
  
  const [editedContent, setEditedContent] = useState<string>(
    cardDetailData?.content
  );
  const [isEditingContent, setIsEditingContent] = useState(false);
  // 데이터 fetch
  const detailData = useDetail();

  const handleDetailOpen = () => {
    setDetailOpen(!detailOpen);
  };

  const handleContentEdit = () => {
    setIsEditingContent(true);
    setEditedContent(cardDetailData?.content);
  };

  const handleCardDelete = async () => {
    Card_Delete_Api(cardDetailData?.cardId);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleContentSave = async () => {
    const response = await Card_Edit_Api(cardDetailData?.cardId, editedContent);

    if (response.data.success) {
      setIsEditingContent(false);
      console.log("Save edited content:", editedContent);
    }
  };

  useEffect(() => {
    if (detailData) {
      setCardDetailData(detailData);
    }

  }, [detailOpen, detailData]);

  return (
    <div className="w-full h-full bg-red-200">
      <div className="flex ml-auto">
        <button onClick={handleDetailOpen}>
          <BiUndo />
        </button>
        <AiOutlineClose onClick={handleCardDelete} />
      </div>

      <div>Tag: {cardDetailData?.cardTag}</div>

      <div>
        {isEditingContent ? (
          <>
            <textarea
              value={editedContent}
              onChange={handleContentChange}
              rows={editedContent.length / 15}
              style={{ width: "100%" }}
            />
            <AiOutlineDeliveredProcedure onClick={handleContentSave} />
          </>
        ) : (
          <>
            <AiFillEdit onClick={handleContentEdit} />{" "}
            {editedContent || cardDetailData?.content}
          </>
        )}
      </div>

      <div>Content: {cardDetailData?.content}</div>

      <div>Image: {cardDetailData?.cardImage}</div>
    </div>
  );
}

export default CardDetail;
