import React, { useRef, useState } from "react";
// Component
import NavBar from "../components/NavBar";
import Friends from "@/components/Friends";
import Feeds from "@/components/Feeds";
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
