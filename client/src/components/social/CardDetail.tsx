import React from "react";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";

interface propsType {
  modalRef: React.ForwardedRef<HTMLDivElement>;
  modalOutsideClicked: (e: any) => void;
  cardId?: string;
  userId?: string;
}

export default function CardDetail({
  modalRef,
  modalOutsideClicked,
  cardId,
  userId,
}: propsType) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60"
      ref={modalRef}
      onClick={(e) => modalOutsideClicked(e)}
    >
      <div
        className="
  absolute top-1/2 left-1/2 transform -translate-y-2/3 -translate-x-1/2 bg-white flex-col justify-start w-1/2 h-3/6 border-2 border-current"
      >
        <div className="p-2 border-b border-current flex flex-row justify-between">
          <div className="flex flex-row">
            <p className="mr-2">#tag</p>
            <p>#tag</p>
          </div>
          <div className="flex flex-row">
            <FiThumbsUp className="mr-2" />
            <FiThumbsDown className="mr-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
