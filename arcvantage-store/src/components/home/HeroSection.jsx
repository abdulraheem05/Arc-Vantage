"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="mt-20 relative flex flex-col justify-center items-center min-h-[80vh] text-center px-6 pt-20">
      {/* Left image */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="hidden lg:block absolute left-[5%] top-[40%] -translate-y-1/3 w-202 h-[550px] rounded-3xl overflow-hidden"
      >
        <img src="arc land.png-3.png" alt="Intro Left" className="w-full h-full object-cover" />
      </motion.div>

      {/* Right image */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="hidden lg:block absolute right-[5%] top-1/2 -translate-y-1/2 w-72 h-[450px] rounded-3xl overflow-hidden"
      >
        <img src="arc land.png-1.png" alt="Intro Right" className="w-full h-full object-cover" />
      </motion.div>

      {/* Content */}
      <div className="z-10 max-w-2xl">
        <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-slate-900">
          ARCVANTAGE<span className="text-green-700">.</span>
        </h1>

        <p className="mt-6 font-sans text-lg text-gray-500 max-w-xl mx-auto">
          Knives, spice bottles, baking items, and minimal home supplies — clean quality, fair price.
        </p>

      <Link 
        href="/shop" 
        className="mt-10 inline-block px-8 py-4 bg-black text-white rounded-full font-sans font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#966B4E]"
      >
        Shop now
      </Link>

      </div>
    </section>
  );
} 