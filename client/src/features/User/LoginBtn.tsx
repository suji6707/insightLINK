import React from "react";
import { useRouter } from "next/router";

const LoginBtn: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  return (
    <button
      onClick={handleClick}
      className="font-bold py-2 rounded mr-4 border-black border w-full"
    >
      로그인
    </button>
  );
};

export default LoginBtn;
