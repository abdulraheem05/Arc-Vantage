"use client";
import { useCartStore } from "@/store/useCartStore";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function MiniCart() {
  const { cart, isCartOpen, closeCart, removeFromCart, getCartTotal } = useCartStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          
          {/* 1. Smooth Dark Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/60"
            onClick={closeCart}
          />
          
          {/* 2. Sideways Sliding Panel */}
          <motion.div
            initial={{ x: "100%" }} // Start off-screen to the right
            animate={{ x: 0 }}      // Slide into view
            exit={{ x: "100%" }}    // Slide back out
            transition={{ type: "spring", damping: 25, stiffness: 200 }} // Smooth spring feel
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-8 py-7 border-b border-black/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} />
                <h2 className="font-cinzel text-[16px] font-bold tracking-[0.1em] uppercase">Your Cart</h2>
                <span className="text-[12px] bg-black text-white w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cart.length}
                </span>
              </div>
              <button 
                onClick={closeCart} 
                className="p-2 rounded-full text-black/60 hover:bg-black/12 hover:text-black hover:scale-110 transition-all duration-200 flex items-center justify-center group"
              >
                <X size={20} className="transition-transform group-active:scale-95" />
              </button>
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-30">
                    <ShoppingBag size={48} strokeWidth={1} />
                    <p className="text-[11px] uppercase tracking-[0.2em] font-bold">Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-5 group">
                    <div className="w-24 h-24 bg-[#F6F6F6] rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={item.image_url} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start">
                        <h4 className="text-[12px] font-bold uppercase tracking-wider leading-tight max-w-[150px]">{item.name}</h4>
                        <button 
                            onClick={() => removeFromCart(item.id)} 
                            className="text-black/40 hover:text-red-500 transition-colors"
                        >
                            <Trash2 size={22} />
                        </button>
                      </div>
                      <p className="text-[13px] font-semibold mt-2">Rs. {Number(item.price_lkr).toLocaleString()}</p>
                      <p className="text-[11px] text-black/40 mt-1 uppercase tracking-widest font-bold">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 bg-[#F9F9F9] border-t border-black/5">
                <div className="flex justify-between items-center mb-8">
                  <span className="font-bold text-[12px] uppercase tracking-[0.2em] text-black/40">Subtotal:</span>
                  <span className="font-bold text-[18px]">Rs. {getCartTotal().toLocaleString()}</span>
                </div>
                
                <div className="space-y-3">
                  <Link 
                    href="/cart" 
                    onClick={closeCart} 
                    className="block w-full text-center py-4 bg-black text-white rounded-full font-bold uppercase text-[11px] tracking-[0.2em] hover:scale-103 hover:bg-[#966B4E] transition shadow-lg shadow-black/10"
                  >
                    Checkout Now
                  </Link>
                  <Link 
                    href="/cart" 
                    onClick={closeCart} 
                    className="block w-full text-center py-4 border border-black rounded-full font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-black hover:scale-105 hover:text-white transition"
                  >
                    View Cart
                  </Link>
                  <button 
                    onClick={closeCart} 
                    className="w-full text-center py-2 text-[12px] font-bold uppercase tracking-[0.1em] text-black/80 hover:text-[#966B4E] transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}