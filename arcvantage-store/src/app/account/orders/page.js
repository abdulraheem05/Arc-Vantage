"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ShoppingBag, ChevronLeft, Package, Calendar, Tag, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetch("/api/user/orders")
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Order fetch error:", err);
          setLoading(false);
        });
    }
  }, [session]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <Loader2 className="animate-spin text-black" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-20 text-black">
      <main className="max-w-5xl mx-auto px-6">
        
        {/* CENTERED HEADER */}
        <div className="mb-16 flex flex-col items-center text-center">
          <Link href="/account" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 hover:text-black transition-all mb-4">
            <ChevronLeft size={16} /> Back to Dashboard
          </Link>
          <h1 className="font-cinzel text-4xl font-bold uppercase tracking-[0.2em]">Order History</h1>
          <div className="w-12 h-[2px] bg-[#966B4E] my-4"></div> {/* Decorative line */}
          <p className="text-[12px] font-bold text-black/30 uppercase tracking-widest">
            {orders.length} Total Placements
          </p>
        </div>

        {/* ORDERS LIST */}
        <div className="space-y-10">
          {orders.length > 0 ? (
            orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={order.id} 
                className="bg-white rounded-[32px] overflow-hidden border border-black/5 shadow-lg hover:shadow-xl transition-all"
              >
                {/* Order Meta Header - Increased Text Sizes */}
                <div className="bg-black/[0.02] p-10 border-b border-black/5 flex flex-wrap justify-between items-center gap-8">
                  <div className="flex gap-16">
                    <div>
                      <p className="text-[11px] font-bold text-black/30 uppercase tracking-widest mb-2">Order Reference</p>
                      <p className="text-base font-bold font-mono tracking-tight">#AV-{order.id.slice(-8).toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-black/30 uppercase tracking-widest mb-2">Date Placed</p>
                      <p className="text-base font-bold uppercase tracking-tight">{new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-[11px] font-bold text-black/30 uppercase tracking-widest mb-2">Total Amount</p>
                      <p className="text-2xl font-bold text-[#966B4E] font-cinzel">Rs. {Number(order.total).toLocaleString()}</p>
                    </div>
                    <span className={`px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest shadow-sm ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items List - Increased Text Sizes */}
                <div className="p-10 space-y-8">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex items-center gap-8 group">
                      <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-gray-50 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-24 h-24 object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[16px] font-bold uppercase tracking-widest leading-tight">{item.name}</h4>
                        <p className="text-[12px] text-black/50 mt-2 font-bold uppercase tracking-[0.15em]">Quantity: {item.quantity}</p>
                      </div>
                      <Link 
                        href={`/product/${item.slug}`} 
                        className="p-4 bg-gray-50 text-black/30 hover:text-white hover:bg-black rounded-full transition-all"
                      >
                        <ExternalLink size={20} />
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Footer Action */}
                <div className="px-10 py-6 bg-gray-50/50 border-t border-black/5 flex justify-end">
                   <button className="text-[11px] font-bold uppercase tracking-[0.3em] text-black/50 hover:text-black transition-colors underline underline-offset-8 decoration-black/10 hover:decoration-black">
                     Download Digital Invoice
                   </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-[32px] py-32 text-center border-2 border-dashed border-black/5">
              <ShoppingBag className="mx-auto text-black/10 mb-6" size={64} strokeWidth={1} />
              <h2 className="font-cinzel text-xl font-bold uppercase tracking-widest">No Orders Yet</h2>
              <p className="text-black/40 text-sm mt-2 mb-8 uppercase tracking-widest">Your curated collection will appear here once you make a purchase.</p>
              <Link href="/shop" className="px-10 py-4 bg-black text-white rounded-full text-[12px] font-bold uppercase tracking-widest hover:bg-[#966B4E] transition-all">
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}