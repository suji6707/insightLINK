import React, { useRef, useState } from "react";
// Component
import NavBar from "@/features/Dashboard/components/NavBar";
import Friends from "@/features/Social/components/Friends";
import Feeds from "@/features/Social/components/Feeds";

import { Wrapper } from "@/styles/wrapper";
import Users from "@/features/Social/components/Users";

export default function Social() {
  return (
    <>
      <Wrapper className="px-4 border-l border-r">
        <NavBar />
        <Friends />
        <Feeds />
      </Wrapper>
      <Users />
    </>
  );
}
