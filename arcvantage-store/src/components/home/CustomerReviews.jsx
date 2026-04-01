"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CustomerReviews() {
  const reviews = useMemo(() => [
    {
      name: "Nethmi Perera",
      role: "Home Baker",
      rating: 5,
      text: "The baking tray feels premium and sturdy. The finish is clean, and it heats evenly—exactly what I wanted for minimal kitchens.",
    },
    {
      name: "Ishara Fernando",
      role: "Meal Prep Enthusiast",
      rating: 5,
      text: "The jars are genuinely airtight. My spices stay fresh and the marble lid looks super elegant on the counter.",
    },
    {
      name: "Mihiranga Silva",
      role: "Cooking Daily",
      rating: 4,
      text: "The wok is lightweight but solid. The handle grip feels comfortable and the shape is perfect for quick stir-fry.",
    },
    {
      name: "Sajini Jayawardena",
      role: "Minimal Home Setup",
      rating: 5,
      text: "ARC VANTAGE nailed the aesthetic—everything looks calm and premium. Packaging was also neat and minimal.",
    },
  ], []);

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = reviews.length - 1;
      if (nextIndex >= reviews.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
      filter: "blur(8px)"
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: "blur(0px)"
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 30 : -30,
      opacity: 0,
      filter: "blur(8px)"
    })
  };

  return (
    <section className="max-w-full mx-auto px-4 md:px-8 py-16 mb-20">
      {/* HEADER */}
      <div className="flex flex-col items-center text-center mb-12">
        
        <h2 className="font-display text-4xl font-semibold tracking-tight text-black mb-4 uppercase">
          Customer Reviews.
        </h2>
        
        <div className="flex items-center gap-4 mt-4">
          <button 
            onClick={() => paginate(-1)}
            className="p-2.5 rounded-full border border-[#966B4E]/20 text-[#966B4E] hover:bg-[#966B4E] hover:text-white transition-all shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => paginate(1)}
            className="p-2.5 rounded-full border border-[#966B4E]/20 text-[#966B4E] hover:bg-[#966B4E] hover:text-white transition-all shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* GRID LAYOUT - max-w-full removes the artificial side space */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch max-w-[1300px] mx-auto">
        
        {/* MAIN FEATURED CARD */}
        <div className="lg:col-span-8 relative rounded-[2.5rem] border border-[#966B4E]/10 bg-white p-8 md:p-14 overflow-hidden shadow-[0_10px_60px_-10px_rgba(0,0,0,0.30)]">
          {/* Soft Brown Gradient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(150,107,78,0.05),transparent_60%)]" />
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="text-[15px] uppercase tracking-[0.1em] text-[#966B4E]/60 font-bold mb-10">
              Featured Experience
            </div>

            <div className="relative min-h-[160px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <blockquote className="text-2xl md:text-3xl text-slate-900 font-medium leading-snug italic font-serif">
                    “{reviews[index].text}”
                  </blockquote>

                  <div className="mt-12 flex items-center justify-between border-t border-[#966B4E]/5 pt-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#FCF8F5] border border-[#966B4E]/10 flex items-center justify-center font-bold text-[#966B4E] text-sm shadow-inner">
                        {reviews[index].name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-base">{reviews[index].name}</p>
                        <p className="text-[#966B4E]/60 text-[11px] uppercase tracking-widest font-semibold">{reviews[index].role}</p>
                      </div>
                    </div>
                    <Stars rating={reviews[index].rating} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* SIDE STACK - Better fit with the grid */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <MiniReview label="Next Story" item={reviews[(index + 1) % reviews.length]} />
          <MiniReview label="Coming Up" item={reviews[(index + 2) % reviews.length]} />
        </div>
      </div>
    </section>
  );
}

function MiniReview({ label, item }) {
  return (
    <div className="rounded-[2rem] border border-[#966B4E]/10 bg-[#FCF8F5]/50 p-7 flex-grow flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-500">
      <div>
        <div className="text-[9px] uppercase tracking-[0.2em] text-[#966B4E]/50 font-bold mb-4">{label}</div>
        <p className="text-slate-800 text-[15px] font-medium italic leading-relaxed line-clamp-3">“{item.text}”</p>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-[#966B4E]/5 pt-4">
        <span className="text-xs font-bold text-slate-900">{item.name}</span>
        <Stars rating={item.rating} small />
      </div>
    </div>
  );
}

function Stars({ rating, small = false }) {
  const size = small ? 12 : 16;
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < rating ? "#966B4E" : "none"}
          className={i < rating ? "text-[#966B4E]" : "text-gray-200"}
          stroke={i < rating ? "#966B4E" : "currentColor"}
          strokeWidth="1.5"
        >
          <path d="M12 17.27l5.18 3.05-1.39-5.81L20.5 9.5l-6-.5L12 3.5 9.5 9l-6 .5 4.71 5.01-1.39 5.81L12 17.27z" />
        </svg>
      ))}
    </div>
  );
}