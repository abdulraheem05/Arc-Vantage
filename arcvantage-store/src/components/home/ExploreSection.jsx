"use client";
import { motion } from "framer-motion";
import ArrivalCard from "./ArrivalCard";

export default function ExploreSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <section className="mt-24 mb-20">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="font-cinzel text-3xl font-bold tracking-tight text-black">
            Shop by Category
          </h2>
        </div>

        {/* 4-Column Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          <ArrivalCard title="Baking Utensils" img="/baking.jpg" />
          <ArrivalCard title="Cookware" img="/cook.jpg" />
          <ArrivalCard title="Tableware" img="/table.jpg" />
          <ArrivalCard title="Containers" img="/cont.jpg" />
        </motion.div>
      </div>
    </section>
  );
}