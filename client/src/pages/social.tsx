import React from "react";
// Component
import NavBar from "@/features/Dashboard/components/NavBar";
import Friends from "@/features/Social/components/Friends";
import Feeds from "@/features/Social/components/Feeds";
import Users from "@/features/Social/components/Users";
import { Wrapper } from "@/styles/wrapper";

export default function Social() {
  return (
    <div className="h-screen max-w-[75rem] mx-auto">
      <NavBar />
      <div className="max-w-[75rem] flex flex-col items-center justify-between m-auto">
        <div className="flex jutify-center items-start gap-8 self-stretch">
          <div className="flex py-[3.75rem] flex-col items-start gap-7 flex-1 w-full">
            <Friends />
            <Feeds />
          </div>
          <Users />
        </div>
      </div>
    </div>
  );
}
