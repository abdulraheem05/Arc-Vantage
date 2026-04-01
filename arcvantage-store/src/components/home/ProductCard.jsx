"use client";
import { motion } from "framer-motion";
import Link from "next/link";

// Add isCenter to the props
export default function ProductCard({ product, isCenter }) {
  return (
    <motion.div 
      className="group relative"
      // Disable the manual hover lift if it's not the center card
      animate={{ 
        y: isCenter ? 0 : 20,
        filter: isCenter ? "grayscale(0%)" : "grayscale(100%)",
        opacity: isCenter ? 1 : 0.5
      }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
    >
      <Link href={`/product/${product.slug}`}>
        {/* Image Frame */}
        <div className={`relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-[#F7F7F7] border border-black/5 transition-all duration-700 ${
          isCenter ? "shadow-2xl scale-100" : "shadow-sm scale-95"
        }`}>
          <motion.img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
            // Zoom only works if it's the center card
            whileHover={isCenter ? { scale: 1.08 } : {}}
            transition={{ duration: 0.8 }}
          />

          {/* Floating Tag */}
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full shadow-sm">
            <span className="text-[9px] font-bold tracking-widest text-black uppercase">New</span>
          </div>

          {/* Slide-up View Button - Only visible on center card hover */}
          <div className={`absolute inset-x-0 bottom-0 p-6 transition-transform duration-500 ease-out ${
            isCenter ? "group-hover:translate-y-0" : "translate-y-full"
          } translate-y-full`}>
            <div className="w-full bg-black text-white py-4 rounded-2xl text-[11px] font-bold tracking-[0.2em] uppercase text-center shadow-2xl">
              Quick View
            </div>
          </div>
        </div>

        {/* Content Area - Only show full color when centered */}
        <div className={`mt-8 px-2 text-center transition-all duration-500 ${
          isCenter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <h3 className="font-poppins text-[16px] font-semibold text-black tracking-tight">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="text-[15px] font-bold text-[#966B4E]">
              Rs. {Number(product.price_lkr).toLocaleString()}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}