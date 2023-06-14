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
      <Wrapper>
        <Friends />
        <Feeds />
      </Wrapper>
    </div>
  );
}
