"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function LatestInStore({ products }) {
  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextStep();
    }, 3000);
    return () => clearInterval(timer);
  }, [index]);

  const nextStep = () => {
    setIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const prevStep = () => {
    setIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      {/* Header Area - Tightened margins */}
      <div className="max-w-[1400px] mx-auto px-6 mb-10 flex flex-col items-center text-center">
        <span className="text-[#966B4E] text-[10px] tracking-[0.4em] uppercase font-bold mb-2 block">
          Curated Selection
        </span>
        <h2 className="font-cinzel text-3xl md:text-4xl font-bold tracking-tight text-black">
          Latest In Store
        </h2>
      </div>

      {/* Slider Container - Reduced height to 450px-500px */}
      <div className="relative flex items-center justify-center h-[520px] w-full">
        
        {/* Navigation Arrows - Moved closer to the edges */}
        <div className="absolute inset-x-0 top-[40%] -translate-y-1/2 z-30 flex justify-between px-4 max-w-[1200px] mx-auto pointer-events-none">
          <button onClick={prevStep} className="p-3 rounded-full bg-white/90 backdrop-blur-sm border border-black/5 shadow-lg pointer-events-auto hover:bg-black hover:text-white transition-all">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextStep} className="p-3 rounded-full bg-white/90 backdrop-blur-sm border border-black/5 shadow-lg pointer-events-auto hover:bg-black hover:text-white transition-all">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* The Carousel Track */}
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence mode="popLayout" initial={false}>
            <div className="flex gap-0 items-center justify-center relative w-full">
              {products.map((product, i) => {
                const isCenter = i === index;
                const isLeft = i === (index - 1 + products.length) % products.length;
                const isRight = i === (index + 1) % products.length;

                if (!isCenter && !isLeft && !isRight) return null;

                return (
                  <motion.div
                    key={product.id}
                    style={{ position: isCenter ? 'relative' : 'absolute' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: isCenter ? 1 : 0.9,
                      scale: isCenter ? 1 : 0.75,
                      zIndex: isCenter ? 20 : 10,
                      // These X values control how far apart the "ghost" images are
                      x: isCenter ? 0 : isLeft ? -350 : 350, 
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    className="w-[280px] md:w-[320px]"
                  >
                    <ProductCard product={product} isCenter={isCenter} />
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination - Smaller footprint */}
      <div className="flex justify-center gap-2 mt-4">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="w-6 h-6 flex items-center justify-center group"
          >
            <motion.div 
              animate={{ 
                width: index === i ? 12 : 6,
                height: 6,
                backgroundColor: index === i ? "#000" : "#D1D1D1" 
              }}
              className="rounded-full transition-all"
            />
          </button>
        ))}
      </div>
    </section>
  );
}