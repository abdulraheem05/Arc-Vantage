import { pool } from "@/lib/db";
import { notFound } from "next/navigation";
import RelatedProducts from "@/components/RelatedProducts"; 
import ProductActions from "./ProductActions"; // Import our new client component
import { Star, MessageSquarePlus } from "lucide-react";

async function getProduct(slug) {
  const res = await pool.query(
    "SELECT * FROM products WHERE slug = $1 AND active = true",
    [slug]
  );
  return res.rows[0];
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <main className="max-w-[1400px] mx-auto px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT: Image */}
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

            {/* ACTION BAR (Now a separate Client Component) */}
            <div className="py-10">
               <ProductActions product={product} />
            </div>

            {/* STACKED INFORMATION */}
            <div className="space-y-12">
              <section>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4 text-black/90">Description</h3>
                <p className="text-black/60 leading-relaxed text-[15px]">
                  {product.detailed_description || product.description}
                </p>
              </section>

              <section className="pt-8 border-t border-black/5 text-[14px] text-black/60 space-y-2">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4 text-black/90">Shipping & Returns</h3>
                <p>• Delivery within Colombo: 1-3 Business Days</p>
                <p>• Islandwide Delivery: 3-5 Business Days</p>
                <p>• 7-day easy return policy for manufacturing defects.</p>
              </section>

              <section className="pt-8 border-t border-black/5">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4 text-black/90">Reviews</h3>
                <button className="flex items-center gap-3 text-black/40 hover:text-black transition-colors group">
                  <div className="p-3 bg-black/5 rounded-full group-hover:bg-black/10">
                    <MessageSquarePlus size={18} />
                  </div>
                  <span className="text-[12px] font-bold uppercase tracking-widest">Be the first to write a review</span>
                </button>
              </section>
            </div>
          </div>
        </div>

        <div className="mt-32">
          <RelatedProducts category={product.category} currentId={product.id} />
        </div>
      </main>
    </div>
  );
}