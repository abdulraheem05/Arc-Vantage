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

  // Updated isActive to handle both exact paths and category sub-paths
  const isActive = (href) => pathname === href;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Baking", href: "/shop/baking" },
    { name: "Cookware", href: "/shop/cookware" },
    { name: "Tableware", href: "/shop/tableware" },
    { name: "Containers", href: "/shop/containers" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white px-8 py-6 shadow-sm border-b border-black/5">
      <div className="max-w-[1500px] mx-auto flex items-center justify-between font-cinzel uppercase text-[13px] font-bold">

        {/* LEFT: Logo */}
        <Link href="/" className="text-xl font-black tracking-tighter flex-shrink-0">
          ARCVANTAGE
        </Link>

        {/* CENTER NAV: Flat structure */}
        <nav className="flex items-center gap-8 text-black">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="relative hover:text-[#966B4E] transition-colors group py-1"
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-[#966B4E] transition-all duration-300 ${
                  isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-6 text-black flex-shrink-0">
          <Link href="/search" className="hover:text-[#966B4E] transition-transform hover:scale-110">
            <Search size={18} strokeWidth={2.5} />
          </Link>

          <Link href="/wishlist" className="hover:text-[#966B4E] transition-transform hover:scale-110">
            <Heart size={18} strokeWidth={2.5} />
          </Link>

          <button onClick={openCart} className="hover:text-[#966B4E] relative transition-transform hover:scale-110">
            <ShoppingBag size={18} strokeWidth={2.5} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#966B4E] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {session ? (
            <Link href="/account" className="hover:text-[#966B4E]">
              <User size={18} strokeWidth={2.5} />
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-[12px] tracking-widest font-bold hover:text-[#966B4E]"
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}