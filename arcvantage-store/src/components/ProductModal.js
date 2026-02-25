"use client";
import { X, Star, Heart, ShoppingBag, Zap } from "lucide-react";

export default function ProductModal({ product, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      {/* Background Blur Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose} />

      {/* Modal Rectangle */}
      <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[32px] shadow-2xl grid grid-cols-1 md:grid-cols-2">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white transition shadow-sm">
          <X size={20} />
        </button>

        {/* Left: Image Section */}
        <div className="bg-[#F6F6F6] flex items-center justify-center p-8">
          <img src={product.image_url} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
        </div>

        {/* Right: Info Section */}
        <div className="p-8 md:p-12 overflow-y-auto flex flex-col">
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-[11px] font-bold tracking-[0.2em] text-[#966B4E] uppercase">{product.brand || 'Arcvantage'}</p>
                <h2 className="font-cinzel text-3xl font-bold leading-tight">{product.name}</h2>
              </div>
              <button className="group p-3 border border-black/10 rounded-full hover:border-red-200 hover:bg-red-50 transition">
                <Heart size={20} className="group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
              </button>
            </div>

            {/* Seller & Rating Bar */}
            <div className="flex items-center gap-6 mt-6 py-4 border-y border-black/5">
              <div className="flex items-center gap-1.5 text-yellow-500">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-bold text-black">{product.seller_rating || '4.8'}</span>
              </div>
              <div className="text-[12px] font-semibold text-black/40 uppercase tracking-widest">
                Sold by <span className="text-black underline decoration-black/10">{product.seller_name || 'Arcvantage Store'}</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-3xl font-bold">Rs. {Number(product.price_lkr).toLocaleString()}</h3>
              <div className="mt-6 space-y-4">
                <p className="text-black/60 text-[14px] leading-relaxed">
                  {product.detailed_description || product.description}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-4 border-2 border-black rounded-2xl font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-black hover:text-white transition-all">
              <ShoppingBag size={18} /> Add to Cart
            </button>
            <button className="flex items-center justify-center gap-2 py-4 bg-black text-white rounded-2xl font-bold uppercase text-[11px] tracking-[0.2em] hover:opacity-90 transition-all shadow-lg shadow-black/20">
              <Zap size={18} fill="currentColor" /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}