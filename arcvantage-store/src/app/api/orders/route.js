import { pool } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // CHECK THIS PATH
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  console.log("--- Order Process Started ---");
  
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("Error: No Session Found");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch (e) {
    console.log("Error: Failed to parse JSON body");
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { cart, total, formData, paymentMethod } = body;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    console.log("DB Transaction Begun");

    // 1. Get User ID
    const userLookup = await client.query("SELECT id FROM users WHERE email = $1", [session.user.email]);
    if (userLookup.rows.length === 0) throw new Error("User not found in database");
    const userId = userLookup.rows[0].id;

    // 2. Insert Order
    const orderRes = await client.query(
      `INSERT INTO orders (
        user_id, status, subtotal_lkr, delivery_address, 
        city, postal_code, phone, payment_method
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      [userId, 'Pending', total, formData.address, formData.city, formData.zip, formData.phone, paymentMethod]
    );
    const orderId = orderRes.rows[0].id;
    console.log("Order Header Saved:", orderId);

    // 3. Insert Items
    for (const item of cart) {
      // Ensure item.id is a valid UUID string
      await client.query(
        `INSERT INTO order_items (
          order_id, product_id, qty, unit_price_lkr, line_total_lkr
        ) VALUES ($1, $2, $3, $4, $5)`,
        [orderId, item.id, item.quantity, item.price_lkr, item.price_lkr * item.quantity]
      );
    }
    console.log("Order Items Saved");

    // 4. Send Email (Wrap in its own try/catch so order still commits if email fails)
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Arcvantage" <${process.env.EMAIL_USER}>`,
        to: session.user.email,
        subject: `Order Confirmation - #${orderId}`,
        html: `<h1>Order Received</h1><p>Total: Rs. ${total}</p>`
      });
      console.log("Email Sent Successfully");
    } catch (mailErr) {
      console.error("Mail Error (Non-Fatal):", mailErr.message);
    }

    await client.query('COMMIT');
    console.log("Transaction Committed");
    return NextResponse.json({ success: true, orderId });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error("DATABASE_CRASH_LOG:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    client.release();
    console.log("Client Released");
  }
}