import { useTheme } from "next-themes";
import Link from "next/link";
// Assets
import { AiTwotoneBell } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsShare, BsSunFill, BsFillMoonFill } from "react-icons/bs";

export default function NavBar() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <div className="flex flex-row p-7 justify-between ">
      <Link href="/dashboard">
        <p className="text-3xl font-extrabold">insightLINK</p>
      </Link>
      <div className="flex flex-row w-1/6 justify-between">
        <BsShare size={30} />
        <AiTwotoneBell size={30} />
        <BiUser size={30} />
        {currentTheme === "dark" ? (
          <button onClick={() => setTheme("light")}>
            <BsSunFill size={30} />
          </button>
        ) : (
          <button onClick={() => setTheme("dark")}>
            <BsFillMoonFill size={30} />
          </button>
        )}
      </div>
    </div>
  );
}
