import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { pool } from "@/lib/db";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ exists: false });

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    const userRes = await pool.query("SELECT id FROM public.users WHERE email = $1", [session.user.email]);
    const userId = userRes.rows[0].id;

    const existing = await pool.query(
      "SELECT id FROM public.wishlist WHERE user_id = $1 AND product_id = $2",
      [userId, productId]
    );

    return NextResponse.json({ exists: existing.rows.length > 0 });
  } catch (error) {
    return NextResponse.json({ exists: false });
  }
}