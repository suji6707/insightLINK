import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// Component
import { Wrapper } from "@/styles/wrapper";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      router.push('/');
    }
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    alert("Logout successful!");
    localStorage.removeItem("token");
    localStorage.removeItem("recoil-persist");
    localStorage.removeItem("userId");
    router.push("/");
  };

  return (
    <Wrapper>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="container flex flex-col items-end max-w-md mx-auto">
          {/* Updated class */}
        </div>
        <div className="flex justify-end mt-4">
          {token ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 mr-4 font-bold text-white bg-black rounded cursor-pointer"
            >
              로그아웃
            </button>
          ) : null}
        </div>
      </div>
    </Wrapper>
  );
}
