import React from "react";
import { useRouter } from "next/router";

const SignupButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/signup");
  };

  return (
    <button
      onClick={handleClick}
      className="font-bold py-2 rounded mr-4 border-black border w-full cursor-pointer"
    >
      회원가입
    </button>
  );
};

export default SignupButton;
