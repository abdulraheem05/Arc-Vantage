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

  // Auto-play logic
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
      x: direction > 0 ? 20 : -20,
      opacity: 0,
      filter: "blur(4px)"
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: "blur(0px)"
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 20 : -20,
      opacity: 0,
      filter: "blur(4px)"
    })
  };

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-16 md:py-20 mb-10">
      {/* HEADER - CENTERED & TIGHT */}
      <div className="flex flex-col items-center text-center mb-12">
        <h4 className="text-[#966B4E] font-bold tracking-[0.25em] uppercase text-[10px] mb-3">
          Customer Love
        </h4>
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-black mb-4">
          Customer Reviews.
        </h2>
        <p className="text-gray-500 text-sm max-w-md">
          Short, honest feedback—shown one by one like a calm product story.
        </p>
        
        <div className="flex items-center gap-3 mt-6">
          <button 
            onClick={() => paginate(-1)}
            className="p-2 rounded-full border border-black/10 hover:bg-black hover:text-white transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={() => paginate(1)}
            className="p-2 rounded-full border border-black/10 hover:bg-black hover:text-white transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch max-w-[1100px] mx-auto">
        
        {/* MAIN FEATURED CARD */}
        <div className="lg:col-span-2 relative rounded-[2.5rem] border border-black/[0.06] bg-white p-8 md:p-12 overflow-hidden shadow-sm">
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(150,107,78,0.03),transparent_50%)]" />
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-8">
              Featured Review
            </div>

            <div className="relative overflow-hidden min-h-[140px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <blockquote className="text-xl md:text-2xl text-slate-900 font-medium leading-relaxed italic">
                    “{reviews[index].text}”
                  </blockquote>

                  <div className="mt-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-400 text-xs">
                        {reviews[index].name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{reviews[index].name}</p>
                        <p className="text-slate-500 text-[11px] uppercase tracking-wide">{reviews[index].role}</p>
                      </div>
                    </div>
                    <Stars rating={reviews[index].rating} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="mt-10 flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === index ? "w-8 bg-black" : "w-1.5 bg-black/10"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* SIDE STACK */}
        <div className="flex flex-col gap-4">
          <MiniReview label="Up next" item={reviews[(index + 1) % reviews.length]} />
          <MiniReview label="Then" item={reviews[(index + 2) % reviews.length]} />
        </div>
      </div>
    </section>
  );
}

function MiniReview({ label, item }) {
  return (
    <div className="rounded-[2rem] border border-black/[0.05] bg-slate-50/30 p-6 flex-grow flex flex-col justify-between">
      <div>
        <div className="text-[8px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-3">{label}</div>
        <p className="text-slate-800 text-sm font-medium line-clamp-3 italic leading-relaxed">“{item.text}”</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-900">{item.name}</span>
        <Stars rating={item.rating} small />
      </div>
    </div>
  );
}

function Stars({ rating, small = false }) {
  const size = small ? 10 : 14;
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < rating ? "#966B4E" : "none"}
          className={i < rating ? "text-[#966B4E]" : "text-gray-200"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 17.27l5.18 3.05-1.39-5.81L20.5 9.5l-6-.5L12 3.5 9.5 9l-6 .5 4.71 5.01-1.39 5.81L12 17.27z" />
        </svg>
      ))}
    </div>
  );
}