"use client";
import { motion } from "framer-motion";
import WhyModel3D from "@/components/WhyModel3D";

export default function WhySection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h4 className="text-green-700 font-bold tracking-[0.2em] uppercase text-xs mb-4">
          Our Philosophy
        </h4>

        <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-8">
          Why Arc Vantage?
        </h2>

        <div className="space-y-6 text-gray-600 text-lg leading-relaxed max-w-lg">
          <p>
            At ARCVANTAGE, we believe that the objects you interact with daily should be more than just functional—they should be an extension of your home's soul.
          </p>
          <p>
            Every piece is tested to meet our standard of “Clean Quality, Fair Price.”
          </p>
        </div>
      </motion.div>

      <div className="relative right-[8%] bottom-[4%] h-[350px] w-full rounded-[3rem] overflow-visible">
        <WhyModel3D />
      </div>
    </section>
  );
}