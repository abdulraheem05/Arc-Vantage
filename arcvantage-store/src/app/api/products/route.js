import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  const category = searchParams.get("category");
  const material = searchParams.get("material");
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const sort = searchParams.get("sort");

  let query = `SELECT * FROM products WHERE active = true`;
  const values = [];

  // Filtering Logic
  if (category) {
    values.push(category);
    query += ` AND category = $${values.length}`;
  }

  if (material) {
    values.push(material);
    query += ` AND material = $${values.length}`;
  }

  if (min) {
    values.push(parseInt(min));
    query += ` AND price_lkr >= $${values.length}`;
  }

  if (max) {
    values.push(parseInt(max));
    query += ` AND price_lkr <= $${values.length}`;
  }

  // Sorting Logic
  switch (sort) {
    case "price_asc":
      query += ` ORDER BY price_lkr ASC`;
      break;
    case "price_desc":
      query += ` ORDER BY price_lkr DESC`;
      break;
    case "oldest":
      query += ` ORDER BY created_at ASC`;
      break;
    default: // latest
      query += ` ORDER BY created_at DESC`;
  }

  query += ` LIMIT 50`;

  try {
    const result = await pool.query(query, values);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}