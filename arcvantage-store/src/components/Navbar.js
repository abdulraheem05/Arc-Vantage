"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white px-10 py-8">
      {/* We use a 3-column grid here. 
         Column 1: Logo (Left)
         Column 2: Nav (Center)
         Column 3: Profile (Right)
      */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-3 items-center font-cinzel tracking-[0.2em] uppercase text-[13px]">
        
        {/* LEFT: Logo */}
        <Link href="/" className="text-lg font-bold">
          ARCVANTAGE
        </Link>

        {/* CENTER: Navigation Links */}
        <nav className="flex justify-center items-center gap-10 text-black">
          <Link href="/" className="relative group">
            HOME
            {/* The Brown Underline from your design */}
            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#966B4E]"></span>
          </Link>
          <Link href="/shop" className="hover:text-[#966B4E] transition-colors">SHOP</Link>
          <Link href="/contact" className="hover:text-[#966B4E] transition-colors">CONTACT US</Link>
        </nav>

        {/* RIGHT: Profile Link */}
        <div className="flex justify-end">
          <Link href={session ? "/account" : "/login"} className="hover:text-[#966B4E] transition-colors">
            PROFILE
          </Link>
        </div>
      </div>
    </header>
  );
}