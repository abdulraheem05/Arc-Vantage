"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [minPrice, setMinPrice] = useState(searchParams.get("min") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max") || "");

  // Sync price state if URL changes (e.g., from 'Reset Filters')
  useEffect(() => {
    setMinPrice(searchParams.get("min") || "");
    setMaxPrice(searchParams.get("max") || "");
  }, [searchParams]);

  const updateFilter = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const categories = ["baking", "cookware", "tableware", "containers"];
  const materials = ["wood", "ceramic", "steel", "glass"];

  return (
    <div className="space-y-10 pr-4">
      {/* SORTING */}
      <div>
        <h3 className="font-cinzel text-[14px] font-bold tracking-widest uppercase mb-4">Sort By</h3>
        <select 
          onChange={(e) => updateFilter({ sort: e.target.value })}
          value={searchParams.get("sort") || "latest"}
          className="w-full bg-transparent border-b border-black/20 py-2 text-[13px] uppercase tracking-wider focus:outline-none focus:border-black cursor-pointer"
        >
          <option value="latest">Latest to Oldest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="oldest">Oldest to Latest</option>
        </select>
      </div>

      {/* MATERIAL */}
      <div>
        <h3 className="font-cinzel text-[14px] font-bold tracking-widest uppercase mb-4">Material</h3>
        <div className="space-y-3">
          {materials.map((mat) => (
            <label key={mat} className="flex items-center group cursor-pointer">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={searchParams.get("material") === mat}
                  onChange={() => updateFilter({ material: searchParams.get("material") === mat ? null : mat })}
                  className="peer appearance-none w-4 h-4 border border-black/20 rounded-sm checked:bg-black checked:border-black transition-all cursor-pointer"
                />
                <svg className="absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none left-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className={`ml-3 text-[12px] uppercase tracking-widest transition-colors ${
                searchParams.get("material") === mat ? "text-black font-bold" : "text-black/50 group-hover:text-black"
              }`}>
                {mat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* PRICE RANGE */}
      <div>
        <h3 className="font-cinzel text-[14px] font-bold tracking-widest uppercase mb-4">Price (LKR)</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full border border-black/10 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-black/40 bg-white"
          />
          <span className="text-black/30">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full border border-black/10 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-black/40 bg-white"
          />
        </div>
        <button 
          onClick={() => updateFilter({ min: minPrice, max: maxPrice })}
          className="w-full mt-3 bg-black text-white py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-lg hover:bg-black/80 transition shadow-sm"
        >
          Apply Price
        </button>
      </div>

      {/* RESET ALL */}
      <button 
        onClick={() => router.push(pathname)}
        className="w-full py-3 border border-black/10 text-black/40 text-[11px] font-bold uppercase tracking-[0.2em] hover:border-black hover:text-black transition-all rounded-lg"
      >
        Reset Filters
      </button>
    </div>
  );
}