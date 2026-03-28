  "use client";
  import { useCartStore } from "@/store/useCartStore";
  import { ChevronLeft, CreditCard, Truck, ShieldCheck, Loader2 } from "lucide-react";
  import Link from "next/link";
  import { useState, useEffect } from "react";
  import { useSession } from "next-auth/react";

  export default function CheckoutPage() {
    const { data: session } = useSession();
    const { cart, getCartTotal } = useCartStore();
    const subtotal = getCartTotal();
    const shipping = 0; 
    const total = subtotal + shipping;

    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState("card");
    
    // State for Form Data (Auto-filled from Profile)
    const [formData, setFormData] = useState({
      email: "",
      name: "",
      phone: "",
      address: "",
      city: "",
      zip: ""
    });

    // State for Saved Card (from DB)
    const [savedCard, setSavedCard] = useState(null);

    useEffect(() => {
      const loadProfile = async () => {
        try {
          const res = await fetch("/api/user/profile");
          if (res.ok) {
            const data = await res.json();
            setFormData({
              email: session?.user?.email || "",
              name: data.name || "",
              phone: data.phone || "",
              address: data.delivery_address || "",
              city: data.city || "",
              zip: data.postal_code || ""
            });

            // Check if a saved card exists in the DB
            if (data.card_last4) {
              setSavedCard({
                brand: data.card_brand,
                last4: data.card_last4
              });
            }
          }
        } catch (error) {
          console.error("Failed to load checkout details:", error);
        } finally {
          setLoading(false);
        }
      };

      if (session) loadProfile();
    }, [session]);

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
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-black/5">
                <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <input 
                    type="email" 
                    value={formData.email}
                    disabled
                    placeholder="Email Address"
                    className="w-full px-5 py-4 bg-gray-50 rounded-xl text-sm text-black/40 cursor-not-allowed border border-transparent"
                  />
                  <input 
                    placeholder="Full Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-4 bg-white border border-black/10 focus:border-black rounded-xl text-sm outline-none transition-all" 
                  />
                </div>
              </section>

              {/* Shipping Section */}
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-black/5">
                <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] mb-6">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    placeholder="Address" 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="col-span-2 px-5 py-4 bg-white border border-black/10 focus:border-black rounded-xl text-sm outline-none transition-all" 
                  />
                  <input 
                    placeholder="City" 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="col-span-1 px-5 py-4 bg-white border border-black/10 focus:border-black rounded-xl text-sm outline-none transition-all" 
                  />
                  <input 
                    placeholder="Postal Code" 
                    value={formData.zip}
                    onChange={(e) => setFormData({...formData, zip: e.target.value})}
                    className="col-span-1 px-5 py-4 bg-white border border-black/10 focus:border-black rounded-xl text-sm outline-none transition-all" 
                  />
                  <input 
                    placeholder="Phone Number" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="col-span-2 px-5 py-4 bg-white border border-black/10 focus:border-black rounded-xl text-sm outline-none transition-all" 
                  />
                </div>
              </section>

              {/* Payment Section */}
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-black/5">
                <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] mb-6">Payment Method</h2>
                <div className="space-y-4">
                  <label className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-black bg-black/5 shadow-sm' : 'border-gray-50'}`}>
                    <div className="flex items-center gap-4">
                      <input type="radio" name="payment" className="hidden" onChange={() => setPaymentMethod('card')} checked={paymentMethod === 'card'} />
                      <CreditCard size={20} />
                      <span className="text-sm font-bold uppercase tracking-widest">Credit / Debit Card</span>
                    </div>
                  </label>

                  <label className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-black bg-black/5 shadow-sm' : 'border-gray-50'}`}>
                    <div className="flex items-center gap-4">
                      <input type="radio" name="payment" className="hidden" onChange={() => setPaymentMethod('cod')} />
                      <Truck size={20} />
                      <span className="text-sm font-bold uppercase tracking-widest">Cash on Delivery</span>
                    </div>
                  </label>
                </div>

                {/* CARD DETAILS OR SAVED CARD */}
                {paymentMethod === 'card' && (
                  <div className="mt-6 p-8 bg-[#F6F6F6] rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-2">
                    {savedCard ? (
                      <div className="bg-white p-5 rounded-xl border border-black/10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-7 bg-black text-white text-[8px] font-bold rounded flex items-center justify-center uppercase">{savedCard.brand}</div>
                          <p className="text-sm font-bold tracking-widest">•••• •••• •••• {savedCard.last4}</p>
                        </div>
                        <button className="text-[10px] font-bold uppercase text-black/40 hover:text-black">Use Different Card</button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <input placeholder="Card Number" className="w-full px-5 py-4 bg-white rounded-xl text-sm border border-black/5" />
                        <div className="grid grid-cols-2 gap-4">
                          <input placeholder="MM / YY" className="px-5 py-4 bg-white rounded-xl text-sm border border-black/5" />
                          <input placeholder="CVC" className="px-5 py-4 bg-white rounded-xl text-sm border border-black/5" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </section>
            </div>

            {/* RIGHT: Order Summary Section */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
              <div className="bg-white p-10 rounded-[40px] shadow-sm border border-black/5">
                <h2 className="font-cinzel text-lg font-bold uppercase tracking-widest mb-10 text-center">Your Order</h2>
                
                <div className="space-y-6 max-h-[300px] overflow-y-auto mb-10 pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-5">
                      <div className="w-20 h-20 bg-[#F6F6F6] rounded-2xl flex-shrink-0 overflow-hidden flex items-center justify-center">
                        <img src={item.image_url} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <p className="text-[11px] font-bold uppercase tracking-[0.15em] leading-tight mb-2">{item.name}</p>
                        <p className="text-[11px] text-black/40 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                      </div>
                      <div className="flex items-center font-bold text-sm">
                        Rs. {(item.price_lkr * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-10 border-t border-black/5">
                  <div className="flex justify-between text-[12px] font-bold uppercase tracking-widest text-black/40">
                    <span>Subtotal</span>
                    <span className="text-black">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[12px] font-bold uppercase tracking-widest text-black/40">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between pt-10 border-t border-black/5">
                    <span className="font-bold text-lg uppercase tracking-[0.2em]">Total</span>
                    <span className="font-bold text-2xl">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                <button className="w-full mt-12 py-6 bg-black text-white rounded-[20px] font-bold uppercase text-[12px] tracking-[0.3em] hover:opacity-90 transition shadow-2xl shadow-black/20 flex items-center justify-center gap-3">
                  <ShieldCheck size={20} /> Place Order
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }