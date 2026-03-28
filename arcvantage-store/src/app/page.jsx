"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import ExploreSection from "@/components/home/ExploreSection";
import WhySection from "@/components/home/WhySection";
import CustomerReviews from "@/components/home/CustomerReviews";
import AddReviewCTA from "@/components/home/AddReviewCTA";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ExploreSection />
      <WhySection />
      <CustomerReviews />
      <AddReviewCTA />
    </div>
  );
}