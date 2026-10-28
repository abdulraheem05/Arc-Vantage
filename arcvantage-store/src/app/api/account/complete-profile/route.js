
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { pool } from "@/lib/db";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Please sign in to complete your profile." },
        { status: 401 }
      );
    }

    const { phone, line1, city, postalCode } = await request.json();

    if (!phone?.trim() || !line1?.trim() || !city?.trim() || !postalCode?.trim()) {
      return NextResponse.json(
        { error: "Please fill in all fields." },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `UPDATE users
       SET phone = $1,
           delivery_address = $2,
           city = $3,
           postal_code = $4,
           profile_complete = TRUE,
           updated_at = NOW()
       WHERE id = $5
       RETURNING id`,
      [
        phone.trim(),
        line1.trim(),
        city.trim(),
        postalCode.trim(),
        session.user.id,
      ]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "User account not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Profile updated successfully." });
  } catch (error) {
    console.error("Complete profile API error:", error);

    return NextResponse.json(
      { error: "Unable to save your profile. Please try again." },
      { status: 500 }
    );
  }
}
