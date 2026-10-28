import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  const category = searchParams.get("category");
  const material = searchParams.get("material");
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const sort = searchParams.get("sort");

  // Use 1=1 as a base so we can safely append "AND" to everything
  let queryText = `SELECT * FROM products WHERE 1=1`; 
  const values = [];  

  if (category) {
    values.push(category);
    queryText += ` AND category = $${values.length}`;
  }

  if (material) {
    values.push(material);
    queryText += ` AND material = $${values.length}`;
  }

  if (min && !isNaN(min)) {
    values.push(parseInt(min));
    queryText += ` AND price_lkr >= $${values.length}`;
  }

  if (max && !isNaN(max)) {
    values.push(parseInt(max));
    queryText += ` AND price_lkr <= $${values.length}`;
  }

  // Sorting Logic
  switch (sort) {
    case "price_asc":
      queryText += ` ORDER BY price_lkr ASC`;
      break;
    case "price_desc":
      queryText += ` ORDER BY price_lkr DESC`;
      break;
    case "oldest":
      queryText += ` ORDER BY id ASC`; // Using ID as fallback for created_at if not exists
      break;
    default:
      queryText += ` ORDER BY id DESC`; 
  }

  queryText += ` LIMIT 50`;

  // Debugging: This will show you exactly what's being sent to PG
  console.log("EXECUING QUERY:", queryText, "WITH VALUES:", values);

  try {
    const result = await pool.query(queryText, values);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}