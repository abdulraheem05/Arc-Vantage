"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react"; // Make sure to install lucide-react

export default function ArrivalCard({ title, img }) {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <motion.div 
      variants={itemVariants} 
      className="group cursor-pointer relative"
    >
      {/* Main Tile Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-black/5">        
        {/* Background Image with Zoom */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
            // Move whileHover here
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          />
        </div>

        {/* 1. Bottom Gradient Overlay (Increased height for legibility) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 pointer-events-none" />

        {/* 2. Text & Icon Wrapper (Positioned Inside) */}
        <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
          
          <div className="flex flex-col gap-1">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/60 font-medium">
              Explore
            </span>
            <h3 className="text-xl font-bold tracking-tight text-white">
              {title}
            </h3>
          </div>

          {/* 3. Glossy Blurred Circle with Arrow */}
          <div className="relative flex items-center justify-center">
            <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:bg-[#966B4E] group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(150,107,78,0.4)]">
              <ArrowRight 
                size={18} 
                className="text-white transform group-hover:translate-x-1 transition-transform duration-300" 
              />
            </div>
            
            {/* Subtle Outer Glow Ring on Hover */}
            <div className="absolute inset-0 rounded-full bg-white/5 scale-0 group-hover:scale-125 transition-transform duration-700 blur-xl" />
          </div>

        </div>

        {/* Very subtle inner border/shine for 3D depth */}
        <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 pointer-events-none" />
      </div>
    </motion.div>
  );
}