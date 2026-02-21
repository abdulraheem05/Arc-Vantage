"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentials = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/post-login",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[400px] space-y-6">
        <h1 className="text-2xl font-semibold">Login</h1>

        <form onSubmit={handleCredentials} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-black text-white p-3 rounded">
            Login
          </button>
        </form>

        <button
          onClick={() => signIn("google", { callbackUrl: "/post-login" })}
          className="w-full border p-3 rounded"
        >
          Continue with Google
        </button>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}