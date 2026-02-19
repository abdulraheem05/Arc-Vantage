"use client";
import Navbar from "@/components/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react"; // Optional: npm install lucide-react
import WhyModel3D from "@/components/WhyModel3D";
import { useEffect, useMemo, useState, useRef  } from "react";
import { AnimatePresence } from "framer-motion";

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
      {/* The Grid Container */}
      
      <div className="mt-20 rounded-[2.5rem] bg-neutral-50/70 border border-black/5 p-8 md:p-16">

        <div className="flex justify-between items-center mb-10"> <h2 className="text-3xl font-bold tracking-tight uppercase">Explore</h2> <button className="px-6 py-2 border-2 border-orange-400 text-orange-400 rounded-full text-sm font-bold tracking-widest hover:bg-orange-400 hover:text-white transition-colors"> VIEW ALL COLLECTIONS </button> </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
          
          <ArrivalCard
            title="Baking Utensils"
            img="baking.jpg"
            className="md:col-span-2 md:row-span-2"
            size="tall"
          />

          <ArrivalCard
            title="Cookware"
            img="cook.jpg"
            className="md:col-span-2 md:row-span-1"
            size="wide"
          />

          <ArrivalCard
            title="Tableware"
            img="table.jpg"
            className="md:col-span-1 md:row-span-1"
            size="square"
          />

          <ArrivalCard
            title="Containers"
            img="cont.jpg"
            className="md:col-span-1 md:row-span-1"
            size="square"
          />
        </div>
      </div>

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
    <div className="relative right-[8%] bottom-[4%] h-[350px] w-full rounded-[3rem] overflow-visible">
      <WhyModel3D/>
    </div>
  </section>

  <CustomerReviews/>
  <AddReviewCTA/>
  <SiteFooter/>
    </div>
  );
}

// Reusable Card Component
function ArrivalCard({ title, img, className, size = "square" }) {
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
      {/* Image */}
      <motion.img
        variants={{ hover: { scale: 1.04 } }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        src={img}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Soft overlay to unify all images */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Bottom gradient for readability (more subtle) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80" />

      {/* Content */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-white">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/70">
            Collection
          </p>
          <h3 className="text-lg md:text-xl font-semibold tracking-tight">
            {title}
          </h3>
        </div>

        <motion.div
          variants={{ hover: { x: 6 } }}
          className="p-2.5 bg-white/15 backdrop-blur-md rounded-full border border-white/15"
        >
          <ArrowRight size={18} />
        </motion.div>
      </div>

      {/* Optional: subtle hover glow */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 ring-1 ring-white/20"
      />
    </motion.div>
  );
}




function CustomerReviews() {
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
  const [dir, setDir] = useState(1); // animation direction

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
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
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

      {/* Creative Layout: Big quote card + small stacked preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Main animated card */}
        <div className="lg:col-span-2 relative rounded-[2.5rem] border border-black/10 bg-white p-10 overflow-hidden">
          {/* subtle background */}
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

        {/* Side stack (shows next ones as “queued”) */}
        <div className="flex flex-col gap-4">
          <MiniReview
            label="Up next"
            item={reviews[(index + 1) % reviews.length]}
          />
          <MiniReview
            label="Then"
            item={reviews[(index + 2) % reviews.length]}
          />
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

function AddReviewCTA() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <div className="rounded-[2.5rem] border border-black/10 bg-white p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
            Leave a review
          </h3>
          <p className="mt-2 text-gray-500 max-w-xl">
            Help others choose better—share your honest experience in under a minute.
          </p>
        </div>

        <div className="w-full md:w-[420px]">
          <div className="grid grid-cols-1 gap-3">
            <input
              className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/25"
              placeholder="Your name"
            />
            <textarea
              rows={3}
              className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/25 resize-none"
              placeholder="Write your review..."
            />
            <div className="flex items-center justify-between gap-3">
              <select className="rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/25 bg-white">
                <option>Rating</option>
                <option>★★★★★ (5)</option>
                <option>★★★★☆ (4)</option>
                <option>★★★☆☆ (3)</option>
                <option>★★☆☆☆ (2)</option>
                <option>★☆☆☆☆ (1)</option>
              </select>

              <button className="px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-medium hover:scale-[1.02] transition">
                Submit
              </button>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              By submitting, you agree that your review may be displayed publicly on ARC VANTAGE.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


function SiteFooter() {
  const year = 2026
  return (

    <footer className="border-t border-black/20 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-xl font-semibold tracking-tight text-slate-900">
              ARCVANTAGE<span className="text-green-700">.</span>
            </div>
            <p className="mt-4 text-gray-500 text-sm leading-relaxed">
              Minimal kitchenware and home supplies—clean quality, fair price.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                className="text-sm text-gray-500 hover:text-slate-900 transition"
                href="#"
              >
                Instagram
              </a>
              <span className="text-gray-300">•</span>
              <a
                className="text-sm text-gray-500 hover:text-slate-900 transition"
                href="#"
              >
                TikTok
              </a>
              <span className="text-gray-300">•</span>
              <a
                className="text-sm text-gray-500 hover:text-slate-900 transition"
                href="#"
              >
                Pinterest
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gray-400">
              Shop
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a className="text-gray-500 hover:text-slate-900 transition" href="#">Baking Utensils</a></li>
              <li><a className="text-gray-500 hover:text-slate-900 transition" href="#">Cookware</a></li>
              <li><a className="text-gray-500 hover:text-slate-900 transition" href="#">Tableware</a></li>
              <li><a className="text-gray-500 hover:text-slate-900 transition" href="#">Containers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gray-400">
              Support
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a className="text-gray-500 hover:text-slate-900 transition" href="#">Contact</a></li>
              <li><a className="text-gray-500 hover:text-slate-900 transition" href="#">Shipping & Delivery</a></li>
              <li><a className="text-gray-500 hover:text-slate-900 transition" href="#">Returns & Refunds</a></li>
              <li><a className="text-gray-500 hover:text-slate-900 transition" href="#">FAQs</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gray-400">
              Newsletter
            </h4>
            <p className="mt-5 text-gray-500 text-sm leading-relaxed">
              New arrivals, minimal home tips, and early access drops.
            </p>

            <div className="mt-5 flex gap-3">
              <input
                className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/25"
                placeholder="Email address"
              />
              <button className="px-5 py-3 rounded-2xl bg-slate-900 text-white text-sm font-medium hover:opacity-95 transition">
                Join
              </button>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-black/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {year} ARCVANTAGE. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a className="text-gray-500 hover:text-slate-900 transition" href="#">
              Privacy Policy
            </a>
            <a className="text-gray-500 hover:text-slate-900 transition" href="#">
              Terms
            </a>
            <a className="text-gray-500 hover:text-slate-900 transition" href="#">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
