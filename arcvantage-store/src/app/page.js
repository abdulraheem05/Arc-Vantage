import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">
          Kitchen & household essentials<span className="text-green-700">.</span>
        </h1>
        <p className="mt-3 text-black/60 max-w-xl">
          Knives, spice bottles, baking items, and minimal home supplies — clean quality, fair price.
        </p>

        <div className="mt-8 flex gap-3">
          <a
            href="/shop"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-black text-white font-medium hover:bg-black/90 transition"
          >
            Shop now
          </a>
        </div>
      </main>
    </div>
  );
}
