// components
import UserInfo from "@/features/Dashboard/UserPanal/components/UserInfo";
import SearchBar from "@/features/Dashboard/UserPanal/components/SearchBar";

export default function UserPanel() {
  return (
    <>
      <div className="flex justify-between w-full mb-[5rem]">
        <UserInfo />
        <div className="flex items-end justify-end">
          <SearchBar />
        </div>
      </div>
    </>
  );
}
