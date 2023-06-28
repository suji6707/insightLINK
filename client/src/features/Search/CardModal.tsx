import React from "react";

type CardModalProps = {
  card: any;
  closeModal: () => void;
};

const CardModal: React.FC<CardModalProps> = ({ card, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-full max-w-md p-4 bg-white rounded-lg">
        <div className="relative w-full h-full px-8 pb-8 overflow-auto border rounded-lg shadow-md">
          <div className="sticky top-0 flex pt-6 pb-4 bg-white">
            <div className="flex items-center justify-center px-4 mr-2 font-semibold leading-6 text-white bg-[#254D9B] rounded">
              # {card.tag}
            </div>
          </div>
          <div className="w-full h-[25rem] mb-6 flex justify-center items-center">
          <img
            src={card.imageUrl}
            className="object-cover max-w-full max-h-full"
          />
        </div>
        </div>
        {/* Card detail content */}
        <div>{card.content}</div>

        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CardModal;
