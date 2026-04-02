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
        subject: `Order Confirmation from ArcVantage`,
        html: `
            <div style="background-color: #FDFDFD; padding: 40px 20px; font-family: 'Poppins', Helvetica, Arial, sans-serif;">
              <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #f0f0f0; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.02);">
                
                <div style="background: #000000; padding: 40px; text-align: center;">
                  <h1 style="color: #ffffff; font-family: 'Cinzel', serif; font-size: 22px; letter-spacing: 0.2em; text-transform: uppercase; margin: 0;">
                    ArcVantage
                  </h1>
                  <p style="color: rgba(255,255,255,0.5); font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; margin-top: 10px;">
                    Luxury Kitchenware
                  </p>
                </div>

                <div style="padding: 40px;">
                  <h2 style="font-size: 18px; font-weight: 600; color: #000; margin-bottom: 10px;">Thank you for your purchase.</h2>
                  <p style="color: #666; font-size: 14px; line-height: 1.6;">We've received your order and are preparing it for shipment. Below is your official order summary.</p>

                  <table style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                    <thead>
                      <tr style="border-bottom: 1px solid #eee;">
                        <th style="text-align: left; padding: 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #999;">Item</th>
                        <th style="text-align: center; padding: 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #999;">Qty</th>
                        <th style="text-align: right; padding: 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #999;">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${cart.map(item => `
                        <tr style="border-bottom: 1px dotted #f0f0f0;">
                          <td style="padding: 15px 0;">
                            <p style="margin: 0; font-size: 13px; font-weight: 600; color: #333; text-transform: uppercase;">${item.name}</p>
                          </td>
                          <td style="padding: 15px 0; text-align: center; font-size: 13px; color: #666;">${item.quantity}</td>
                          <td style="padding: 15px 0; text-align: right; font-size: 13px; font-weight: 600; color: #000;">
                            Rs. ${Number(item.price_lkr * item.quantity).toLocaleString()}
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>

                  <div style="background: #F9F9F9; padding: 25px; border-radius: 16px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 0.1em; padding-bottom: 10px;">Subtotal</td>
                        <td style="font-size: 13px; color: #333; text-align: right; padding-bottom: 10px;">Rs. ${Number(total).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 0.1em; padding-bottom: 15px; border-bottom: 1px solid #eee;">Shipping</td>
                        <td style="font-size: 11px; color: #966B4E; font-weight: 600; text-align: right; padding-bottom: 15px; border-bottom: 1px solid #eee;">FREE</td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Cinzel', serif; font-size: 14px; font-weight: bold; text-transform: uppercase; padding-top: 20px;">Total Paid</td>
                        <td style="font-size: 22px; color: #966B4E; font-weight: 300; text-align: right; padding-top: 20px;">Rs. ${Number(total).toLocaleString()}</td>
                      </tr>
                    </table>
                  </div>

                  <div style="margin-top: 40px; text-align: center;">
                    <a href="${process.env.NEXTAUTH_URL}/api/orders/${orderId}/receipt" style="display: inline-block; background: #000; color: #fff; padding: 18px 35px; border-radius: 50px; text-decoration: none; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.2em;">
                      Download PDF Receipt
                    </a>
                  </div>

                  <p style="margin-top: 40px; font-size: 12px; color: #bbb; text-align: center; line-height: 1.6;">
                    Questions? Reply to this email or visit our <a href="#" style="color: #966B4E; text-decoration: none;">Help Center</a>.<br>
                    &copy; ${new Date().getFullYear()} ArcVantage. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
            `
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