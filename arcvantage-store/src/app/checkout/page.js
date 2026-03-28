"use client";
import { useCartStore } from "@/store/useCartStore";
import { ChevronLeft, CreditCard, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, getCartTotal } = useCartStore();
  const subtotal = getCartTotal();
  const shipping = 0; // You can make this dynamic based on location later
  const total = subtotal + shipping;

  const [paymentMethod, setPaymentMethod] = useState("card");

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="font-cinzel text-xl mb-4">Your cart is empty</h1>
        <Link href="/shop" className="underline uppercase tracking-widest text-sm">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] pt-32 pb-20">
      <main className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Shipping & Payment Form */}
          <div className="lg:col-span-7 space-y-8">
            <Link href="/cart" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition">
              <ChevronLeft size={14} /> Back to Cart
            </Link>

            {/* Contact Section */}
            <section className="bg-white p-8 rounded-3xl shadow-sm">
              <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] mb-6">Contact Information</h2>
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full px-5 py-4 bg-[#F6F6F6] rounded-xl focus:outline-none focus:ring-1 focus:ring-black/10 text-sm"
              />
            </section>

            {/* Shipping Section */}
            <section className="bg-white p-8 rounded-3xl shadow-sm">
              <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] mb-6">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="First Name" className="col-span-1 px-5 py-4 bg-[#F6F6F6] rounded-xl text-sm" />
                <input placeholder="Last Name" className="col-span-1 px-5 py-4 bg-[#F6F6F6] rounded-xl text-sm" />
                <input placeholder="Address" className="col-span-2 px-5 py-4 bg-[#F6F6F6] rounded-xl text-sm" />
                <input placeholder="City" className="col-span-1 px-5 py-4 bg-[#F6F6F6] rounded-xl text-sm" />
                <input placeholder="Postal Code" className="col-span-1 px-5 py-4 bg-[#F6F6F6] rounded-xl text-sm" />
                <input placeholder="Phone Number" className="col-span-2 px-5 py-4 bg-[#F6F6F6] rounded-xl text-sm" />
              </div>
            </section>

            {/* Payment Section */}
            <section className="bg-white p-8 rounded-3xl shadow-sm">
              <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] mb-6">Payment Method</h2>
              <div className="space-y-4">
                <label className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-black bg-black/5' : 'border-gray-100'}`}>
                  <div className="flex items-center gap-4">
                    <input type="radio" name="payment" className="hidden" onChange={() => setPaymentMethod('card')} checked={paymentMethod === 'card'} />
                    <CreditCard size={20} />
                    <span className="text-sm font-bold uppercase tracking-widest">Credit / Debit Card</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-300 rounded"></div>
                  </div>
                </label>

                <label className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-black bg-black/5' : 'border-gray-100'}`}>
                  <div className="flex items-center gap-4">
                    <input type="radio" name="payment" className="hidden" onChange={() => setPaymentMethod('cod')} />
                    <Truck size={20} />
                    <span className="text-sm font-bold uppercase tracking-widest">Cash on Delivery</span>
                  </div>
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="mt-6 p-6 bg-[#F6F6F6] rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <input placeholder="Card Number" className="w-full px-5 py-4 bg-white rounded-xl text-sm" />
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="MM / YY" className="px-5 py-4 bg-white rounded-xl text-sm" />
                    <input placeholder="CVC" className="px-5 py-4 bg-white rounded-xl text-sm" />
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT: Order Summary Section */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <div className="bg-white p-8 rounded-[32px] shadow-sm">
              <h2 className="font-cinzel text-lg font-bold uppercase tracking-widest mb-8 text-center">Your Order</h2>
              
              {/* Items List */}
              <div className="space-y-6 max-h-[300px] overflow-y-auto mb-8 pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-[#F6F6F6] rounded-xl flex-shrink-0 overflow-hidden">
                      <img src={item.image_url} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="text-[11px] font-bold uppercase tracking-wider">{item.name}</p>
                      <p className="text-[11px] text-black/40 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex items-center font-bold text-sm">
                      Rs. {(item.price_lkr * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-4 pt-6 border-t border-black/5">
                <div className="flex justify-between text-sm">
                  <span className="text-black/40 uppercase tracking-widest">Subtotal</span>
                  <span className="font-bold">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black/40 uppercase tracking-widest">Shipping</span>
                  <span className="text-green-600 font-bold uppercase tracking-widest text-[10px]">Free</span>
                </div>
                <div className="flex justify-between pt-6 border-t border-black/5">
                  <span className="font-bold text-lg uppercase tracking-widest">Total</span>
                  <span className="font-bold text-2xl">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full mt-10 py-5 bg-black text-white rounded-2xl font-bold uppercase text-[12px] tracking-[0.2em] hover:opacity-90 transition shadow-xl shadow-black/20 flex items-center justify-center gap-3">
                <ShieldCheck size={18} /> Place Order
              </button>
              
              <p className="mt-6 text-[10px] text-center text-black/30 uppercase tracking-[0.1em] leading-relaxed">
                Your personal data will be used to process your order and for other purposes described in our privacy policy.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}