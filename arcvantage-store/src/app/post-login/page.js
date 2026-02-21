import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { pool } from "@/lib/db";

export default async function PostLogin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  // adjust table/column names to match YOUR DB:
  // If your table is `users` and column is `profile_complete`, use that query.
  const result = await pool.query(
    "SELECT profile_complete FROM users WHERE id = $1",
    [session.user.id]
  );

  const user = result.rows[0];
  if (!user) redirect("/login");

  if (!user.profile_complete) redirect("/complete-profile");

  redirect("/");
}