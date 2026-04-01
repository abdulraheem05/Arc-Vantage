"use client";

export default function AddReviewCTA() {
  return (
    <section className="max-w-[1350px] mx-auto px-6 pb-20">
      <div className="rounded-[2.5rem] border border-black/20 bg-white p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-900">
            Leave a review
          </h3>
          <p className="mt-2 text-gray-500 max-w-xl">
            Help others choose better—share your honest experience in under a minute.
          </p>
        </div>

        <div className="w-full md:w-[420px]">
          <div className="grid grid-cols-1 gap-3">
            <input
              className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/25"
              placeholder="Your name"
            />

            <textarea
              rows={3}
              className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/25 resize-none"
              placeholder="Write your review..."
            />

            <div className="flex items-center justify-between gap-3">
              <select className="rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/40 bg-white">
                <option>Rating</option>
                <option>★★★★★ (5)</option>
                <option>★★★★☆ (4)</option>
                <option>★★★☆☆ (3)</option>
                <option>★★☆☆☆ (2)</option>
                <option>★☆☆☆☆ (1)</option>
              </select>

              <button className="px-6 py-3 rounded-full bg-[#966B4E] text-white text-sm font-medium hover:scale-[1.02] transition">
                Submit
              </button>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              By submitting, you agree that your review may be displayed publicly on ARC VANTAGE.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}