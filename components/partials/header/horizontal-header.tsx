import React from "react";
import { Search } from "lucide-react";
import SimplifyLogo from "@/public/images/logo/logo.png"
import Link from "next/link";
import Image from "next/image";
const horizontalHeader = ({ handleOpenSearch }: { handleOpenSearch: () => void; }) => {
  return (
    <div className="flex items-center lg:gap-12 gap-3 ">
      <div>
        <Link
          href="/dashboard"
          className=" text-primary flex items-center gap-2"
        >
          <Image alt="simplify logo" src={SimplifyLogo} width={30} height={30} />
          <span className=" text-xl font-semibold lg:inline-block hidden">
            {" "}
            Simplify
          </span>
        </Link>
      </div>
      <button
        onClick={handleOpenSearch}
        className=" inline-flex lg:gap-2 lg:mr-0 mr-2 items-center text-default-600 text-sm"
      >
        <span>
          <Search className=" h-4 w-4" />
        </span>
        <span className=" lg:inline-block hidden"> Search...</span>
      </button>
    </div>
  );
};

export default horizontalHeader;
