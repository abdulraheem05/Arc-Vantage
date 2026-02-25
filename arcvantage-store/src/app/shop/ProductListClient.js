"use client";
import { useState } from "react";
import ProductModal from "@/components/ProductModal";

export default function ProductListClient({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-10 text-black/60">
        No products found.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="rounded-2xl border border-black/10 bg-white overflow-hidden group">
            {/* Clickable Image Area for Quick View */}
            <div 
              className="aspect-[4/3] bg-black/5 cursor-pointer relative overflow-hidden"
              onClick={() => setSelectedProduct(p)}
            >
              <img
                src={p.image_url}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white px-5 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-xl">
                  Quick View
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="font-poppins uppercase text-[13px] font-semibold">{p.name}</div>
              <div className="mt-2 text-[13px] font-semibold text-black/70">
                Rs. {Number(p.price_lkr).toLocaleString()}
              </div>
            </div>

            <div className="px-5 pb-5">
              <button 
                onClick={() => setSelectedProduct(p)}
                className="w-full rounded-xl bg-black text-white py-3 text-[12px] font-semibold tracking-[0.18em] uppercase hover:opacity-90 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* The Modal Popup */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </>
  );
}