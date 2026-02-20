"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CustomerReviews() {
  const reviews = useMemo(
    () => [
      {
        name: "Nethmi Perera",
        role: "Home Baker",
        rating: 5,
        text:
          "The baking tray feels premium and sturdy. The finish is clean, and it heats evenly—exactly what I wanted for minimal kitchens.",
      },
      {
        name: "Ishara Fernando",
        role: "Meal Prep Enthusiast",
        rating: 5,
        text:
          "The jars are genuinely airtight. My spices stay fresh and the marble lid looks super elegant on the counter.",
      },
      {
        name: "Mihiranga Silva",
        role: "Cooking Daily",
        rating: 4,
        text:
          "The wok is lightweight but solid. The handle grip feels comfortable and the shape is perfect for quick stir-fry.",
      },
      {
        name: "Sajini Jayawardena",
        role: "Minimal Home Setup",
        rating: 5,
        text:
          "ARC VANTAGE nailed the aesthetic—everything looks calm and premium. Packaging was also neat and minimal.",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % reviews.length);
    }, 7000);

    return () => clearInterval(id);
  }, [reviews.length]);

  const active = reviews[index];

  const go = (next) => {
    setDir(next ? 1 : -1);
    setIndex((i) => {
      const n = next ? i + 1 : i - 1;
      return (n + reviews.length) % reviews.length;
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-28">
      <div className="flex items-end justify-between gap-6 mb-12">
        <div>
          <h4 className="text-green-700 font-bold tracking-[0.2em] uppercase text-xs mb-3">
            Customer Love
          </h4>

          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
            Reviews that feel real.
          </h2>

          <p className="mt-4 text-gray-500 max-w-xl">
            Short, honest feedback—shown one by one like a calm product story.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => go(false)}
            className="px-4 py-2 rounded-full border border-black/10 hover:border-black/20 hover:bg-black/5 transition"
          >
            Prev
          </button>

          <button
            onClick={() => go(true)}
            className="px-4 py-2 rounded-full border border-black/10 hover:border-black/20 hover:bg-black/5 transition"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Main animated card */}
        <div className="lg:col-span-2 relative rounded-[2.5rem] border border-black/10 bg-white p-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.10),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(0,0,0,0.06),transparent_55%)]" />

          <div className="relative">
            <div className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6">
              Featured Review
            </div>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                initial={(d) => ({
                  opacity: 0,
                  y: 18,
                  x: d > 0 ? 22 : -22,
                  filter: "blur(10px)",
                })}
                animate={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                  filter: "blur(0px)",
                }}
                exit={(d) => ({
                  opacity: 0,
                  y: -16,
                  x: d > 0 ? -22 : 22,
                  filter: "blur(10px)",
                })}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <div className="text-2xl md:text-3xl leading-snug text-slate-900 font-medium">
                  “{active.text}”
                </div>

                <div className="mt-10 flex items-center justify-between gap-6">
                  <div>
                    <div className="font-semibold text-slate-900">
                      {active.name}
                    </div>
                    <div className="text-gray-500 text-sm">{active.role}</div>
                  </div>

                  <Stars rating={active.rating} />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="mt-10 flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDir(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index ? "w-8 bg-slate-900" : "w-2.5 bg-black/15"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Side stack */}
        <div className="flex flex-col gap-4">
          <MiniReview label="Up next" item={reviews[(index + 1) % reviews.length]} />
          <MiniReview label="Then" item={reviews[(index + 2) % reviews.length]} />

          <div className="rounded-[2rem] border border-black/10 bg-neutral-50 p-6 flex-1 flex flex-col justify-between">
            <div className="text-sm text-gray-600 leading-relaxed">
              <span className="font-semibold text-slate-900">Tip:</span> Add
              photos later and this becomes a premium testimonial wall.
            </div>

            <div className="mt-6 text-xs uppercase tracking-[0.25em] text-gray-400">
              ARC VANTAGE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniReview({ label, item }) {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white p-6">
      <div className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
        {label}
      </div>

      <div className="text-slate-900 font-medium leading-snug line-clamp-3">
        “{item.text}”
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="text-sm">
          <div className="font-semibold text-slate-900">{item.name}</div>
          <div className="text-gray-500">{item.role}</div>
        </div>

        <Stars rating={item.rating} small />
      </div>
    </div>
  );
}

function Stars({ rating, small = false }) {
  const size = small ? 14 : 16;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          className={i < rating ? "text-slate-900" : "text-black/20"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 17.27l5.18 3.05-1.39-5.81L20.5 9.5l-6-.5L12 3.5 9.5 9l-6 .5 4.71 5.01-1.39 5.81L12 17.27z" />
        </svg>
      ))}
    </div>
  );
}