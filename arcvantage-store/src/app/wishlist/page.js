"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {Heart} from "lucide-react";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetch("/api/wishlist")
      .then(res => res.json())
      .then(data => setWishlistItems(data));
  }, []);

  const handleRemove = async (productId) => {
    // 1. Optimistic Update: Remove from state immediately
    const previousItems = [...wishlistItems];
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) throw new Error("Failed to remove");
    } catch (err) {
      // 2. Rollback if the server fails
      console.error(err);
      setWishlistItems(previousItems);
    }
  };
  


  return (
    <div className="min-h-screen pt-40 px-10 max-w-[1400px] mx-auto">
      <h1 className="font-cinzel text-3xl font-bold uppercase mb-12">My Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <p className="text-black/40 font-bold uppercase tracking-widest">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlistItems.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-[32px] p-2 pb-6 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 border border-transparent hover:border-black/5">
            <Link href={`/product/${item.slug}`} className="block">
                <div className="aspect-square bg-[#F9F9F9] rounded-[24px] overflow-hidden mb-4 relative">
                <img 
                    src={item.image_url} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    alt={item.name}
                />
                </div>
                
                <h3 className="font-bold text-center text-[11px] tracking-widest uppercase px-2 mb-1">{item.name}</h3>
                <p className="text-[#966B4E] text-center font-bold text-[12px]">
                Rs. {Number(item.price_lkr).toLocaleString()}
                </p>
            </Link>

            {/* Quick Remove Heart Button */}
            <button
                onClick={(e) => {
                e.preventDefault(); // Prevents Link navigation
                e.stopPropagation(); // Prevents event bubbling
                handleRemove(item.id);
                }}
                className="absolute bottom-16 right-6 h-10 w-10 bg-white/80 backdrop-blur-md border border-black/15 rounded-full flex items-center justify-center shadow-xl hover:bg-red-50 hover:border-red-100 transition-all active:scale-90 group/heart"
            >
                <Heart 
                size={18} 
                className="text-red-500 fill-red-500 group-hover/heart:scale-110 transition-transform" 
                />
            </button>
            </div>
        ))}
        </div>
      )}
    </div>
  );
}