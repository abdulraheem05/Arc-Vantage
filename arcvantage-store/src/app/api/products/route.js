import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
    const result = await pool.query(
        `SELECT id, slug, name, description, price_lkr, category, material, image_url
        FROM products
        WHERE active = true
        ORDER BY created_at DESC
        LIMIT 50`
    );

    return NextResponse.json(result.rows);
}