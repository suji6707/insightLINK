import React from "react";
// Assets
import { BsCamera } from "react-icons/bs";
import Link from "next/link";
export default function ImgUploadBtn() {
  return (
    <div>
      <Link href="/image">
        <BsCamera size={30} />
      </Link>
    </div>
  );
}
