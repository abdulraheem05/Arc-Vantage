"use client";
import { motion } from "framer-motion";
import WhyModel3D from "@/components/WhyModel3D";
import { ShieldCheck, Zap, Handshake } from "lucide-react";

const trustFactors = [
  {
    icon: ShieldCheck,
    title: "Tested Standards",
    desc: "Rigorous quality testing for safety and durability in every piece.",
  },
  {
    icon: Zap,
    title: "Direct Sourcing",
    desc: "We eliminate middle-men to ensure a 'Fair Price' guarantee.",
  },
  {
    icon: Handshake,
    title: "Clean Design",
    desc: "We prioritize object integrity, function, and aesthetic 'Soul'.",
  },
];

export default function WhySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
    },
  };

  return (
    <section className="max-w-[1400px] mx-auto px-10 py-18 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start overflow-visible">
      
      {/* LEFT CONTENT AREA */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center lg:items-start"
      >
        {/* Centered Title relative to the 800px grid below */}
        <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-black mb-12 lg:ml-20 text-center lg:text-left w-full max-w-[800px]">
          Why ArcVantage?
        </h2>

        {/* --- THREE GLOSSY TILES --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-[800px] w-full"
        >
          {trustFactors.map((factor) => (
            <motion.div
              key={factor.title}
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              className="group relative cursor-pointer p-8 rounded-[2.5rem] bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-50 overflow-hidden"
            >
              
              {/* 1. THE LENS FLARE / LIGHT SWEEP (Sharper & Faster) */}
              <motion.div 
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.7) 80%, transparent 100%)",
                  width: "200%",
                }}
                initial={{ x: "-100%", skewX: -20 }}
                whileHover={{ 
                  x: "100%", 
                  transition: { duration: 0.7, ease: "easeInOut" } 
                }}
              />

              {/* 2. GLOWING SHADOW (Visible on Hover) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 shadow-[0_20px_50px_rgba(150,107,78,0.15)] z-0" />

              {/* 3. INNER GLOSS OVERLAY */}
              <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-100 rounded-[2.5rem]" />

              {/* 4. CONTENT AREA */}
              <div className="relative z-30 flex flex-col items-center text-center">
                {/* Icon Circle with Peach Gloss Depth */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#FCF8F5] to-[#F2E4DC]/40 flex items-center justify-center mb-6 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] border border-white">
                  <factor.icon size={26} className="text-[#966B4E]" strokeWidth={1.5} />
                </div>
                
                <h3 className="font-cinzel text-[13px] font-bold tracking-[0.05em] uppercase text-black mb-3">
                  {factor.title}
                </h3>
                
                <p className="text-[13px] leading-relaxed text-black/50 font-medium">
                  {factor.desc}
                </p>
              </div>

              {/* 5. INTERACTIVE BORDER GLOW */}
              <div className="absolute inset-px rounded-[2.5rem] border border-white/50 group-hover:border-[#966B4E]/20 transition-colors duration-100 pointer-events-none z-10" />
              
              {/* 6. AMBIENT PEACH BLUR (Bottom Corner) */}
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#966B4E]/5 blur-[40px] rounded-full group-hover:bg-[#966B4E]/15 transition-colors duration-100" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* RIGHT 3D MODEL AREA */}
      <div className="relative mt-24 lg:-0 right-[8%] bottom-[34%] h-[350px] w-full rounded-[3rem] overflow-visible">
        <WhyModel3D />
      </div>
    </section>
  );
}