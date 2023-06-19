import React from "react";

const CardDetail = ({
  modalRef,
  modalOutsideClicked,
  cardId,
  userId,
}: CardDetail) => {
  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-30"
      ref={modalRef}
      onClick={(e) => modalOutsideClicked(e)}
    >
      <div
        className="
  absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white flex-col justify-start w-1/2 h-4/6 border drop-shadow-xl rounded-xl"
      >
        <div className="p-2 border-b border-current flex flex-row justify-between p-4">
          <div className="flex flex-row">
            <p className="mr-2">#tag</p>
            <p>#tag</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
