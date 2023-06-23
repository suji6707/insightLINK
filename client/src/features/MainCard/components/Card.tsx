import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CardDetailOpenAtom,
  ClickedCardDetailAtom,
} from "@/recoil/atoms/MainGraphAtom";
import { LoginStateAtom } from "@/recoil/atoms/LoginStateAtom";

import { CardData } from "../../../types/dashborad.types";
import {
  AiFillEdit,
  AiOutlineExpandAlt,
  AiOutlineDeliveredProcedure,
  AiOutlineClose,
} from "react-icons/ai";

import { Card_Edit_Api, Card_Delete_Api } from "@/axios/dashBoardApi";

interface CardProps {
  data: CardData;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const [detailOpen, setDetailOpen] = useRecoilState(CardDetailOpenAtom);
  const [clickedDetail, setClickedDetail] = useRecoilState(
    ClickedCardDetailAtom
  );
  const isLogin = useRecoilValue(LoginStateAtom);
  const [editedContent, setEditedContent] = useState<string>("");
  const [isEditingContent, setIsEditingContent] = useState(false);

  const handleCardClick = () => {
    setDetailOpen(!detailOpen);
    setClickedDetail(data?.cardId);
  };

  const handleContentEdit = () => {
    setIsEditingContent(true);
    setEditedContent(data?.cardContent);
  };

  /**
   * @params data.cardId number | null
   */
  const handleCardDelete = async () => {
    Card_Delete_Api(data?.cardId);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleContentSave = async () => {
    const response = await Card_Edit_Api(data?.cardId, editedContent);

    if (response.data.success) {
      setIsEditingContent(false);
      console.log("Save edited content:", editedContent);
    }
  };

  return (
    <div className="w-1/2 bg-red-200 h-1/3">
      <div>
        card <AiOutlineExpandAlt onClick={handleCardClick} />
      </div>
      <div>tag {data?.cardTag}</div>
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
            {editedContent || data?.cardContent}
          </>
        )}
      </div>
      <AiOutlineClose onClick={handleCardDelete} />
    </div>
  );
};

export default Card;
