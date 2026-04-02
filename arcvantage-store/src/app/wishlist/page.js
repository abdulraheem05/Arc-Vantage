"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetch("/api/wishlist")
      .then(res => res.json())
      .then(data => setWishlistItems(data));
  }, []);

  return (
    <div className="min-h-screen pt-40 px-10 max-w-[1400px] mx-auto">
      <h1 className="font-cinzel text-3xl font-bold uppercase mb-12">My Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <p className="text-black/40 font-bold uppercase tracking-widest">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlistItems.map((item) => (
            <div key={item.id} className="group relative">
              <Link href={`/product/${item.slug}`}>
                <div className="aspect-square bg-[#F9F9F9] rounded-3xl overflow-hidden mb-4">
                  <img src={item.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-bold text-center text-[13px] tracking-widest uppercase">{item.name}</h3>
                <p className="text-[#966B4E] text-center font-bold text-[12px]">Rs. {item.price_lkr.toLocaleString()}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}