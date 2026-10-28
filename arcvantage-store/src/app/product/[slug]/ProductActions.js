
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag, Heart, Minus, Plus, Loader2 } from "lucide-react";

export default function ProductActions({ product }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [qty, setQty] = useState(1);

  // Wishlist states
  const [isLiked, setIsLiked] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const closeCart = useCartStore((state) => state.closeCart);

  // Check whether the product is already in the wishlist
  useEffect(() => {
    if (session && product?.id) {
      const checkWishlist = async () => {
        try {
          const res = await fetch(
            `/api/wishlist/check?productId=${product.id}`
          );
          const data = await res.json();
          setIsLiked(data.exists);
        } catch (err) {
          console.error("Error checking wishlist:", err);
        }
      };

      checkWishlist();
    }
  }, [product?.id, session]);

  // Toggle wishlist
  const toggleWishlist = async () => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
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
    window.scrollTo({ top: 0, behavior: "instant" });
    router.push("/checkout");
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8">

      {/* Quantity and Wishlist */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-start sm:gap-5">

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 sm:text-[11px]">
            Quantity
          </span>

          <div className="flex h-12 items-center rounded-xl border border-black/10">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQty((current) => Math.max(1, current - 1))}
              className="flex h-full items-center justify-center px-3 transition-colors hover:text-[#966B4E] sm:px-4"
            >
              <Minus size={16} />
            </button>

            <span className="w-6 text-center text-sm font-bold">
              {qty}
            </span>

            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQty((current) => current + 1)}
              className="flex h-full items-center justify-center px-3 transition-colors hover:text-[#966B4E] sm:px-4"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Wishlist Heart beside quantity */}
        <button
          type="button"
          onClick={toggleWishlist}
          disabled={isPending || status === "loading"}
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isLiked}
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all active:scale-90 ${
            isLiked
              ? "border-red-100 bg-red-50"
              : "border-black/10 hover:bg-black/5"
          }`}
        >
          {isPending ? (
            <Loader2 size={20} className="animate-spin text-black/40" />
          ) : (
            <Heart
              size={20}
              className={`transition-all duration-300 ${
                isLiked
                  ? "scale-110 fill-red-500 text-red-500"
                  : "text-black/50"
              }`}
            />
          )}
        </button>
      </div>

      {/* Purchase Buttons */}
      <div className="grid w-full grid-cols-2 gap-2.5 sm:flex sm:items-center sm:gap-3">

        <button
          type="button"
          onClick={handleBuyNow}
          className="flex h-14 min-w-0 items-center justify-center rounded-full bg-black px-3 text-[10px] uppercase tracking-[0.15em] text-white transition-all hover:bg-[#966B4E] sm:flex-[2] sm:px-5 sm:text-[12px] sm:tracking-[0.2em]"
        >
          Buy Now
        </button>

        <button
          type="button"
          onClick={() => addToCart(product, qty)}
          className="flex h-14 min-w-0 items-center justify-center gap-2 rounded-full border border-black px-2 text-[10px] font-bold uppercase tracking-[0.08em] transition-all hover:bg-black hover:text-white sm:flex-[2] sm:gap-2 sm:px-5 sm:text-[12px] sm:tracking-[0.15em]"
        >
          <ShoppingBag size={16} className="shrink-0" />
          <span className="whitespace-nowrap">Add to Cart</span>
        </button>

      </div>
    </div>
  );
}
