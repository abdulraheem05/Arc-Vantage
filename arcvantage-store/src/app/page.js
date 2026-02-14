"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/70 mb-4">You’re not signed in.</p>
          <Link
            href="/login"
            className="inline-block bg-green-500 text-black px-5 py-3 rounded-xl font-medium hover:bg-green-400 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-lg border border-white/10 bg-white/5 rounded-2xl p-8">
        <h1 className="text-2xl font-semibold">Signed in ✅</h1>
        <p className="text-white/60 mt-2">
          {session.user?.name} — {session.user?.email}
        </p>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-6 bg-white text-black px-5 py-3 rounded-xl font-medium hover:bg-white/90 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
