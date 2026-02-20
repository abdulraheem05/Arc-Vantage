"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ArrivalCard({ title, img, className, size = "square" }) {

  const height =
    size === "tall"
      ? "h-[360px] md:h-[560px]"
      : size === "wide"
      ? "h-[240px] md:h-[270px]"
      : "h-[220px] md:h-[270px]";

  return (
    <motion.div
      initial={false}
      whileHover="hover"
      className={`relative ${height} rounded-[2rem] overflow-hidden bg-white border border-black/5 shadow-sm group cursor-pointer ${className}`}
    >
      <motion.img
        variants={{ hover: { scale: 1.04 } }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        src={img}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80" />

      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-white">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/70">
            Collection
          </p>
          <h3 className="text-lg md:text-xl font-semibold tracking-tight">
            {title}
          </h3>
        </div>

        <motion.div variants={{ hover: { x: 6 } }} className="p-2.5 bg-white/15 backdrop-blur-md rounded-full border border-white/15">
          <ArrowRight size={18} />
        </motion.div>
      </div>

      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 ring-1 ring-white/20"
      />
    </motion.div>
  );
}