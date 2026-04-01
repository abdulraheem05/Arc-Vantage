import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { pool } from "@/lib/db"; 

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Get the user_id from the 'users' table using the session email
    const userResult = await pool.query(
      'SELECT id FROM public.users WHERE email = $1',
      [session.user.email]
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = userResult.rows[0].id;

    // 2. Fetch orders and join with items and products
    // We use JSON_AGG to group items under their respective orders
    const ordersQuery = `
      SELECT 
        o.id, 
        o.created_at, 
        o.status, 
        o.subtotal_lkr, 
        o.payment_method, 
        o.delivery_address,
        json_agg(
          json_build_object(
            'id', oi.id,
            'name', p.name,
            'image', p.image_url,
            'slug', p.slug,
            'quantity', oi.qty,
            'price', oi.unit_price_lkr
          )
        ) AS items
      FROM public.orders o
      LEFT JOIN public.order_items oi ON o.id = oi.order_id
      LEFT JOIN public.products p ON oi.product_id = p.id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `;

    const ordersResult = await pool.query(ordersQuery, [userId]);

    // 3. Format the data for the frontend
    const formattedOrders = ordersResult.rows.map((order) => ({
      id: order.id,
      created_at: order.created_at,
      status: order.status,
      total: order.subtotal_lkr, // From your 'subtotal_lkr' column
      payment_method: order.payment_method,
      delivery_address: order.delivery_address,
      items: order.items[0]?.id === null ? [] : order.items // Handle empty orders
    }));

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error("API_ORDERS_GET_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}