"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-black/10 p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
        <p className="mt-1 text-sm text-black/60">
          Continue with Google to access your account and points.
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="mt-6 w-full rounded-xl bg-black px-4 py-3 font-medium text-white hover:bg-black/90 transition"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-sm text-black/60">
          Back to{" "}
          <Link className="font-medium text-green-700 hover:underline" href="/">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
