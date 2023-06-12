import React, { useRef, useState } from "react";
// Component
import NavBar from "../components/NavBar";
import Friends from "@/components/social/Friends";
import Feeds from "@/components/social/Feeds";
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
