"use server"; // Essential for database security

import { pool } from "@/lib/db";
import { revalidatePath } from "next/cache";

// FETCH: Get reviews with the user's AV_ID
export async function getProductReviews(productId) {
  try {
    const res = await pool.query(
      `SELECT r.*, u.av_id 
       FROM public.product_reviews r
       JOIN public.users u ON r.user_id = u.id
       WHERE r.product_id = $1
       ORDER BY r.created_at DESC`,
      [productId]
    );
    return res.rows;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

// SUBMIT: Save review to PostgreSQL
export async function submitReviewAction(productId, userId, rating, comment) {
  try {
    await pool.query(
      `INSERT INTO public.product_reviews (product_id, user_id, rating, comment) 
       VALUES ($1, $2, $3, $4)`,
      [productId, userId, rating, comment]
    );
    revalidatePath(`/product/[slug]`); 
    return { success: true };
  } catch (error) {
    console.error("Error saving review:", error);
    return { success: false };
  }
}