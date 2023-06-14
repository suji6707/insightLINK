import React from "react";
import LogoutButton from "./LogoutButton";

type UserModalProps = {
  closeModal: () => void;
};

const UserModal: React.FC<UserModalProps> = ({ closeModal }) => {
  const token = localStorage.getItem("token");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="font-bold mb-4">User Modal</h2>
        {token && <LogoutButton />}
        <button className="bg-black text-white font-bold py-2 px-4 rounded" onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
};

export default UserModal;
