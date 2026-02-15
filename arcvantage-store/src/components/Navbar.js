"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-black/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          ArcVantage<span className="text-green-700">.</span>
        </Link>

        <nav className="flex items-center gap-3">
          <Link href="/shop" className="text-sm text-black/70 hover:text-black">
            Shop
          </Link>

          {status === "loading" ? (
            <div className="w-20 h-9 rounded-lg bg-black/5 animate-pulse" />
          ) : !user ? (
            <Link
              href="/login"
              className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-black/90 transition"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/account"
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-black/10 hover:bg-black/[0.03] transition"
              >
                <div className="w-7 h-7 rounded-full bg-green-600/15 flex items-center justify-center text-green-800 font-semibold">
                  {(user.name || "U").slice(0, 1).toUpperCase()}
                </div>
                <span className="text-sm font-medium">{user.name || "Account"}</span>
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm px-3 py-2 rounded-lg border border-black/10 hover:bg-black/[0.03] transition"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
