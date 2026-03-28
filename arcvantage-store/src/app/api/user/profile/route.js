import { pool } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Selecting exactly the names in your table
    const res = await pool.query(
      "SELECT name, phone, delivery_address, city, postal_code, profile_complete FROM users WHERE email = $1",
      [session.user.email]
    );
    return NextResponse.json(res.rows[0] || {});
  } catch (error) {
    console.error("DB_GET_ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, phone, delivery_address, city, postal_code } = await req.json();

    // Logic: If these 5 fields are present, profile_complete is true
    const isComplete = !!(name && phone && delivery_address && city && postal_code);

    const result = await pool.query(
      `UPDATE users SET 
        name = $1, 
        phone = $2, 
        delivery_address = $3, 
        city = $4, 
        postal_code = $5, 
        profile_complete = $6,
        updated_at = NOW()
       WHERE email = $7
       RETURNING name, phone, delivery_address, city, postal_code, profile_complete`,
      [name, phone, delivery_address, city, postal_code, isComplete, session.user.email]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("DB_POST_ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}