import React, { useRef, useState } from "react";
// Component
import NavBar from "../features/Dashboard/components/NavBar";
import Friends from "@/features/Social/components/Friends";
import Feeds from "@/features/Social/components/Feeds";

import { Wrapper } from "@/styles/wrapper";

export default function Social() {
  return (
    <div>
      <NavBar />
      <Wrapper className="border-l border-r px-4">
        <Friends />
        <Feeds />
      </Wrapper>
    </div>
  );
}
