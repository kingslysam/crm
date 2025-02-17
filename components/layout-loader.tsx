"use client";
import React from "react";
import SimplifyLogo from "@/public/images/logo/logo.png";
import Image from "next/image";
import { Loader2 } from "lucide-react";
const LayoutLoader = () => {
  return (
    <div className=" h-screen flex items-center justify-center flex-col space-y-2">
      <Image alt="Simplify Logo" src={SimplifyLogo} width={30} height={30} />
      <span className=" inline-flex gap-1">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </span>
    </div>
  );
};

export default LayoutLoader;
