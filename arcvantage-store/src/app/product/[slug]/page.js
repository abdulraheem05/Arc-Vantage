
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { pool } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import RelatedProducts from "@/components/RelatedProducts";
import ProductActions from "./ProductActions";
import ReviewSection from "./ReviewSection";
import { getProductReviews } from "./ReviewActions";
import {
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

async function getProduct(slug) {
  const res = await pool.query(
    "SELECT * FROM products WHERE slug = $1 AND active = true",
    [slug]
  );

  return res.rows[0];
}

export default async function ProductPage({ params }) {
  const session = await getServerSession(authOptions);
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) notFound();

  const reviews = await getProductReviews(product.id);

  return (
    <div className="min-h-screen bg-[#FCFCFC] pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
      {/* Wider side padding on mobile for a more comfortable layout */}
      <main className="mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-10 xl:px-12">

        {/* MOBILE BACK NAVIGATION */}
        <Link
          href="/shop"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-black/65 transition-colors hover:text-[#966B4E] lg:hidden"
        >
          <ArrowLeft size={18} strokeWidth={1.8} />
          <span>Back to shop</span>
        </Link>

        {/* PRODUCT LAYOUT */}
        <div className="grid grid-cols-1 items-start gap-9 sm:gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-20 xl:gap-24">

          {/* PRODUCT IMAGE */}
          <div className="relative min-w-0 w-full">
            <div className="overflow-hidden rounded-[24px] border border-black/5 bg-white shadow-[0_12px_35px_rgba(0,0,0,0.055)] sm:rounded-[32px] lg:rounded-[40px] lg:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
              <div className="flex h-[330px] w-full items-center justify-center sm:h-[440px] lg:h-auto lg:min-h-[500px]">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* PRODUCT DETAILS */}
          <div className="flex min-w-0 flex-col">

            {/* BRAND, TITLE AND PRICE */}
            <div className="space-y-4 border-b border-black/5 pb-8 sm:pb-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#966B4E] sm:text-[11px] sm:tracking-[0.4em]">
                {product.brand || "Arcvantage"}
              </p>

              <h1 className="break-words font-cinzel text-[30px] font-medium leading-[1.18] tracking-tight text-black sm:text-4xl lg:text-5xl lg:leading-[1.1]">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-3 pt-1 sm:gap-x-6">
                <div className="text-[26px] font-light text-black/90 sm:text-3xl">
                  Rs. {Number(product.price_lkr).toLocaleString()}
                </div>

                <div
                  className="flex items-center gap-1 text-[#FFB800]"
                  aria-label="5 out of 5 stars"
                >
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>

            {/* PURCHASE ACTIONS */}
            <div className="w-full py-8 sm:py-10">
              <ProductActions product={product} />
            </div>

            {/* DESCRIPTION AND SHIPPING */}
            <div className="space-y-10 sm:space-y-12">

              <section>
                <h3 className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-black">
                  The Detail
                </h3>

                <p className="text-[14px] font-light leading-[1.9] text-black/70 sm:text-base">
                  {product.detailed_description || product.description}
                </p>
              </section>

              {/* DELIVERY AND RETURNS */}
              <section className="border-t border-black/5 pt-9 sm:pt-12">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-9 lg:grid-cols-3 lg:gap-10">

                  {/* LOCAL DELIVERY */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-black">
                      <Truck size={18} strokeWidth={1.5} />
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em]">
                        Local Delivery
                      </h3>
                    </div>

                    <div className="space-y-1 pl-[30px]">
                      <p className="text-[13px] font-medium text-black/90">
                        Colombo &amp; Suburbs
                      </p>
                      <p className="text-[12px] text-black/50">
                        1 — 3 Business Days
                      </p>
                    </div>
                  </div>

                  {/* ISLANDWIDE SHIPPING */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-black">
                      <ShieldCheck size={18} strokeWidth={1.5} />
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em]">
                        Islandwide
                      </h3>
                    </div>

                    <div className="space-y-1 pl-[30px]">
                      <p className="text-[13px] font-medium text-black/90">
                        All Other Districts
                      </p>
                      <p className="text-[12px] text-black/50">
                        3 — 5 Business Days
                      </p>
                    </div>
                  </div>

                  {/* RETURNS */}
                  <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center gap-3 text-[#966B4E]">
                      <RotateCcw size={18} strokeWidth={1.5} />
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em]">
                        Our Promise
                      </h3>
                    </div>

                    <div className="space-y-1 pl-[30px]">
                      <p className="text-[13px] font-medium text-black/90">
                        7-Day Easy Returns
                      </p>
                      <p className="text-[12px] italic leading-relaxed text-black/40">
                        Full protection for manufacturing defects.
                      </p>
                    </div>
                  </div>

                </div>
              </section>
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <div className="mt-14 sm:mt-16 lg:mt-20">
          <ReviewSection
            productId={product.id}
            initialReviews={reviews}
            userId={session?.user?.id}
          />
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-14 sm:mt-16 lg:mt-20">
          <RelatedProducts currentId={product.id} />
        </div>

      </main>
    </div>
  );
}
