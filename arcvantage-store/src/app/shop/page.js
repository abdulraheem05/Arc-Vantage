//import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";

export default function ShopPage({ searchParams }) {
  return (
    <main className="max-w-[1400px] mx-auto px-10 pt-36 pb-16">
      <div className="grid grid-cols-12 gap-10">
        <aside className="col-span-12 lg:col-span-3">
         
        </aside>

        <section className="col-span-12 lg:col-span-9">
          <ProductGrid searchParams={searchParams} />
        </section>
      </div>
    </main>
  );
}