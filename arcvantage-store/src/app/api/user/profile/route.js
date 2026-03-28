import { pool } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { full_name, phone, delivery_address, city, postal_code } = await req.json();

  // Logic: If these core fields are present, profile_complete = true
  const isComplete = !!(full_name && phone && delivery_address && city);

  await pool.query(
    `UPDATE users SET 
      full_name = $1, phone = $2, delivery_address = $3, 
      city = $4, postal_code = $5, profile_complete = $6,
      updated_at = NOW()
     WHERE email = $7`,
    [full_name, phone, delivery_address, city, postal_code, isComplete, session.user.email]
  );

  return NextResponse.json({ message: "Profile updated", isComplete });
}