// app/product/[slug]/ReviewSection.js
"use client";

import { useState } from "react";
import { MessageSquarePlus, Star, X, Send } from "lucide-react";
import { submitReviewAction } from "./ProductActions"; // Import the action

export default function ReviewSection({ productId, userId, initialReviews = [] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0 || !comment) return alert("Please add a rating and comment.");
    
    setLoading(true);
    const result = await submitReviewAction(productId, userId, rating, comment);
    
    if (result.success) {
      setComment("");
      setRating(0);
      setIsAdding(false);
    } else {
      alert("Failed to submit review. Try again.");
    }
    setLoading(false);
  };

  return (
    <section className="pt-12 border-t border-black/5">
      {/* HEADER SECTION (Same as yours) */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-black">Customer Reviews</h3>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#966B4E]">
            <MessageSquarePlus size={16} /> Write a Review
          </button>
        )}
      </div>

      {/* ADD REVIEW FORM */}
      {isAdding ? (
        <div className="bg-black/[0.02] border border-black/5 rounded-3xl p-8">
          {/* ... Star Rating Logic ... */}
          <textarea 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you like or dislike?"
            className="w-full bg-white border border-black/10 rounded-2xl p-5 text-[14px] min-h-[120px] mb-6 shadow-sm"
          />
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            className="bg-black text-white px-8 py-4 rounded-xl text-[11px] font-bold uppercase flex items-center gap-3"
          >
            <Send size={14} /> {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      ) : (
        /* LISTING REVIEWS */
        <div className="space-y-12">
          {initialReviews.length > 0 ? (
            initialReviews.map((rev) => (
              <div key={rev.id} className="border-b border-black/5 pb-8">
                 <div className="flex text-[#FFB800] mb-2">
                   {"★".repeat(rev.rating)}{"☆".repeat(5-rev.rating)}
                 </div>
                 <p className="text-[15px] font-light italic text-black/70">"{rev.comment}"</p>
                 <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/30">
                    <span className="text-[#966B4E]">{rev.av_id}</span>
                    <span>•</span>
                    <span>{new Date(rev.created_at).toLocaleDateString()}</span>
                 </div>
              </div>
            ))
          ) : (
            <div className="py-12 flex flex-col items-center justify-center border border-dashed border-black/10 rounded-3xl">
              <p className="text-black/30 text-[13px] italic mb-4">No reviews yet for this piece.</p>
              <button onClick={() => setIsAdding(true)} className="text-[10px] font-bold uppercase underline">Start the conversation</button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}