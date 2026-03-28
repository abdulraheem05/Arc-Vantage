"use client";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    // Clear the zustand store so the mini-cart empties out
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center px-6 pt-20">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-xl w-full bg-white p-12 rounded-[50px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-black/5 text-center space-y-8"
      >
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center shadow-2xl shadow-black/20">
            <CheckCircle size={40} />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="font-cinzel text-3xl font-bold uppercase tracking-[0.3em]">Success</h1>
          <p className="text-black/40 text-[11px] uppercase tracking-[0.2em] font-bold leading-relaxed max-w-xs mx-auto">
            Your order has been placed successfully. Check your email for a confirmation receipt.
          </p>
        </div>

        <div className="pt-6 flex flex-col gap-4">
          <Link 
            href="/shop" 
            className="w-full py-6 bg-black text-white rounded-[24px] font-bold uppercase text-[12px] tracking-[0.3em] hover:opacity-90 transition shadow-xl flex items-center justify-center gap-3"
          >
            Continue Shopping <ArrowRight size={16} />
          </Link>
          
          <Link 
            href="/account" 
            className="w-full py-6 border-2 border-black/5 text-black rounded-[24px] font-bold uppercase text-[11px] tracking-[0.3em] hover:bg-black/5 transition flex items-center justify-center gap-3"
          >
            <ShoppingBag size={16} /> View My Orders
          </Link>
        </div>
      </motion.div>
    </div>
  );
}