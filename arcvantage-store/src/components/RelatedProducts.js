import { pool } from "@/lib/db";
import Link from "next/link";

async function getRelated(category, currentId) {
  const res = await pool.query(
    "SELECT * FROM products WHERE category = $1 AND id != $2 AND active = true LIMIT 4",
    [category, currentId]
  );
  return res.rows;
}

export default async function RelatedProducts({ category, currentId }) {
  const related = await getRelated(category, currentId);

  if (related.length === 0) return null;

  return (
    <section className="border-t border-black/5 pt-20">
      <h2 className="font-cinzel text-2xl font-bold uppercase tracking-widest mb-12">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {related.map((p) => (
          <Link href={`/product/${p.slug}`} key={p.id} className="group">
            <div className="aspect-[4/5] bg-[#F6F6F6] rounded-2xl overflow-hidden mb-4">
              <img 
                src={p.image_url} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
            </div>
            <h3 className="text-[13px] font-bold uppercase tracking-wider">{p.name}</h3>
            <p className="text-[13px] text-black/50 mt-1">Rs. {Number(p.price_lkr).toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}