"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, User } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white px-10 py-7">
      <div className="max-w-[1400px] mx-auto grid grid-cols-3 items-center font-cinzel tracking-[0.2em] uppercase text-[13px]">

        {/* LEFT: Logo */}
        <Link href="/" className="text-lg font-bold">
          ARCVANTAGE
        </Link>

        {/* CENTER NAV */}
        <nav className="flex justify-center items-center gap-10 font-medium tracking-[0.10em] text-black">

          {/* HOME */}
          <Link href="/" className="relative hover:text-[#966B4E] transition-colors">
            HOME
            <span
            className={`absolute -bottom-1 left-0 h-[1px] bg-[#966B4E] transition-all duration-300 ${
              isActive("/") ? "w-full" : "w-0 group-hover:w-full"
            }`}
  />
          </Link>

          {/* SHOP DROPDOWN */}
          <div className="justify-items py-2 relative group">
            <Link href="/shop" className="relative group hover:text-[#966B4E] transition-colors">
              SHOP
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#966B4E] 
                   transition-all duration-300 
                   group-hover:w-full" />
            </Link>

            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[230px]
                opacity-0 pointer-events-none translate-y-2
                group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0
                transition-all duration-200 z-[60]">   
            {/* hover bridge */}
            <div className="absolute -top-3 left-0 w-full h-3" />

            <div className="bg-white border border-black/10 rounded-xl shadow-lg overflow-hidden">
              <Link href="/shop?category=baking" className="text-center block w-full px-6 py-4 text-[14px] font-semibold tracking-[0.08em] hover:bg-black/5 hover:text-[#966B4E] transition-colors">
                Baking Utensils
              </Link>
              <div className="h-px bg-black/10" />

              <Link href="/shop?category=cookware" className="text-center block w-full px-6 py-4 text-[14px] font-semibold tracking-[0.08em] hover:bg-black/5 hover:text-[#966B4E] transition-colors">
                Cookware
              </Link>
              <div className="h-px bg-black/10" />

              <Link href="/shop?category=tableware" className="text-center block w-full px-6 py-4 text-[14px] font-semibold tracking-[0.08em] hover:bg-black/5 hover:text-[#966B4E] transition-colors">
                Tableware
              </Link>
              <div className="h-px bg-black/10" />

              <Link href="/shop?category=containers" className="text-center block w-full px-6 py-4 text-[14px] font-semibold tracking-[0.08em] hover:bg-black/5 hover:text-[#966B4E] transition-colors">
                Containers
              </Link>
            </div>
          </div>
          </div>

          {/* COLLECTIONS DROPDOWN */}
          <div className="relative group">
            <Link href="/collections" className="relative group hover:text-[#966B4E] transition-colors">
              COLLECTIONS
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#966B4E] 
                   transition-all duration-300 
                   group-hover:w-full" />
            </Link>

            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[230px] z-[80]
                opacity-0 pointer-events-none translate-y-2
                group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0
                transition-all duration-200">
              <div className="absolute -top-3 left-0 w-full h-3" />
              <div className="bg-white border border-black/10 rounded-xl shadow-lg overflow-hidden">
                
                <Link
                  href="/collections/wood"
                  className="text-center block w-full px-6 py-4 text-[14px] font-semibold tracking-[0.08em]
                            hover:bg-black/5 hover:text-[#966B4E] transition-colors"
                >
                  Wood
                </Link>
                <div className="h-px bg-black/10" />

                <Link
                  href="/collections/glass"
                  className="text-center block w-full px-6 py-4 text-[14px] font-semibold tracking-[0.08em]
                            hover:bg-black/5 hover:text-[#966B4E] transition-colors"
                >
                  Glass
                </Link>
                <div className="h-px bg-black/10" />

                <Link
                  href="/collections/ceramic"
                  className="text-center block w-full px-6 py-4 text-[14px] font-semibold tracking-[0.08em]
                            hover:bg-black/5 hover:text-[#966B4E] transition-colors"
                >
                  Ceramic
                </Link>
                <div className="h-px bg-black/10" />

                <Link
                  href="/collections/steel"
                  className="text-center block w-full px-6 py-4 text-[14px] font-semibold tracking-[0.08em]
                            hover:bg-black/5 hover:text-[#966B4E] transition-colors"
                >
                  Steel
                </Link>
                <div className="h-px bg-black/10" />
              </div>
            </div>
          </div>

          {/* NEW */}
          <Link href="/new" className="relative group hover:text-[#966B4E] transition-colors">
            NEW
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#966B4E] 
                   transition-all duration-300 
                   group-hover:w-full" />
          </Link>
        </nav>

        {/* RIGHT ICONS */}
        <div className="flex justify-end items-center gap-6 text-black">

          <Link href="/search" className="hover:text-[#966B4E]">
            <Search size={18} strokeWidth={1.5} />
          </Link>

          <Link href="/wishlist" className="hover:text-[#966B4E]">
            <Heart size={18} strokeWidth={1.5} />
          </Link>

          <Link href="/cart" className="hover:text-[#966B4E]">
            <ShoppingBag size={18} strokeWidth={1.5} />
          </Link>

          {session ? (
            <Link href="/account" className="hover:text-[#966B4E]">
              <User size={18} strokeWidth={1.5} />
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-[12px] tracking-[0.18em] font-semibold uppercase hover:text-[#966B4E]"
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}