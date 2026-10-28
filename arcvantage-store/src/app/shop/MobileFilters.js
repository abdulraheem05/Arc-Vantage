
"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import FilterSideBar from "./FilterSideBar";

export default function MobileFilters() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-5 mt-17 block w-full lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-full border border-black/15 bg-white px-4 py-3 text-sm font-medium text-black shadow-sm transition-colors hover:bg-gray-50"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal size={17} />
          Filter & Sort
        </span>

        {open ? <X size={18} /> : <span className="text-xs">Show</span>}
      </button>

      {open && (
        <div className="mt-4 rounded-2xl border border-black/10 bg-white p-4">
          <FilterSideBar />
        </div>
      )}
    </div>
  );
}
