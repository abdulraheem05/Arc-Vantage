"use client";

import { useMemo, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function setParam(params, key, value) {
  const next = new URLSearchParams(params.toString());
  if (!value) next.delete(key);
  else next.set(key, value);
  next.delete("page"); // reset pagination later if you add it
  return next;
}

export default function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const active = useMemo(() => {
    return {
      category: params.get("category") || "",
      material: params.get("material") || "",
      sort: params.get("sort") || "newest",
      min: params.get("min") || "",
      max: params.get("max") || "",
    };
  }, [params]);

  const [min, setMin] = useState(active.min);
  const [max, setMax] = useState(active.max);

  const apply = (key, value) => {
    const next = setParam(params, key, value);
    router.push(`${pathname}?${next.toString()}`);
  };

  const applyPrice = () => {
    let next = new URLSearchParams(params.toString());
    if (min) next.set("min", min); else next.delete("min");
    if (max) next.set("max", max); else next.delete("max");
    next.delete("page");
    router.push(`${pathname}?${next.toString()}`);
  };

  const clearAll = () => router.push(pathname);

  const itemClass = (isOn) =>
    `w-full text-left px-4 py-3 text-[13px] tracking-[0.12em] font-semibold uppercase
     transition-colors border-b border-black/10
     ${isOn ? "text-[#966B4E]" : "text-black hover:bg-black/5 hover:text-[#966B4E]"}`;

  return (
    <div className="rounded-2xl border border-black/10 bg-white overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-black/10">
        <div className="font-cinzel tracking-[0.2em] uppercase text-[12px] text-black/70">
          Filters
        </div>
        <button
          onClick={clearAll}
          className="text-[12px] font-semibold tracking-[0.12em] uppercase hover:text-[#966B4E]"
        >
          Clear
        </button>
      </div>

      {/* Category */}
      <div className="px-5 py-4">
        <div className="text-[11px] tracking-[0.25em] uppercase text-black/50 mb-3 font-semibold">
          Category
        </div>

        <button className={itemClass(active.category === "baking")} onClick={() => apply("category", "baking")}>
          Baking Utensils
        </button>
        <button className={itemClass(active.category === "cookware")} onClick={() => apply("category", "cookware")}>
          Cookware
        </button>
        <button className={itemClass(active.category === "tableware")} onClick={() => apply("category", "tableware")}>
          Tableware
        </button>
        <button className={itemClass(active.category === "containers")} onClick={() => apply("category", "containers")}>
          Containers
        </button>
      </div>

      {/* Material */}
      <div className="px-5 py-4 border-t border-black/10">
        <div className="text-[11px] tracking-[0.25em] uppercase text-black/50 mb-3 font-semibold">
          Material
        </div>

        <button className={itemClass(active.material === "wood")} onClick={() => apply("material", "wood")}>
          Wood
        </button>
        <button className={itemClass(active.material === "glass")} onClick={() => apply("material", "glass")}>
          Glass
        </button>
        <button className={itemClass(active.material === "ceramic")} onClick={() => apply("material", "ceramic")}>
          Ceramic
        </button>
        <button className={itemClass(active.material === "steel")} onClick={() => apply("material", "steel")}>
          Steel
        </button>
      </div>

      {/* Price */}
      <div className="px-5 py-4 border-t border-black/10">
        <div className="text-[11px] tracking-[0.25em] uppercase text-black/50 mb-3 font-semibold">
          Price
        </div>

        <div className="flex gap-3">
          <input
            value={min}
            onChange={(e) => setMin(e.target.value)}
            placeholder="Min"
            className="w-full rounded-xl border border-black/10 px-4 py-3 text-[13px] font-semibold outline-none focus:border-[#966B4E]"
          />
          <input
            value={max}
            onChange={(e) => setMax(e.target.value)}
            placeholder="Max"
            className="w-full rounded-xl border border-black/10 px-4 py-3 text-[13px] font-semibold outline-none focus:border-[#966B4E]"
          />
        </div>

        <button
          onClick={applyPrice}
          className="mt-3 w-full rounded-xl border border-black/10 px-4 py-3 text-[12px] font-semibold tracking-[0.18em] uppercase hover:bg-black/5 hover:text-[#966B4E] transition-colors"
        >
          Apply
        </button>
      </div>

      {/* Sort */}
      <div className="px-5 py-4 border-t border-black/10">
        <div className="text-[11px] tracking-[0.25em] uppercase text-black/50 mb-3 font-semibold">
          Sort
        </div>

        <select
          value={active.sort}
          onChange={(e) => apply("sort", e.target.value)}
          className="w-full rounded-xl border border-black/10 px-4 py-3 text-[13px] font-semibold outline-none focus:border-[#966B4E]"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}