import { pool } from "@/lib/db";
import { notFound } from "next/navigation";
import RelatedProducts from "@/components/RelatedProducts"; 
import { Heart, ShoppingBag, Zap, Star, MessageSquarePlus } from "lucide-react";

async function getProduct(slug) {
  const res = await pool.query(
    "SELECT * FROM products WHERE slug = $1 AND active = true",
    [slug]
  );
  return res.rows[0];
}

async function getReviewCount(productId) {
    // This assumes you will eventually have a reviews table
    // For now, returning 0 to show the "Add Review" state
    return 0; 
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  const reviewCount = await getReviewCount(product?.id);

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <main className="max-w-[1400px] mx-auto px-10">
        
        {/* MAIN PRODUCT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT: Image Container */}
          <div className="bg-[#F9F9F9] rounded-2xl aspect-[4/5] flex items-center justify-center p-12">
            <img 
              src={product.image_url} 
              alt={product.name} 
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>

          {/* RIGHT: Details Area */}
          <div className="flex flex-col">
            <div className="space-y-4 border-b border-black/5 pb-8">
              <p className="text-[11px] font-bold tracking-[0.3em] text-black/40 uppercase">
                {product.brand || 'Arcvantage'}
              </p>
              <h1 className="font-cinzel text-4xl font-bold tracking-tight">
                {product.name}
              </h1>
              <div className="text-2xl font-semibold">
                Rs. {Number(product.price_lkr).toLocaleString()}
              </div>
            </div>

            {/* MINIMAL ACTION BAR */}
            <div className="py-10">
              <div className="flex items-center gap-3">
                <button className="flex-[2] h-14 bg-black text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black/90 transition flex items-center justify-center gap-2">
                  <Zap size={16} fill="white" /> Buy Now
                </button>
                <button className="flex-[2] h-14 border border-black rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition flex items-center justify-center gap-2">
                  <ShoppingBag size={16} /> Add to Cart
                </button>
                <button className="h-14 w-14 flex items-center justify-center border border-black/10 rounded-xl hover:bg-red-50 hover:border-red-100 group transition">
                  <Heart size={20} className="text-black/40 group-hover:text-red-500 group-hover:fill-red-500 transition-colors" />
                </button>
              </div>
            </div>

            {/* STACKED INFORMATION */}
            <div className="space-y-12">
              {/* 1. Description */}
              <section>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4 text-black/90">Description</h3>
                <p className="text-black/60 leading-relaxed text-[15px]">
                  {product.detailed_description || product.description}
                </p>
              </section>

              {/* 2. Shipping (One below the other) */}
              <section className="pt-8 border-t border-black/5">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4 text-black/90">Shipping & Returns</h3>
                <div className="text-[14px] text-black/60 space-y-2">
                  <p>• Delivery within Colombo: 1-3 Business Days</p>
                  <p>• Islandwide Delivery: 3-5 Business Days</p>
                  <p>• 7-day easy return policy for manufacturing defects.</p>
                </div>
              </section>

              {/* 3. Reviews Logic */}
              <section className="pt-8 border-t border-black/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/90">Reviews</h3>
                  {reviewCount > 0 && (
                     <div className="flex items-center gap-1 text-sm font-bold">
                        <Star size={14} fill="currentColor" className="text-yellow-500" />
                        <span>({reviewCount})</span>
                     </div>
                  )}
                </div>

                {reviewCount === 0 ? (
                  <button className="flex items-center gap-3 text-black/40 hover:text-black transition-colors group">
                    <div className="p-3 bg-black/5 rounded-full group-hover:bg-black/10">
                      <MessageSquarePlus size={18} />
                    </div>
                    <span className="text-[12px] font-bold uppercase tracking-widest">Be the first to write a review</span>
                  </button>
                ) : (
                  <div className="text-sm text-black/60">
                    {/* Map your reviews here later */}
                    Displaying top verified reviews...
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-32">
          <RelatedProducts category={product.category} currentId={product.id} />
        </div>
      </main>
    </div>
  );
}