import { NextResponse } from "next/server";

// ✅ Replace with DB query
async function getProductBySlug(slug) {
  const all = await (await import("../route.js")).getAllProducts?.(); 
  // ^ This import trick is NOT ideal; better to move DB functions to /lib.
  // I'm keeping this simple: you should move DB logic to lib/products.js.

  return (all || []).find((p) => p.slug === slug) || null;
}

export async function GET(req, { params }) {
  const { slug } = params;

  // TODO: replace with real DB fetch
  // For now, just return 404 if not found
  const product = await getProductBySlug(slug);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}