
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserRound, MapPin, Phone, ArrowRight } from "lucide-react";

export default function CompleteProfile() {
  const router = useRouter();

  const [form, setForm] = useState({
    phone: "",
    line1: "",
    city: "",
    postalCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/account/complete-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(
          data.error ||
            data.message ||
            "Unable to save your profile. Please try again."
        );
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "h-13 w-full rounded-full border border-[#dadce0] bg-white px-5 text-sm outline-none transition-all placeholder:text-[#858585] hover:border-[#aeb4bb] focus:border-[#4285f4] focus:ring-4 focus:ring-[#4285f4]/10";

  return (
    <main className="relative mt-12 flex min-h-[calc(100vh-80px)] items-start justify-center overflow-hidden bg-[#faf9f6] px-5 pb-12 pt-12 text-[#202124] sm:pt-14">
      {/* Soft ambient background */}
    
      <section className="relative my-4 w-full max-w-[460px] rounded-[32px] border border-black/[0.06] bg-white/90 p-7 shadow-[0_12px_50px_rgba(0,0,0,0.045)] backdrop-blur-xl sm:p-10">
        <div className="mb-8 text-center">

          <div className="mx-auto mt-2 flex h-14 w-14 items-center justify-center rounded-full bg-[#eef4ff] text-[#4285f4]">
            <UserRound size={25} strokeWidth={1.7} />
          </div>

          <h1 className="mt-5 text-3xl font-medium tracking-tight">
            Complete your profile
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#737373]">
            Add your contact and delivery details for a smoother shopping experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="phone"
              className="mb-2 ml-4 block text-xs font-medium text-[#5f6368]"
            >
              Phone number
            </label>
            <div className="relative">
              <Phone
                size={17}
                strokeWidth={1.7}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-[#858585]"
              />
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
                className={`${inputClass} pl-12`}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="line1"
              className="mb-2 ml-4 block text-xs font-medium text-[#5f6368]"
            >
              Address line 1
            </label>
            <div className="relative">
              <MapPin
                size={17}
                strokeWidth={1.7}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-[#858585]"
              />
              <input
                id="line1"
                name="line1"
                type="text"
                autoComplete="street-address"
                required
                placeholder="House number and street"
                value={form.line1}
                onChange={handleChange}
                className={`${inputClass} pl-12`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="city"
                className="mb-2 ml-4 block text-xs font-medium text-[#5f6368]"
              >
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                autoComplete="address-level2"
                required
                placeholder="Your city"
                value={form.city}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="postalCode"
                className="mb-2 ml-4 block text-xs font-medium text-[#5f6368]"
              >
                Postal code
              </label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                autoComplete="postal-code"
                required
                placeholder="Postal code"
                value={form.postalCode}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
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
            className="group flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#202124] px-5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#3c4043] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Saving details..." : "Save and continue"}
            {!loading && (
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            )}
          </button>
        </form>

        <p className="mt-7 text-center text-xs leading-5 text-[#9aa0a6]">
          Your details help us manage deliveries and orders.
        </p>
      </section>
    </main>
  );
}
