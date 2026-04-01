// app/shop/ProductGrid.js
import Link from "next/link";
import { getProducts } from "@/lib/data";

export default async function ProductGrid({ searchParams, title, customProducts }) {
  // 1. Unwrap searchParams
  const sp = await searchParams;
  
  // 2. Use products passed from category page, or fetch all if on main shop
  const products = customProducts || await getProducts(sp);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        {/* Dynamic Heading based on prop */}
        <h1 className="font-cinzel font-medium mb-10 text-[32px] lg:text-[36px]">
          {title || "Shop"}
        </h1>
        <div className="text-[12px] tracking-[0.18em] uppercase text-black/50 font-semibold">
          {products.length} {products.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-black/10 bg-white p-10 text-black/60 italic">
          No products found in this selection.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="rounded-2xl border border-black/10 bg-white overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
              
              <Link href={`/product/${p.slug}`} className="block">
                <div className="aspect-[4/3] bg-black/5 relative overflow-hidden">
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white px-5 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-xl text-black">
                      View Details
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="font-poppins uppercase text-[13px] font-semibold tracking-tight">
                    {p.name}
                  </div>
                  <div className="mt-2 text-[13px] font-semibold text-[#966B4E]">
                    Rs. {Number(p.price_lkr).toLocaleString()}
                  </div>
                </div>
              </Link>

              <div className="px-5 pb-5">
                <Link 
                  href={`/product/${p.slug}`}
                  className="w-full flex justify-center rounded-xl bg-black text-white py-3 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-black/90 transition"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}