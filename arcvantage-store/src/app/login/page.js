
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
      />
      <path
        fill="#34A853"
        d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
      />
      <path
        fill="#FBBC05"
        d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"
      />
      <path
        fill="#EA4335"
        d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8A19.4 19.4 0 0 0 24 4 20 20 0 0 0 5.8 15.1l6.8 5.3C14.2 15.6 18.7 12 24 12Z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleCredentials = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/post-login",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex mt-22 min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-[#faf9f6] px-5 py-10 text-[#202124]">          

      <section className="relative w-full max-w-[420px] rounded-[32px] border border-black/[0.06] bg-white/90 p-7 shadow-[0_12px_50px_rgba(0,0,0,0.045)] backdrop-blur-xl sm:p-10">
        <div className="mb-5 text-center">

          <h1 className="mt-8 text-3xl font-medium tracking-tight">
            Welcome back
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#737373]">
            Sign in to continue to your account.
          </p>
        </div>

        <form onSubmit={handleCredentials} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-13 w-full rounded-full border border-[#dadce0] bg-white px-5 text-sm outline-none transition-all placeholder:text-[#858585] hover:border-[#aeb4bb] focus:border-[#4285f4] focus:ring-4 focus:ring-[#4285f4]/10"
            />
          </div>

          
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-13 w-full rounded-full border border-[#dadce0] bg-white py-3 pl-5 pr-12 text-sm outline-none transition-all placeholder:text-[#858585] hover:border-[#aeb4bb] focus:border-[#4285f4] focus:ring-4 focus:ring-[#4285f4]/10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[#737373] transition-colors hover:bg-gray-100 hover:text-[#202124] focus:outline-none focus:ring-2 focus:ring-[#4285f4]/30"
            >
              {showPassword ? (
                <Eye size={18} strokeWidth={1.8} />
              ) : (
                <EyeOff size={18} strokeWidth={1.8} />
              )}
            </button>
          </div>


          <button
            type="submit"
            disabled={loading}
            className="flex h-13 w-full items-center justify-center rounded-full bg-[#202124] px-5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#3c4043] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#e8eaed]" />
          <span className="text-xs text-[#858585]">OR</span>
          <div className="h-px flex-1 bg-[#e8eaed]" />
        </div>

        <button
          type="button"
          onClick={() =>
            signIn("google", { callbackUrl: "/post-login" })
          }
          className="flex h-13 w-full items-center justify-center gap-3 rounded-full border border-[#dadce0] bg-white px-5 text-sm font-medium text-[#3c4043] transition-all duration-200 hover:border-[#b8bdc4] hover:bg-[#f8faff] hover:shadow-sm active:scale-[0.98]"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <p className="mt-8 text-center text-sm text-[#737373]">
          New to Arc Vantage?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#202124] underline decoration-[#b8bdc4] underline-offset-4 transition-colors hover:text-[#4285f4]"
          >
            Create an account
          </Link>
        </p>

        <p className="mt-7 text-center text-xs text-[#9aa0a6]">
          By continuing, you agree to shop with Arc Vantage.
        </p>
      </section>
    </main>
  );
}
