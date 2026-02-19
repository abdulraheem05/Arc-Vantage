"use client";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react"; // Optional: npm install lucide-react
import RollingPin3D from "@/components/RollingPin3D";
import WhyModel3D from "@/components/WhyModel3D";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* --- HERO SECTION (With Side Images) --- */}
      <section className="mt-20 relative flex flex-col justify-center items-center min-h-[80vh] text-center px-6 pt-20">
        <Navbar/>
        {/* Left Side Product Intro */}
        <motion.div 
          initial={{ opacity: 0, x: -100}}
          whileInView={{ opacity: 1, x: 0}}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hidden lg:block absolute left-[5%] top-[40%] -translate-y-1/3  w-202 h-[550px] rounded-3xl overflow-hidden "
        >
          <img src="arc land.png-3.png" alt="Intro Left" className="w-full h-full object-cover" />
        </motion.div>

        {/* Right Side Product Intro */}
        <motion.div 
          initial={{ opacity: 0, x: 100}}
          whileInView={{ opacity: 1, x: 0}}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="hidden lg:block absolute right-[5%] top-1/2 -translate-y-1/2 w-72 h-[450px]  rounded-3xl overflow-hidden "
        >
          <img src="arc land.png-1.png" alt="Intro Right" className="w-full h-full object-cover" />
        </motion.div>

        {/* Hero Content */}
        <div className="z-10 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-slate-900">
            ARCVANTAGE<span className="text-green-700">.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto">
            Knives, spice bottles, baking items, and minimal home supplies — clean quality, fair price.
          </p>
          <button className="mt-10 px-8 py-4 bg-black text-white rounded-full font-medium hover:scale-105 transition-transform shadow-lg">
            Shop now
          </button>
        </div>
      </section>

      {/* --- LATEST ARRIVALS (Bento Grid) --- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight uppercase">Explore</h2>
          <button className="px-6 py-2 border-2 border-orange-400 text-orange-400 rounded-full text-sm font-bold tracking-widest hover:bg-orange-400 hover:text-white transition-colors">
            VIEW ALL COLLECTIONS
          </button>
        </div>

        {/* The Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[700px]">
          
          {/* Big Vertical Card (Seating) */}
          <ArrivalCard 
            title="Baking Utensils" 
            img="baking.jpg"
            className="md:col-span-2 md:row-span-2"
          />

          {/* Wide Horizontal Card (Tables) */}
          <ArrivalCard 
            title="Cookware" 
            img="cook.jpg"
            className="md:col-span-2 md:row-span-1"
          />

          {/* Small Square (Lighting) */}
          <ArrivalCard 
            title="Tableware" 
            img="table.jpg"
            className="md:col-span-1 md:row-span-1"
          />

          {/* Small Square (Accessories) */}
          <ArrivalCard 
            title="Containers" 
            img="cont.jpg"
            className="md:col-span-1 md:row-span-1"
          />

        </div>
      </section>
      {/* --- WHY ARCVANTAGE SECTION --- */}
<section className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
  {/* Left Side: Content */}
  <motion.div 
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    <h4 className="text-green-700 font-bold tracking-[0.2em] uppercase text-xs mb-4">
      Our Philosophy
    </h4>
    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">
      Why Arc Vantage?
    </h2>
    <div className="space-y-6 text-gray-600 text-lg leading-relaxed max-w-lg">
      <p>
        At ARCVANTAGE, we believe that the objects you interact with daily should 
        be more than just functional—they should be an extension of your home's 
        soul. Our collection is curated with a focus on minimalist aesthetics 
        and uncompromising durability.
      </p>
      <p>
        From heat-resistant glass jars to precision-forged steel, every piece 
        is tested to ensure it meets our standard of "Clean Quality, Fair Price." 
        We don't just sell kitchenware; we provide the tools for a more 
        intentional lifestyle.
      </p>
    </div>
    
    </motion.div>

    {/* Right Side: The Interactive Model */}
    <div className="relative right-[8%] bottom-[10%] h-[350px] w-full rounded-[3rem] overflow-visible">
      <WhyModel3D/>
    </div>
  </section>
    </div>
  );
}

// Reusable Card Component
function ArrivalCard({ title, img, className }) {
  return (
    <motion.div 
      whileHover="hover"
      className={`relative rounded-[2rem] overflow-hidden bg-gray-100 group cursor-pointer ${className}`}
    >
      <motion.img 
        variants={{ hover: { scale: 1.05 } }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        src={img} 
        alt={title} 
        className="w-full h-full object-cover" 
      />
      
      {/* Bottom Overlay Gradient for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

      {/* Text & Icon */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center text-white">
        <h3 className="text-xl font-bold tracking-widest">{title}</h3>
        <motion.div 
          variants={{ hover: { x: 5 } }}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full"
        >
          <ArrowRight size={20} />
        </motion.div>
      </div>
    </motion.div>
  );
}