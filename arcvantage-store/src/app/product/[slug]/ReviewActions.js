"use server";

import { pool } from "@/lib/db";
import { revalidatePath } from "next/cache";

/**
 * FETCH: Retrieve all reviews for a specific product
 * Joins with public.users to get the reviewer's name and image
 */
export async function getProductReviews(productId) {
  if (!productId) return [];

  try {
    const res = await pool.query(
      `SELECT 
        r.id, 
        r.rating, 
        r.comment, 
        r.created_at, 
        u.name as user_name,
        u.image as user_image
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

/**
 * SUBMIT: Save a new review
 */
export async function submitReviewAction(productId, userId, rating, comment) {
  if (!productId || !userId || !rating || !comment) {
    return { success: false, error: "Missing required fields" };
  }

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
    return { success: false, error: "Database insertion failed" };
  }
}

export async function deleteReviewAction(reviewId, userId) {
  try {
    // SECURITY: The WHERE clause ensures a user can ONLY delete if they own the review
    const res = await pool.query(
      "DELETE FROM public.product_reviews WHERE id = $1 AND user_id = $2",
      [reviewId, userId]
    );

    if (res.rowCount === 0) {
      return { success: false, error: "Unauthorized or review not found." };
    }

    revalidatePath(`/product/[slug]`);
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false };
  }
}