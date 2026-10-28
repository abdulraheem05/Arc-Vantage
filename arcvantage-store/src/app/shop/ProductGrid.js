
import Link from "next/link";
import { getProducts } from "@/lib/data";

export default async function ProductGrid({
  searchParams,
  title,
  customProducts,
}) {
  const sp = await searchParams;
  const fetchedProducts = await getProducts(sp);
  const products = customProducts || fetchedProducts || [];

  return (
    <div className="min-w-0 w-full">
      {/* Heading and product count */}
      <div className="mb-5 flex items-center justify-between gap-3 sm:mb-7">
        <h1 className="font-cinzel text-[25px] font-medium leading-tight sm:text-[32px] lg:text-[36px]">
          {title || "Shop"}
        </h1>

        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.12em] text-black/50 sm:text-xs sm:tracking-[0.18em]">
          {products.length} {products.length === 1 ? "item" : "items"}
        </span>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-black/10 bg-white p-6 text-sm italic text-black/60 sm:p-10">
          No products found in this selection.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
          {products.map((p) => (
            <article
              key={p.id}
              className="group min-w-0 overflow-hidden rounded-xl border border-black/[0.08] bg-white transition-shadow duration-300 hover:shadow-md sm:rounded-2xl"
            >
              <Link href={`/product/${p.slug}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f6f5f2]">
                  <img
                    src={p.image_url}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-3 sm:p-5">
                  <h2 className="line-clamp-2 min-h-[2.5rem] font-poppins text-[11px] font-semibold uppercase leading-5 tracking-tight sm:text-[13px]">
                    {p.name}
                  </h2>

                  <p className="mt-1.5 text-xs font-semibold text-[#966B4E] sm:mt-2 sm:text-[13px]">
                    Rs. {Number(p.price_lkr).toLocaleString()}
                  </p>
                </div>
              </Link>

              <div className="px-3 pb-3 sm:px-5 sm:pb-5">
                <Link
                  href={`/product/${p.slug}`}
                  className="flex w-full items-center justify-center rounded-full bg-black px-2 py-2.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-black/80 sm:py-3 sm:text-[11px] sm:tracking-[0.2em]"
                >
                  View Product
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
