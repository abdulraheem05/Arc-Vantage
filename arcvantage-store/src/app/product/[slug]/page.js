// app/product/[slug]/page.js
import { pool } from "@/lib/db";
import { notFound } from "next/navigation";
import RelatedProducts from "@/components/RelatedProducts"; 
import ProductActions from "./ProductActions";
import ReviewSection from "./ReviewSection"; // New component below
import { Star } from "lucide-react";

async function getProduct(slug) {
  const res = await pool.query(
    "SELECT * FROM products WHERE slug = $1 AND active = true",
    [slug]
  );
  return res.rows[0];
}

// app/product/[slug]/page.js
export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-[#FCFCFC] pt-40 pb-20"> {/* Standardized top padding */}
      <main className="max-w-[1400px] mx-auto px-10">
        
        {/* Changed to items-stretch to help alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
        
          {/* LEFT: Image Section */}
          <div className="relative">
            <div className="lg:top-40"> 
              <div className="bg-white rounded-[40px] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-black/5 overflow-hidden group min-h-[500px]">
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  // Changed to w-full h-auto to prevent forced stretching
                  className="w-full h-auto max-h-[600px] object-contain mix-blend-multiply group-hover:scale-101 transition-transform duration-200"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Details Area */}
          <div className="flex flex-col">
            {/* Removed internal padding-top so text starts exactly where the image box starts */}
            <div className="space-y-4 border-b border-black/5 pb-10">
              <p className="text-[11px] font-bold tracking-[0.4em] text-[#966B4E] uppercase">
                {product.brand || 'Arcvantage'}
              </p>
              <h1 className="font-cinzel text-4xl lg:text-5xl font-medium tracking-tight text-black leading-[1.1]">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-6 mt-4">
                <div className="text-3xl font-light text-black/90">
                  Rs. {Number(product.price_lkr).toLocaleString()}
                </div>
                <div className="flex items-center gap-1 text-[#FFB800]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>

            <div className="py-10">
               <ProductActions product={product} />
            </div>

            <div className="space-y-12">
              <section>
                <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] mb-4 text-black">The Detail</h3>
                <p className="text-black/70 leading-relaxed text-[16px] font-light">
                  {product.detailed_description || product.description}
                </p>
              </section>

              {/* Keep other sections... */}
              <ReviewSection productId={product.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}