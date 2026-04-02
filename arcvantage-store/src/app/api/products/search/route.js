import { NextResponse } from "next/server";
import { pool } from "@/lib/db"; // Adjust based on your db helper location

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) return NextResponse.json([]);

  try {
    // Searches for product names matching the query, limited to top 3
    const result = await pool.query(
      "SELECT id, name, slug, image_url, price_lkr FROM public.products WHERE name ILIKE $1 LIMIT 3",
      [`%${query}%`]
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}