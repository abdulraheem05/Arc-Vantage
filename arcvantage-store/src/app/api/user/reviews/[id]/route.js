import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { pool } from "@/lib/db"; 

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const rev_id = await params;
    const  {id}  = rev_id; // This is the review ID

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Get user_id to verify ownership
    const userResult = await pool.query(
      'SELECT id FROM public.users WHERE email = $1',
      [session.user.email]
    );
    const userId = userResult.rows[0].id;

    // 2. Delete the review only if it belongs to this user
    const deleteResult = await pool.query(
      'DELETE FROM public.product_reviews WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );

    if (deleteResult.rowCount === 0) {
      return NextResponse.json({ error: "Review not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("DELETE_REVIEW_ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}