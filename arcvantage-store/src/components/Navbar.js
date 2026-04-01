"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, User } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const cart = useCartStore((state) => state.cart);
  const openCart = useCartStore((state) => state.openCart);
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (href) => pathname === href;

  return (
    /* Added 'shadow-sm' for the slight shadow and increased py slightly for breathing room */
    <header className="fixed top-0 left-0 w-full z-50 bg-white px-10 py-6 shadow-sm border-b border-black/5">
      {/* Increased text size to 15px and set font-bold for the whole container */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-3 items-center font-cinzel tracking-[0.15em] uppercase text-[15px] font-bold">

        {/* LEFT: Logo - Bumped to text-xl */}
        <Link href="/" className="text-xl font-black tracking-[0.25em]">
          ARCVANTAGE
        </Link>

        {/* CENTER NAV */}
        <nav className="flex justify-center items-center gap-10 text-black">

          {/* HOME */}
          <Link href="/" className="relative hover:text-[#966B4E] transition-colors group">
            HOME
            <span
              className={`absolute -bottom-1 left-0 h-[2px] bg-[#966B4E] transition-all duration-300 ${
                isActive("/") ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>

          {/* SHOP DROPDOWN */}
          <div className="justify-items py-2 relative group">
            <Link href="/shop" className="relative hover:text-[#966B4E] transition-colors">
              SHOP
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#966B4E] transition-all duration-300 ${
                isActive("/shop") ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>

            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[250px]
                opacity-0 pointer-events-none translate-y-2
                group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0
                transition-all duration-300 z-[60]">   
              
              <div className="absolute -top-3 left-0 w-full h-4" />

              <div className="bg-white border border-black/10 rounded-xl shadow-xl overflow-hidden">
                {["Baking Utensils", "Cookware", "Tableware", "Containers"].map((cat) => (
                  <Link 
                    key={cat}
                    href={`/shop?category=${cat.toLowerCase().split(' ')[0]}`} 
                    className="text-center block w-full px-6 py-4 text-[14px] font-bold tracking-[0.1em] hover:bg-black/5 hover:text-[#966B4E] transition-colors border-b border-black/5 last:border-0"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* NEW */}
          <Link href="/new" className="relative group hover:text-[#966B4E] transition-colors">
            NEW
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#966B4E] transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>

        {/* RIGHT ICONS */}
        <div className="flex justify-end items-center gap-8 text-black">
          <Link href="/search" className="hover:text-[#966B4E] transition-transform hover:scale-110">
            <Search size={20} strokeWidth={2} />
          </Link>

          <Link href="/wishlist" className="hover:text-[#966B4E] transition-transform hover:scale-110">
            <Heart size={20} strokeWidth={2} />
          </Link>

          <button onClick={openCart} className="hover:text-[#966B4E] relative transition-transform hover:scale-110">
            <ShoppingBag size={20} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#966B4E] text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {session ? (
            <Link href="/account" className="hover:text-[#966B4E]">
              <User size={20} strokeWidth={2} />
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-[13px] tracking-[0.18em] font-bold uppercase hover:text-[#966B4E]"
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}