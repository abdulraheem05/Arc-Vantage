import FilterSideBar from "../FilterSideBar";
import MobileFilters from "../MobileFilters";
import ProductGrid from "../ProductGrid";

export default async function CategoryPage({ params, searchParams }) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;

  const displayTitle =
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 pb-12 pt-8 sm:px-6 sm:pt-12 lg:px-10 lg:pt-36">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <aside className="hidden lg:col-span-3 lg:block">
          <FilterSideBar />
        </aside>

        <section className="min-w-0 lg:col-span-9">
          <MobileFilters />

          <ProductGrid
            searchParams={{ ...resolvedSearchParams, category }}
            title={`${displayTitle} Collection`}
          />
        </section>
      </div>
    </main>
  );
}