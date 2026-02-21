"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CompleteProfile() {
  const router = useRouter();
  const [form, setForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/account/complete-profile", {
      method: "POST",
      body: JSON.stringify(form),
    });

    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[500px] space-y-6">
        <h1 className="text-2xl font-semibold">Complete Your Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input placeholder="Phone"
            className="w-full border p-3 rounded"
            onChange={(e) => setForm({...form, phone: e.target.value})}
          />
          <input placeholder="Address Line 1"
            className="w-full border p-3 rounded"
            onChange={(e) => setForm({...form, line1: e.target.value})}
          />
          <input placeholder="City"
            className="w-full border p-3 rounded"
            onChange={(e) => setForm({...form, city: e.target.value})}
          />
          <input placeholder="Postal Code"
            className="w-full border p-3 rounded"
            onChange={(e) => setForm({...form, postalCode: e.target.value})}
          />

          <button className="w-full bg-black text-white p-3 rounded">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}