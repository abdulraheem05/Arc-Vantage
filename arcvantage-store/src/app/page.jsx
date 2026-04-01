import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import ExploreSection from "@/components/home/ExploreSection";
import WhySection from "@/components/home/WhySection";
import CustomerReviews from "@/components/home/CustomerReviews";
import AddReviewCTA from "@/components/home/AddReviewCTA";
import LatestInStore from "@/components/home/LatestInStore";

import { getProducts } from "@/lib/data"; // <--- JUST ADD THIS IMPORT

export default async function Home() {
  const products = await getProducts();
  
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ExploreSection />
      <LatestInStore products={products.slice(0, 8)} />
      <WhySection />
      <CustomerReviews />
      <AddReviewCTA />
    </div>
  );
}