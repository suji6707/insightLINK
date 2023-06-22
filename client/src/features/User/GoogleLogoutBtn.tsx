// components/LogoutButton.js
import { signOut } from "next-auth/react";

const GoogleLogoutBtn = () => {
  const handleLogout = async (e: any) => {
    e.preventDefault();
    await signOut({ callbackUrl: "/" });
    localStorage.removeItem("token");
  };

  return (
    <button
      type="button"
      className="w-full px-4 py-2 mr-4 font-bold border border-black rounded"
      onClick={handleLogout}
    >
      구글 로그아웃
    </button>
  );
};

export default GoogleLogoutBtn;
