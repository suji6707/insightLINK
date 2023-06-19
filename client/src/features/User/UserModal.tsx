import React, { useEffect, useState } from "react";
import LogoutBtn from "./LogoutBtn";
import GoogleLogoutBtn from "@/features/User/GoogleLogoutBtn";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type UserModalProps = {
  closeModal: () => void;
};

const UserModal: React.FC<UserModalProps> = ({ closeModal }) => {
  const router = useRouter();
  
  const { data: sessionData } = useSession();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="font-bold mb-4">User Modal</h2>
        {typeof window !== "undefined" && sessionData?.user && token ? (
              <GoogleLogoutBtn />
            ) : token ? (
                < LogoutBtn />
            ):null}
        <button
          className="bg-black text-white font-bold py-2 px-4 rounded mt-2"
          onClick={closeModal}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default UserModal;
