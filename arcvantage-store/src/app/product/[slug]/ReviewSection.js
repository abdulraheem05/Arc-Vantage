"use client";

import { useState } from "react";
import { MessageSquarePlus, Star, Send } from "lucide-react";
import { submitReviewAction } from "./ReviewActions";

export default function ReviewSection({ productId, userId, initialReviews = [] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!userId) return alert("Please log in to leave a review.");
    if (rating === 0 || !comment) return alert("Please add a rating and comment.");
    
    setLoading(true);
    const result = await submitReviewAction(productId, userId, rating, comment);
    
    if (result.success) {
      setComment("");
      setRating(0);
      setIsAdding(false);
    }
    setLoading(false);
  };

  return (
    // 1. Center the entire section on the page
    <section className="mt-20 py-16 border-t border-black/5 max-w-5xl mx-auto px-6">
      
      {/* HEADER SECTION */}
      <div className="text-center mb-16">
        <h3 className="font-display text-[20px] font-bold uppercase tracking-[0.2em] text-black mb-4">
          Customer Reviews
        </h3>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)} 
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#966B4E] border-b border-[#966B4E]/20 pb-1 hover:text-black transition"
          >
            <MessageSquarePlus size={16} /> Write a Review
          </button>
        )}
      </div>

      {/* ADD REVIEW FORM - Centered */}
      {isAdding && (
        <div className="max-w-2xl mx-auto bg-black/[0.02] border border-black/5 rounded-[40px] p-10 mb-20 shadow-sm">
          <div className="flex justify-center gap-3 mb-10">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
                className="transition-transform active:scale-90"
              >
                <Star 
                  size={28} 
                  fill={star <= (hover || rating) ? "#FFB800" : "none"} 
                  stroke={star <= (hover || rating) ? "#FFB800" : "currentColor"}
                  className={star <= (hover || rating) ? "text-[#FFB800]" : "text-black/10"}
                />
              </button>
            ))}
          </div>
          <textarea 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            className="w-full bg-white border border-black/10 rounded-3xl p-6 text-[15px] min-h-[150px] mb-8 focus:outline-none focus:ring-1 focus:ring-[#966B4E]"
          />
          <div className="flex justify-center gap-4">
            <button 
              onClick={handleSubmit} 
              disabled={loading}
              className="bg-black text-white px-10 py-5 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-[#966B4E] transition"
            >
              {loading ? "Submitting..." : "Post Review"}
            </button>
            <button onClick={() => setIsAdding(false)} className="text-[11px] font-bold uppercase text-black/30">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* REVIEWS GRID - Centers 1, 2, or more reviews dynamically */}
      <div className="flex flex-wrap justify-center gap-8">
        {initialReviews.length > 0 ? (
          initialReviews.map((rev) => (
            <div 
              key={rev.id} 
              className="w-full max-w-[400px] bg-white border border-black/5 rounded-[32px] p-8 flex flex-col items-center text-center shadow-sm"
            >
              <div className="flex text-[#FFB800] mb-4 gap-1">
                {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
              </div>
              
              <p className="text-[16px] font-light italic text-black/80 leading-relaxed mb-6">
                "{rev.comment}"
              </p>
              
              <div className="mt-auto flex flex-col items-center gap-3">
                {rev.user_image && (
                  <img 
                    src={rev.user_image} 
                    alt={rev.user_name} 
                    className="w-10 h-10 rounded-full border border-black/5 object-cover"
                  />
                )}
                <div className="flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-black/30">
                  <span className="text-[#966B4E]">{rev.user_name}</span>
                  <span >{new Date(rev.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full py-20 flex flex-col items-center justify-center border border-dashed border-black/30 rounded-[40px] bg-black/[0.01]">
            <p className="text-black/30 text-[14px] italic mb-6 text-center">No reviews yet for this piece.</p>
            <button 
              onClick={() => setIsAdding(true)} 
              className="text-[11px] font-bold uppercase underline tracking-widest hover:text-[#966B4E] transition"
            >
              Start the conversation
            </button>
          </div>
        )}
      </div>
    </section>
  );
}