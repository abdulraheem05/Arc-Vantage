"use client";
import { useCartStore } from "@/store/useCartStore";
import { Minus, Plus, X, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCartStore();
  const subtotal = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <ShoppingBag size={64} className="text-black/5 mb-6" />
        <h1 className="font-cinzel text-2xl font-bold mb-8 uppercase tracking-widest">Your cart is empty</h1>
        <Link href="/shop" className="px-8 py-4 bg-black text-white rounded-full font-bold uppercase text-[12px] tracking-widest hover:scale-105 hover:bg-[#966B4E] transition">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-40 pb-20">
      <main className="max-w-[1400px] mx-auto px-10">
        <h1 className="font-cinzel text-3xl font-bold uppercase tracking-[0.1em] mb-12">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Table Section */}
          <div className="lg:col-span-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/5 text-[11px] font-bold uppercase tracking-[0.1em] text-black/40">
                  <th className="pb-6">Product</th>
                  <th className="pb-6">Price</th>
                  <th className="pb-6">Quantity</th>
                  <th className="pb-6 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {cart.map((item) => (
                  <tr key={item.id} className="group">
                    <td className="py-8 flex items-center gap-6">
                      <button onClick={() => removeFromCart(item.id)} className="p-2 rounded-full text-black/60 hover:bg-black/10 hover:scale-110 hover:text-black/90 transition-all duration-200 flex items-center justify-center"><X size={18} /></button>
                      <img src={item.image_url} className="w-24 h-24 bg-gray-50 rounded-2xl object-cover" />
                      <span className="font-bold text-sm uppercase tracking-wider">{item.name}</span>
                    </td>
                    <td className="py-8 text-sm font-medium">Rs. {Number(item.price_lkr).toLocaleString()}</td>
                    <td className="py-8">
                      <div className="flex items-center border border-black/10 rounded-lg w-fit">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-2 hover:text-[#966B4E]"><Minus size={14} /></button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-2 hover:text-[#966B4E]"><Plus size={14} /></button>
                      </div>
                    </td>
                    <td className="py-8 text-right font-bold text-sm">Rs. {(item.price_lkr * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="lg:col-span-4 h-fit sticky top-40">
            <div className="bg-[#F9F9F9] rounded-[32px] p-10">
              <h2 className="font-cinzel text-xl font-bold uppercase tracking-widest mb-8 text-center">Order Summary</h2>
              <div className="space-y-4 border-b border-black/5 pb-8">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-black/40 uppercase tracking-widest">Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-black/40 uppercase tracking-widest">Shipping</span>
                  <span className="text-green-600 font-bold uppercase tracking-widest text-[10px]">Free</span>
                </div>
              </div>
              <div className="flex justify-between py-8">
                <span className="font-bold text-lg uppercase tracking-widest">Total</span>
                <span className="font-bold text-lg">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <Link href="/checkout" className="flex items-center justify-center gap-3 w-full py-5 bg-black text-white rounded-2xl font-bold uppercase text-[12px] tracking-[0.2em] hover:opacity-90 transition">
                Proceed to Checkout <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}