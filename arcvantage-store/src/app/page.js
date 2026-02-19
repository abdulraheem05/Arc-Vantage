"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

// Mock data for your arrivals - you can swap these with your real product data later
const latestProducts = [
  { id: 1, name: "Premium Chef Knife", price: "$85", image: "wooden-cup.jpg" },
  { id: 2, name: "Minimalist Spice Jar", price: "$12", image: "wooden-cup.jpg" },
  { id: 3, name: "Oak Rolling Pin", price: "$45", image: "wooden-cup.jpg" },
  { id: 4, name: "Matte Black Kettle", price: "$120", image: "wooden-cup.jpg" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative flex flex-col justify-center items-center min-h-screen text-center px-6 pt-20">
        
        {/* Left Side Product Intro */}
        <motion.div 
          initial={{ opacity: 0, x: -100, rotate: -10 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2 w-64 h-80 bg-gray-100 rounded-2xl overflow-hidden shadow-2xl"
        >
          <img src="wooden-cup.jpg" alt="Product Left" className="w-full h-full object-cover opacity-80" />
        </motion.div>

        {/* Right Side Product Intro */}
        <motion.div 
          initial={{ opacity: 0, x: 100, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 w-64 h-80 bg-gray-100 rounded-2xl overflow-hidden shadow-2xl"
        >
          <img src="wooden-cup.jpg" alt="Product Right" className="w-full h-full object-cover opacity-80" />
        </motion.div>

        {/* Main Hero Text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-2xl"
        >
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 leading-tight">
            ARCVANTAGE<span className="text-green-700">.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto">
            Knives, spice bottles, baking items, and minimal home supplies — clean quality, fair price.
          </p>
          <div className="mt-10">
            <a
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-black text-white font-medium hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Shop now
            </a>
          </div>
        </motion.div>
      </section>

      {/* --- LATEST ARRIVALS SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Latest Arrivals</h2>
            <p className="text-gray-500 mt-2">Carefully curated for the modern home.</p>
          </div>
          <a href="/shop" className="text-sm font-semibold border-b-2 border-black pb-1 hover:text-gray-600 transition">View All</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestProducts.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col cursor-pointer"
            >
              {/* Product Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-50">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Creative Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <button className="w-full py-3 bg-white text-black font-semibold rounded-xl translate-y-10 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="mt-4 flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                  <p className="text-gray-500 text-sm">Essentials</p>
                </div>
                <p className="font-bold text-lg">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}