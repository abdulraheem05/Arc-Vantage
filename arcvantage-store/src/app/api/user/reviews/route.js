import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { pool } from "@/lib/db"; 

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Get user_id
    const userResult = await pool.query(
      'SELECT id FROM public.users WHERE email = $1',
      [session.user.email]
    );

    if (userResult.rows.length === 0) return NextResponse.json({ error: "User not found" }, { status: 404 });
    const userId = userResult.rows[0].id;

    // 2. Fetch reviews with product names
    const reviewsQuery = `
      SELECT 
        pr.id,
        pr.rating,
        pr.comment,
        pr.created_at,
        p.name as product_name,
        p.slug as product_slug
      FROM public.product_reviews pr
      JOIN public.products p ON pr.product_id = p.id
      WHERE pr.user_id = $1
      ORDER BY pr.created_at DESC
    `;

    const result = await pool.query(reviewsQuery, [userId]);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("API_REVIEWS_GET_ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}