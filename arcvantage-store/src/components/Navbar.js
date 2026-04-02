"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, User, X, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const cart = useCartStore((state) => state.cart);
  const openCart = useCartStore((state) => state.openCart);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Search States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  // Handle clicking outside to close search
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Live Search Logic
  useEffect(() => {
    if (query.length > 1) {
      setIsLoading(true);
      const delayDebounceFn = setTimeout(async () => {
        try {
          const res = await fetch(`/api/products/search?q=${query}`);
          const data = await res.json();
          setResults(data);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }, 300); // 300ms debounce
      return () => clearTimeout(delayDebounceFn);
    } else {
      setResults([]);
    }
  }, [query]);

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
        <Link href="/" className={`text-xl font-black tracking-tighter flex-shrink-0 transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 lg:opacity-100' : 'opacity-100'}`}>
          ARCVANTAGE
        </Link>

        {/* CENTER NAV */}
        <nav className={`hidden lg:flex items-center gap-8 text-black transition-opacity duration-300 ${isSearchOpen ? 'opacity-30' : 'opacity-100'}`}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="relative hover:text-[#966B4E] transition-colors group py-1">
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#966B4E] transition-all duration-300 ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"}`} />
            </Link>
          ))}
        </nav>

        {/* RIGHT ICONS & SEARCH */}
        <div className="flex items-center gap-6 text-black flex-shrink-0 relative" ref={searchRef}>
          
          {/* ANIMATED SEARCH BAR */}
          <div className="flex items-center relative">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 280, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="absolute right-0 bg-[#F9F9F9] rounded-xl shadow-xl border border-black/5 overflow-hidden flex items-center pr-4"
                >
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent px-12 py-3 outline-none text-[12px] font-bold placeholder:text-black/70 lowercase"
                  />
                  {isLoading && <Loader2 size={14} className="animate-spin text-[#966B4E]" />}
                  {query && !isLoading && (
                    <button onClick={() => setQuery("")}><X size={14} className="text-black/30 hover:text-black" /></button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              animate={{ x: isSearchOpen ? -240 : 0 }}
              className="z-10 hover:text-[#966B4E] transition-colors relative p-2"
            >
              <Search size={18} strokeWidth={2.5} />
            </motion.button>
          </div>

          {/* OTHER ICONS */}
          <div className={`flex items-center gap-6 transition-all duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none translate-x-10' : 'opacity-100'}`}>
            <Link href="/wishlist" className="hover:text-[#966B4E] hover:scale-110 transition-transform"><Heart size={18} strokeWidth={2.5} /></Link>
            <button onClick={openCart} className="hover:text-[#966B4E] relative hover:scale-110 transition-transform">
              <ShoppingBag size={18} strokeWidth={2.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#966B4E] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">{cartCount}</span>
              )}
            </button>
            {session ? (
              <Link href="/account" className="hover:text-[#966B4E]"><User size={18} strokeWidth={2.5} /></Link>
            ) : (
              <Link href="/login" className="text-[12px] tracking-widest font-bold hover:text-[#966B4E]">LOGIN</Link>
            )}
          </div>

          {/* SEARCH RESULTS DROPDOWN */}
          <AnimatePresence>
            {isSearchOpen && results.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-[60px] right-0 w-[280px] bg-white shadow-2xl rounded-2xl border border-black/5 overflow-hidden z-[60]"
              >
                {results.map((product) => (
                  <Link 
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center gap-4 p-4 hover:bg-black/10 duration-300 transition-colors border-b border-black/[0.03] last:border-0"
                  >
                    <img src={product.image_url} alt={product.name} className="w-10 h-10 object-cover rounded-lg bg-gray-50" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black tracking-widest leading-tight">{product.name}</span>
                      <span className="text-[9px] text-[#966B4E] font-bold">Rs. {Number(product.price_lkr).toLocaleString()}</span>
                    </div>
                  </Link>
                ))} 
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}