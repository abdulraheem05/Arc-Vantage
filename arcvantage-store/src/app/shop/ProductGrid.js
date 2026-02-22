import Link from "next/link";

async function getProducts(sp) {
  const qs = new URLSearchParams();

  // (Later we’ll use these for filtering)
  if (sp?.category) qs.set("category", sp.category);
  if (sp?.material) qs.set("material", sp.material);
  if (sp?.sort) qs.set("sort", sp.sort);
  if (sp?.min) qs.set("min", sp.min);
  if (sp?.max) qs.set("max", sp.max);

  // Server component fetch → use absolute URL in dev
  const base =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${base}/api/products?${qs.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function ProductGrid({ searchParams }) {
  const sp = await searchParams;
  const products = await getProducts(sp);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-cinzel font-medium tracking-[0.10em] uppercase text-[36px]">
          Shop
        </h1>

        <div className="text-[12px] tracking-[0.18em] uppercase text-black/50 font-semibold">
          {products.length} items
        </div>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-black/10 bg-white p-10 text-black/60">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-black/10 bg-white overflow-hidden"
            >
              <Link href={`/product/${p.slug}`} className="block">
                <div className="aspect-[4/3] bg-black/5">
                  {p.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-black/30">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="font-poppins uppercase text-[13px] font-semibold">
                    {p.name}
                  </div>

                  <div className="mt-2 text-[13px] font-semibold text-black/70">
                    Rs. {Number(p.price_lkr).toLocaleString()}
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