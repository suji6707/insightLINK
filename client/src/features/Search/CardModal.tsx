// Search/CardModal.tsx

import React from "react";
import styles from './CardModal.module.css';

type CardModalProps = {
  card: any;
  closeModal: () => void;
};

const CardModal: React.FC<CardModalProps> = ({ card, closeModal }) => {
  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-start gap-[1.5rem] w-[31.75rem] h-[35.25rem] p-6 bg-[#FFF] border border-gray-100 rounded shadow-1 ">
        <div className="flex justify-between items-center self-stretch bg-[, #FFF]">
          <div className="flex items-center gap-[1.5rem] flex-1">
            <div className="flex h-[2.25rem] px-[1rem] justify-center items-center rounded-md bg-[#254D9B]">
              <span className="text-white text-[1.25rem] font-kanit font-[600] leading-[150%] tracking-[0.0375rem]">
                #Programming
              </span>
            </div>
          </div>
          <div
            onClick={closeModal}
            className="flex w-[1.75rem] h-[1.75rem] flex-col justify-center items-center rounded-[0.25rem] bg-[#FFF]"
          >
            close
          </div>
        </div>
        <div className={`overflow-y-auto ${styles['mostly-customized-scrollbar']}`}>
          <div className="w-[28.25rem] flex justify-center items-center bg-lightgray mb-[1.5rem]">
            <img
              src={card.imageUrl}
              className="object-cover max-w-full max-h-full"
            />
          </div>

          <div className="flex flex-col self-stretch">
            <span className="text-gray-900 font-kanit text-[1.25rem] font-light leading-150">
              {card.content}
            </span>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default CardModal;
