"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { Zap, ShoppingBag, Heart, Minus, Plus } from "lucide-react";

export default function ProductActions({ product }) {
  const router = useRouter();
  const [qty, setQty] = useState(1);

  const addToCart = useCartStore((state) => state.addToCart);
  const closeCart = useCartStore((state) => state.closeCart);

  const handleBuyNow = () =>{
    addToCart(product, qty);
    closeCart();
    window.scrollTo({ top: 0, behavior: 'instant' });
    router.push("/checkout");
  }

  return (
    <div className="space-y-8">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-[11px] font-bold uppercase tracking-widest text-black/40">Quantity</span>
        <div className="flex items-center border border-black/10 rounded-xl h-12">
          <button 
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-4 hover:text-[#966B4E] transition-colors"
          ><Minus size={16} /></button>
          <span className="w-8 text-center font-bold text-sm">{qty}</span>
          <button 
            onClick={() => setQty(qty + 1)}
            className="px-4 hover:text-[#966B4E] transition-colors"
          ><Plus size={16} /></button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button
        onClick={handleBuyNow}
        className="flex-[2] h-14 bg-black text-white rounded-full text-[12px]  uppercase tracking-[0.2em] hover:scale-102 hover:bg-[#966B4E] transition flex items-center justify-center gap-2">
        Buy Now
        </button>
        <button 
          onClick={() => addToCart(product, qty)}
          className="flex-[2] h-14 border border-black rounded-full text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition flex items-center justify-center gap-2"
        >
          <ShoppingBag size={16} /> Add to Cart
        </button>
        <button className="h-14 w-14 flex items-center justify-center border border-black/10 rounded-xl hover:bg-red-50 hover:border-red-100 group transition">
          <Heart size={20} className="text-black/40 group-hover:text-red-500 group-hover:fill-red-500 transition-colors" />
        </button>
      </div>
    </div>
  );
}