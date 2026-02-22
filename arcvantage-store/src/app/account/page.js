"use client";

import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AccountPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-6 py-16 text-black/60">Loading…</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-black/70">You’re not logged in.</p>
          <Link className="text-green-700 font-medium hover:underline" href="/login">
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 min-h-screen bg-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-semibold">Account</h1>
        <p className="mt-2 text-black/60">{session.user?.email}</p>
      </div>
    </div>
  );
}
