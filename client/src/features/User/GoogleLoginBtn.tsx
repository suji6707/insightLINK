// components/LoginButton.js
import { signIn } from "next-auth/react";

const GoogleLoginBtn = () => {

  const handleSignIn = (e: any) => {
    e.preventDefault();
    signIn("google");
  };
  
  return (
    <button
      type="button"
      className="font-bold py-2 rounded mr-4 border-black border w-full"
      onClick={handleSignIn}
    >
      구글 로그인
    </button>
  );
};

export default GoogleLoginBtn;

