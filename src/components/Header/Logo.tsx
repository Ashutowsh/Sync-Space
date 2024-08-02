import Link from "next/link";
import React from "react";
function Logo() {
  return (
    <div className="flex items-center justify-center mt-2">
      <Link
        href="/"
        className="w-16 h-16 bg-black text-light flex items-center 
        justify-center rounded-full text-2xl font-bold text-white"
      >
        AP
      </Link>
    </div>
  );
}

export default Logo;