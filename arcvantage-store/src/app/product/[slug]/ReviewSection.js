// app/product/[slug]/ReviewSection.js
"use client";

import { useState } from "react";
import { MessageSquarePlus, Star, X, Send } from "lucide-react";

export default function ReviewSection({ productId }) {
  const [isAdding, setIsAdding] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <section className="pt-12 border-t border-black/5">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-black">Customer Reviews</h3>
        
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#966B4E] hover:opacity-70 transition"
          >
            <MessageSquarePlus size={16} />
            Write a Review
          </button>
        )}
      </div>

      {isAdding ? (
        <div className="bg-black/[0.02] border border-black/5 rounded-3xl p-8 animate-in zoom-in-95 duration-300">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h4 className="text-[14px] font-bold uppercase tracking-wider mb-1">Share your experience</h4>
              <p className="text-[12px] text-black/40">How would you rate this item?</p>
            </div>
            <button onClick={() => setIsAdding(false)} className="text-black/20 hover:text-black">
              <X size={20} />
            </button>
          </div>

          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
                className="transition-transform active:scale-90"
              >
                <Star 
                  size={24} 
                  fill={star <= (hover || rating) ? "#FFB800" : "none"} 
                  stroke={star <= (hover || rating) ? "#FFB800" : "currentColor"}
                  className={star <= (hover || rating) ? "text-[#FFB800]" : "text-black/10"}
                />
              </button>
            ))}
          </div>

          <textarea 
            placeholder="What did you like or dislike?"
            className="w-full bg-white border border-black/10 rounded-2xl p-5 text-[14px] focus:outline-none focus:border-black/30 min-h-[120px] mb-6 shadow-sm"
          />

          <button className="bg-black text-white px-8 py-4 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-black/90 transition shadow-lg shadow-black/10">
            <Send size={14} />
            Submit Review
          </button>
        </div>
      ) : (
        <div className="py-12 flex flex-col items-center justify-center border border-dashed border-black/10 rounded-3xl bg-white">
          <p className="text-black/30 text-[13px] italic mb-4">No reviews yet for this piece.</p>
          <button 
             onClick={() => setIsAdding(true)}
             className="text-[10px] font-bold uppercase tracking-widest underline underline-offset-8 hover:text-[#966B4E]"
          >
            Start the conversation
          </button>
        </div>
      )}
    </section>
  );
}