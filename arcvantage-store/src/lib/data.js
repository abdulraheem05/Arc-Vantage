export async function getProducts(sp = {}) {
  const qs = new URLSearchParams();
  if (sp?.category) qs.set("category", sp.category);
  if (sp?.material) qs.set("material", sp.material);
  if (sp?.sort) qs.set("sort", sp.sort);
  if (sp?.min) qs.set("min", sp.min);
  if (sp?.max) qs.set("max", sp.max);

  const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/products?${qs.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}