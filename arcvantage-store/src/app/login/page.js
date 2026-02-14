"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_60px_rgba(34,197,94,0.12)]">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-white/60 mt-2">
            Sign in to earn points on every purchase.
          </p>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full rounded-xl px-4 py-3 font-medium bg-green-500 text-black hover:bg-green-400 transition active:scale-[0.99]"
        >
          Continue with Google
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-white/40 text-sm">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          disabled
          className="w-full rounded-xl px-4 py-3 font-medium border border-white/10 text-white/40 cursor-not-allowed"
        >
          Email/password (coming soon)
        </button>

        <p className="text-white/60 text-sm mt-6">
          New here?{" "}
          <Link
            href="/register"
            className="text-green-400 hover:text-green-300 underline underline-offset-4"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
