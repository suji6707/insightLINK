import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { CardDetailOpenAtom, ClickedCardDetailAtom } from "@/recoil/atoms/MainGraphAtom";
import { CardData } from "../../../types/dashborad.types";
import { AiFillEdit, AiOutlineExpandAlt, AiOutlineDeliveredProcedure, AiOutlineClose } from "react-icons/ai";
import axios from "axios";

interface CardProps {
  data: CardData;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const [detailOpen, setDetailOpen] = useRecoilState(CardDetailOpenAtom);
  const [clickedDetail, setClickedDetail] = useRecoilState(ClickedCardDetailAtom);
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

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleContentSave = async () => {
    try {
      console.log(data?.cardId);
      const response = await axios.patch(
        "http://localhost:8800/api/cards/update/" + data?.cardId,
        { content: editedContent },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setIsEditingContent(false);
        console.log("Save edited content:", editedContent);
      }
    } catch (error) {
      console.error("Error saving the edited nickname:", error);
    }
  };

  const handleCardDelete = async () => {
    try {
      console.log(data?.cardId);
      const response = await axios.delete("http://localhost:8800/api/cards/delete/" + data?.cardId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        console.log("Delete CardId : ", data?.cardId);
      }
    } catch (error) {
      console.error("Error saving the edited nickname:", error);
    }
  };

  return (
    <div className="w-1/2 bg-red-200 h-1/3">
      <div>
        card <AiOutlineExpandAlt onClick={handleCardClick} />
      </div>
      <div>tag {data?.cardTag}</div>
      <div>
        Content
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
            <AiFillEdit onClick={handleContentEdit} /> {editedContent || data?.cardContent}
          </>
        )}
      </div>
      <AiOutlineClose onClick={handleCardDelete} />
    </div>
  );
};

export default Card;
