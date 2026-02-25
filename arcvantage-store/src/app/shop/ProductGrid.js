import ProductListClient from "./ProductListClient";

async function getProducts(sp) {
  const qs = new URLSearchParams();
  if (sp?.category) qs.set("category", sp.category);
  if (sp?.material) qs.set("material", sp.material);
  if (sp?.sort) qs.set("sort", sp.sort);
  if (sp?.min) qs.set("min", sp.min);
  if (sp?.max) qs.set("max", sp.max);

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
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

      {/* Pass data to the Client Component for interactivity */}
      <ProductListClient products={products} />
    </div>
  );
}