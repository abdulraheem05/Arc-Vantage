"use client";

export default function SiteFooter() {
  const year = 2026;

  return (
    <footer className="border-t border-black/20 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-display text-xl font-semibold tracking-tight text-slate-900">
              ARCVANTAGE<span className="text-green-700">.</span>
            </div>

            <p className="mt-4 text-gray-500 text-sm leading-relaxed">
              Minimal kitchenware and home supplies—clean quality, fair price.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a className="text-sm text-gray-500 hover:text-slate-900 transition" href="#">
                Instagram
              </a>
              <span className="text-gray-300">•</span>
              <a className="text-sm text-gray-500 hover:text-slate-900 transition" href="#">
                TikTok
              </a>
              <span className="text-gray-300">•</span>
              <a className="text-sm text-gray-500 hover:text-slate-900 transition" href="#">
                Pinterest
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gray-400">
              Shop
            </h4>

            <ul className="mt-5 space-y-3 text-sm">
              <li><a className="text-gray-500 hover:text-slate-900 transition" href="#">Baking Utensils</a></li>
              <li><a className="text-gray-500 hover:text-slate-900 transition" href="#">Cookware</a></li>
              <li><a className="text-gray-500 hover:text-slate-900 transition" href="#">Tableware</a></li>
              <li><a className="text-gray-500 hover:text-slate-900 transition" href="#">Containers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gray-400">
              Support
            </h4>

            <ul className="mt-5 space-y-3 text-sm">
              <li><a className="text-gray-500 hover:text-slate-900 transition" href="#">Contact</a></li>
              <li><a className="text-gray-500 hover:text-slate-900 transition" href="#">Shipping & Delivery</a></li>
              <li><a className="text-gray-500 hover:text-slate-900 transition" href="#">Returns & Refunds</a></li>
              <li><a className="text-gray-500 hover:text-slate-900 transition" href="#">FAQs</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gray-400">
              Newsletter
            </h4>

            <p className="mt-5 text-gray-500 text-sm leading-relaxed">
              New arrivals, minimal home tips, and early access drops.
            </p>

            <div className="mt-5 flex gap-3">
              <input
                className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/25"
                placeholder="Email address"
              />
              <button className="px-5 py-3 rounded-2xl bg-slate-900 text-white text-sm font-medium hover:opacity-95 transition">
                Join
              </button>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-black/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {year} ARCVANTAGE. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a className="text-gray-500 hover:text-slate-900 transition" href="#">
              Privacy Policy
            </a>
            <a className="text-gray-500 hover:text-slate-900 transition" href="#">
              Terms
            </a>
            <a className="text-gray-500 hover:text-slate-900 transition" href="#">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}