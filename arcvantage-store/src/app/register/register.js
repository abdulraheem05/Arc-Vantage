"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_60px_rgba(34,197,94,0.12)]">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="text-white/60 mt-2">
            Earn <span className="text-green-400 font-medium">1 point</span> for
            every <span className="text-green-400 font-medium">LKR 100</span>.
          </p>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full rounded-xl px-4 py-3 font-medium bg-green-500 text-black hover:bg-green-400 transition active:scale-[0.99]"
        >
          Sign up with Google
        </button>

        <p className="text-white/60 text-sm mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-green-400 hover:text-green-300 underline underline-offset-4"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
