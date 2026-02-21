"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(form),
    });

    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[400px] space-y-6">
        <h1 className="text-2xl font-semibold">Sign Up</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input placeholder="First Name"
            className="w-full border p-3 rounded"
            onChange={(e) => setForm({...form, firstName: e.target.value})}
          />
          <input placeholder="Last Name"
            className="w-full border p-3 rounded"
            onChange={(e) => setForm({...form, lastName: e.target.value})}
          />
          <input placeholder="Email"
            className="w-full border p-3 rounded"
            onChange={(e) => setForm({...form, email: e.target.value})}
          />
          <input type="password" placeholder="Password"
            className="w-full border p-3 rounded"
            onChange={(e) => setForm({...form, password: e.target.value})}
          />

          <button className="w-full bg-black text-white p-3 rounded">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}