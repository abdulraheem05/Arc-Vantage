
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message || data.error || "Unable to create your account. Please try again.");
        return;
      }

      router.push("/login");
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative mt-12 flex min-h-[calc(100vh-80px)] items-start justify-center overflow-hidden bg-[#faf9f6] px-5 pb-12 pt-12 text-[#202124] sm:pt-14">
      {/* Soft ambient background */}
      
      <section className="relative my-4 w-full max-w-[440px] rounded-[32px] border border-black/[0.06] bg-white/90 p-7 shadow-[0_12px_50px_rgba(0,0,0,0.045)] backdrop-blur-xl sm:p-10">
        <div className="mb-8 text-center">


          <h1 className="mt-7 text-3xl font-medium tracking-tight">
            Create your account
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#737373]">
            Join Arc Vantage for a better shopping experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="sr-only">
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
                className="h-13 w-full rounded-full border border-[#dadce0] bg-white px-5 text-sm outline-none transition-all placeholder:text-[#858585] hover:border-[#aeb4bb] focus:border-[#4285f4] focus:ring-4 focus:ring-[#4285f4]/10"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="sr-only">
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
                className="h-13 w-full rounded-full border border-[#dadce0] bg-white px-5 text-sm outline-none transition-all placeholder:text-[#858585] hover:border-[#aeb4bb] focus:border-[#4285f4] focus:ring-4 focus:ring-[#4285f4]/10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="h-13 w-full rounded-full border border-[#dadce0] bg-white px-5 text-sm outline-none transition-all placeholder:text-[#858585] hover:border-[#aeb4bb] focus:border-[#4285f4] focus:ring-4 focus:ring-[#4285f4]/10"
            />
          </div>

          
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={8}
              placeholder="Create a password (8+ characters)"
              value={form.password}
              onChange={handleChange}
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


          {error && (
            <p
              role="alert"
              className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex h-13 w-full items-center justify-center rounded-full bg-[#202124] px-5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#3c4043] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#e8eaed]" />
          <span className="text-xs text-[#858585]">OR</span>
          <div className="h-px flex-1 bg-[#e8eaed]" />
        </div>

        <p className="text-center text-sm text-[#737373]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#202124] underline decoration-[#b8bdc4] underline-offset-4 transition-colors hover:text-[#4285f4]"
          >
            Sign in
          </Link>
        </p>

        <p className="mt-7 text-center text-xs leading-5 text-[#9aa0a6]">
          Your account helps you manage your profile and orders in one place.
        </p>
      </section>
    </main>
  );
}
