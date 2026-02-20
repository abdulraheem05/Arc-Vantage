"use client";
import ArrivalCard from "./ArrivalCard";

export default function ExploreSection() {
  return (
    <section className="mt-20">
      {/* ADD THIS WRAPPER to align with the rest of the site */}
      <div className="max-w-7.5xl mx-auto px-6">
        <div className="rounded-[2.5rem] bg-neutral-50/70 border border-black/5 p-8 md:p-16">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-display text-3xl font-bold tracking-tight uppercase">
              Explore
            </h2>

            <button className="px-6 py-2 border-2 border-[#966B4E] text-[#966B4E] rounded-full text-sm font-bold tracking-widest hover:bg-[#966B4E] hover:text-white transition-colors">
              VIEW ALL COLLECTIONS
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
            <ArrivalCard
              title="Baking Utensils"
              img="baking.jpg"
              className="md:col-span-2 md:row-span-2"
              size="tall"
            />
            <ArrivalCard
              title="Cookware"
              img="cook.jpg"
              className="md:col-span-2 md:row-span-1"
              size="wide"
            />
            <ArrivalCard
              title="Tableware"
              img="table.jpg"
              className="md:col-span-1 md:row-span-1"
              size="square"
            />
            <ArrivalCard
              title="Containers"
              img="cont.jpg"
              className="md:col-span-1 md:row-span-1"
              size="square"
            />
          </div>
        </div>
      </div>
    </section>
  );
}