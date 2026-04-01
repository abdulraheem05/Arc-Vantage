import { pool } from "@/lib/db";
import Link from "next/link";

async function getRelated(currentId) {
  const res = await pool.query(
    `SELECT id, name, slug, image_url, price_lkr 
     FROM products 
     WHERE id != $1 AND active = true 
     ORDER BY RANDOM() 
     LIMIT 4`,
    [currentId]
  );
  return res.rows;
}

export default async function RelatedProducts({ currentId }) {
  // We no longer need 'category' as a prop for the query
  const related = await getRelated(currentId);

  if (related.length === 0) return null;

  return (
    <section className="border-t border-black/5 pt-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="font-display text-[20px] font-bold uppercase tracking-[0.1em] text-black mb-4">
          You Also Might Like
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {related.map((p) => (
          <Link href={`/product/${p.slug}`} key={p.id} className="group flex flex-col items-center">
            <div className="w-full aspect-[4/5] bg-[#F9F9F9] rounded-[32px] overflow-hidden mb-6 shadow-sm border border-black/5">
              <img 
                src={p.image_url} 
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-center group-hover:text-[#966B4E] transition-colors">
              {p.name}
            </h3>
            <p className="text-[14px] text-black/40 mt-2 font-medium">
              Rs. {Number(p.price_lkr).toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}