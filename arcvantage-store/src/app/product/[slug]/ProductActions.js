"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // Import session for user ID
import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag, Heart, Minus, Plus, Loader2 } from "lucide-react";

export default function ProductActions({ product }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [qty, setQty] = useState(1);
  
  // Wishlist states
  const [isLiked, setIsLiked] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const closeCart = useCartStore((state) => state.closeCart);

  // 1. Check if product is already in wishlist on mount
  useEffect(() => {
    if (session && product?.id) {
      const checkWishlist = async () => {
        try {
          const res = await fetch(`/api/wishlist/check?productId=${product.id}`);
          const data = await res.json();
          setIsLiked(data.exists);
        } catch (err) {
          console.error("Error checking wishlist:", err);
        }
      };
      checkWishlist();
    }
  }, [product?.id, session]);

  // 2. Toggle Wishlist Logic
  const toggleWishlist = async () => {
    if (!session) {
      // Direct to login if not authenticated
      router.push("/login");
      return;
    }

    setIsPending(true);
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
      
      const data = await res.json();
      if (data.status === "added") setIsLiked(true);
      if (data.status === "removed") setIsLiked(false);
    } catch (err) {
      console.error("Wishlist toggle failed:", err);
    } finally {
      setIsPending(false);
    }
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    closeCart();
    window.scrollTo({ top: 0, behavior: 'instant' });
    router.push("/checkout");
  };

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
          className="flex-[2] h-14 bg-black text-white rounded-full text-[12px] uppercase tracking-[0.2em] hover:scale-[1.02] hover:bg-[#966B4E] transition-all flex items-center justify-center gap-2"
        >
          Buy Now
        </button>
        
        <button 
          onClick={() => addToCart(product, qty)}
          className="flex-[2] h-14 border border-black rounded-full text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <ShoppingBag size={16} /> Add to Cart
        </button>

        {/* Updated Heart Button */}
        <button 
          onClick={toggleWishlist}
          disabled={isPending}
          className={`h-14 w-14 flex items-center justify-center border rounded-xl transition-all active:scale-90 ${
            isLiked 
              ? "bg-red-50 border-red-100" 
              : "border-black/10 hover:bg-black/5"
          }`}
        >
          {isPending ? (
            <Loader2 size={20} className="animate-spin text-black/20" />
          ) : (
            <Heart 
              size={20} 
              className={`transition-all duration-300 ${
                isLiked 
                  ? "text-red-500 fill-red-500 hover:scale-120 scale-110" 
                  : "text-black/40 hover:scale-120"
              }`} 
            />
          )}
        </button>
      </div>
    </div>
  );
}