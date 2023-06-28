import React from "react";
// componenets
import UserInfo from "@/features/Dashboard/UserPanal/components/UserInfo";
import SearchBar from "@/features/Dashboard/UserPanal/components/SearchBar";
import GraphEditBtn from "@/features/Dashboard/UserPanal/components/GraphEditBtn";
// Assets
import { BsCamera } from "react-icons/bs";

export default function UserPanel() {
  return (
    <>
      <div className="flex justify-between w-full mb-[5rem]">
        <UserInfo />
        <div className="flex">
          <GraphEditBtn />
          <SearchBar />
        </div>
      </div>
    </>
  );
}
