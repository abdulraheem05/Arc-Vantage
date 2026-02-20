import Link from "next/link";

async function getProducts(searchParams) {
  const qs = new URLSearchParams();

  if (searchParams?.category) qs.set("category", searchParams.category);
  if (searchParams?.material) qs.set("material", searchParams.material);
  if (searchParams?.sort) qs.set("sort", searchParams.sort);
  if (searchParams?.min) qs.set("min", searchParams.min);
  if (searchParams?.max) qs.set("max", searchParams.max);

  const res = await fetch(
  `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products?${qs.toString()}`,
  { cache: "no-store" }
);

  if (!res.ok) return [];
  return res.json();
}

export default async function ProductGrid({ searchParams }) {
  const products = await getProducts(searchParams);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-cinzel tracking-[0.18em] uppercase text-[16px]">
          Shop
        </h1>
        <div className="text-[12px] tracking-[0.18em] uppercase text-black/50 font-semibold">
          {products.length} items
        </div>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-black/10 p-10 text-black/60">
          No products found for these filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="rounded-2xl border border-black/10 bg-white overflow-hidden">
              <Link href={`/product/${p.slug}`} className="block">
                <div className="aspect-[4/3] bg-black/5">
                  {/* Replace with next/image later */}
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-black/30">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="font-cinzel tracking-[0.14em] uppercase text-[13px] font-semibold">
                    {p.name}
                  </div>
                  <div className="mt-2 text-[13px] font-semibold text-black/70">
                    Rs. {Number(p.price).toLocaleString()}
                  </div>
                </div>
              </Link>

              <div className="px-5 pb-5">
                <button className="w-full rounded-xl bg-black text-white py-3 text-[12px] font-semibold tracking-[0.18em] uppercase hover:opacity-90 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}