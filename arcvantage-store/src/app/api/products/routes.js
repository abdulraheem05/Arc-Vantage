import { NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/lib/mockProducts";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category");
  const material = searchParams.get("material");
  const sort = searchParams.get("sort") || "newest";
  const min = searchParams.get("min");
  const max = searchParams.get("max");

  let products = [...MOCK_PRODUCTS];

  // Filter: category
  if (category) products = products.filter((p) => p.category === category);

  // Filter: material
  if (material) products = products.filter((p) => p.material === material);

  // Filter: price range
  const minNum = min ? Number(min) : null;
  const maxNum = max ? Number(max) : null;

  if (minNum !== null && !Number.isNaN(minNum)) {
    products = products.filter((p) => Number(p.price) >= minNum);
  }
  if (maxNum !== null && !Number.isNaN(maxNum)) {
    products = products.filter((p) => Number(p.price) <= maxNum);
  }

  // Sort
  if (sort === "price_asc") products.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") products.sort((a, b) => b.price - a.price);

  // "newest" not implemented because mock has no createdAt — fine for now
  return NextResponse.json(products);
}