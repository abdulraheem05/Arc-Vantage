// app/shop/[category]/page.js
import FilterSideBar from "../FilterSideBar";
import ProductGrid from "../ProductGrid";

export default async function CategoryPage({ params, searchParams }) {
  const { category } = await params;
  
  // Format the title (e.g., 'baking' -> 'Baking Collection')
  const displayTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <main className="max-w-[1400px] mx-auto px-10 pt-36 pb-16">
      <div className="grid grid-cols-12 gap-10">
        <aside className="col-span-12 lg:col-span-3">
          <FilterSideBar />
        </aside>

        <section className="col-span-12 lg:col-span-9">
          <ProductGrid 
            searchParams={{ ...searchParams, category }} 
            title={`${displayTitle} Collection`} 
          />
        </section>
      </div>
    </main>
  );
}