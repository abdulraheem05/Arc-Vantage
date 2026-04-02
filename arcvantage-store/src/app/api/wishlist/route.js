import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { pool } from "@/lib/db";

// GET: Fetches all products in the user's wishlist
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json([], { status: 401 });

    const userRes = await pool.query("SELECT id FROM public.users WHERE email = $1", [session.user.email]);
    const userId = userRes.rows[0].id;

    const wishlistRes = await pool.query(`
      SELECT p.id, p.name, p.price_lkr, p.image_url, p.slug 
      FROM public.wishlist w
      JOIN public.products p ON w.product_id = p.id
      WHERE w.user_id = $1
      ORDER BY w.created_at DESC
    `, [userId]);

    return NextResponse.json(wishlistRes.rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Toggles (Adds/Removes) a product from the wishlist
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { productId } = await req.json();
    const userRes = await pool.query("SELECT id FROM public.users WHERE email = $1", [session.user.email]);
    const userId = userRes.rows[0].id;

    const existing = await pool.query(
      "SELECT id FROM public.wishlist WHERE user_id = $1 AND product_id = $2",
      [userId, productId]
    );

    if (existing.rows.length > 0) {
      await pool.query("DELETE FROM public.wishlist WHERE id = $1", [existing.rows[0].id]);
      return NextResponse.json({ status: "removed" });
    } else {
      await pool.query(
        "INSERT INTO public.wishlist (user_id, product_id) VALUES ($1, $2)",
        [userId, productId]
      );
      return NextResponse.json({ status: "added" });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}