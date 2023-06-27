import React, { useEffect, useState } from "react";
// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { CardDetailOpenAtom } from "@/recoil/atoms/MainGraphAtom";
import { LoginStateAtom } from "@/recoil/atoms/LoginStateAtom";
// library
import { BsXLg, BsTrashFill, BsPencilFill } from "react-icons/bs";
// custom hook
import useDetail from "@/features/Dashboard/MainCard/hook/useDetail";
// types
import { CardDataDetail } from "@/types/dashborad.types";
// API
import { Card_Edit_Api, Card_Delete_Api } from "@/axios/dashBoardApi";

function CardDetail() {
  const [cardDetailData, setCardDetailData] = useState<Partial<CardDataDetail>>(
    {}
  );
  const [detailOpen, setDetailOpen] = useRecoilState(CardDetailOpenAtom);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const loginId = useRecoilValue(LoginStateAtom);

  const [editedContent, setEditedContent] = useState<any>("");
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

  useEffect(() => {
    if (loginId === cardDetailData?.userId) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [loginId, cardDetailData?.userId]);

  return (
    <>
      <div className="relative w-full h-full px-8 pb-8 overflow-auto border rounded-lg shadow-md">
        <div className="sticky top-0 flex justify-between pt-6 pb-4 bg-white">
          {cardDetailData?.cardTag ? (
            cardDetailData?.cardTag.map((data: string, index: number) => {
              return (
                <div
                  className="px-4 font-semibold leading-6 text-white bg-blue-600 rounded"
                  key={index}
                >
                  # {data}
                </div>
              );
            })
          ) : (
            <></>
          )}
          <button onClick={handleDetailOpen} className="svg-button-nomal">
            <BsXLg />
          </button>
        </div>

        <img src={cardDetailData?.cardImage} className="mb-6" />

        {/* {isLogin ? ( */}
        {true ? (
          <>
            <div className="">
              {isEditingContent ? (
                <>
                  <textarea
                    value={editedContent}
                    onChange={handleContentChange}
                    rows={editedContent?.length / 15}
                    style={{ width: "100%" }}
                  />
                  <div className="absolute flex flex-row right-9 bottom-3 ">
                    <button className="svg-button-nomal">
                      <BsXLg />
                    </button>
                    <button className="svg-button-nomal">
                      <BsPencilFill onClick={handleContentSave} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {editedContent || cardDetailData?.content}
                  <div className="absolute flex flex-row bottom-3 right-9 ">
                    <button className="svg-button-nomal">
                      <BsTrashFill onClick={handleCardDelete} />
                    </button>
                    <button className="svg-button-nomal">
                      <BsPencilFill onClick={handleContentEdit} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div>{cardDetailData?.content}</div>
          </>
        )}
      </div>
    </>
  );
}

export default CardDetail;
