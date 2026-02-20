import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";

export default function ShopPage({ searchParams }) {
  return (
    <main className="max-w-[1400px] mx-auto px-10 pt-36 pb-16">
      <div className="grid grid-cols-12 gap-10">
        {/* Sidebar */}
        <aside className="col-span-3">
          <FilterSidebar searchParams={searchParams} />
        </aside>

        {/* Products */}
        <section className="col-span-9">
          <ProductGrid searchParams={searchParams} />
        </section>
      </div>
    </main>
  );
}