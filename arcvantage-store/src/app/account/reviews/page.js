"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Star, ChevronLeft, MessageSquare, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ReviewsPage() {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (reviewId) => {
  // Optional: Add a confirmation dialog
  if (!confirm("Are you sure you want to delete this review?")) return;

  try {
    const res = await fetch(`/api/user/reviews/${reviewId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // Remove the deleted review from the local state
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    } else {
      const errorData = await res.json();
      alert(errorData.error || "Failed to delete review");
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert("An error occurred while deleting the review.");
  }
};

  useEffect(() => {
    if (session) {
      fetch("/api/user/reviews")
        .then((res) => res.json())
        .then((data) => {
          setReviews(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <Loader2 className="animate-spin text-black" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-20 text-black">
      <main className="max-w-5xl mx-auto px-6">
        
        {/* CENTERED HEADER (Matched to Orders) */}
        <div className="mb-16 flex flex-col items-center text-center">
          <Link href="/account" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 hover:text-black transition-all mb-4">
            <ChevronLeft size={16} /> Back to Dashboard
          </Link>
          <h1 className="font-cinzel text-4xl font-bold uppercase tracking-[0.2em]">Product Reviews</h1>
          <div className="w-12 h-[2px] bg-[#966B4E] my-4"></div>
          <p className="text-[12px] font-bold text-black/30 uppercase tracking-widest">
            {reviews.length} Published Feedbacks
          </p>
        </div>

        <div className="space-y-10">
          {reviews.length > 0 ? (
            reviews.map((review, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={review.id} 
                className="bg-white rounded-[32px] overflow-hidden border border-black/5 shadow-lg hover:shadow-md transition-all"
              >
                {/* Review Header - Increased Scale */}
                <div className="bg-black/[0.02] p-10 border-b border-black/5 flex justify-between items-center">
                  <div>
                    <p className="text-[11px] font-bold text-black/30 uppercase tracking-widest mb-2">Review For</p>
                    <h4 className="text-lg font-bold uppercase tracking-widest">{review.product_name}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-bold text-black/30 uppercase tracking-widest mb-2">Date Posted</p>
                    <p className="text-base font-bold uppercase tracking-tight">
                      {new Date(review.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* Content - Bold Typography */}
                <div className="p-10">
                  <div className="flex gap-2 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={20} 
                        fill={i < review.rating ? "#966B4E" : "transparent"} 
                        className={i < review.rating ? "text-[#966B4E]" : "text-black/30"} 
                      />
                    ))}
                  </div>
                  <p className="text-[18px] italic font-medium text-black/70 leading-relaxed mb-8">
                    "{review.comment}"
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <Link 
                      href={`/product/${review.product_slug}`}
                      className="flex items-center gap-3 text-[13px] font-black uppercase tracking-[0.2em] text-[#966B4E] hover:text-black transition-all"
                    >
                      View Product <ExternalLink size={14} />
                    </Link>
                    <button 
                        onClick={() => handleDelete(review.id)} // Add this onClick handler
                        className="text-[15px] font-bold uppercase tracking-[0.1em] text-red-500 hover:text-red-700 transition-colors"
                        >
                        Delete Review
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-[32px] py-32 text-center border-2 border-dashed border-black/5">
              <MessageSquare className="mx-auto text-black/10 mb-6" size={64} strokeWidth={1} />
              <h2 className="font-cinzel text-xl font-bold uppercase tracking-widest text-black/40">No Feedbacks Yet</h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}