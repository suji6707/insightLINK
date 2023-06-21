// components/LogoutButton.js
import { signOut } from "next-auth/react";

const GoogleLogoutBtn = () => {
  const handleLogout = async (e : any) => {
    e.preventDefault();
    await signOut({ callbackUrl: "/" });
    localStorage.removeItem("token");
  };

  return (
    <button
      type="button"
      className="font-bold py-2 px-4 rounded mr-4 border-black border w-full"
      onClick={handleLogout}
    >
      구글 로그아웃
    </button>
  );
};

export default GoogleLogoutBtn;
