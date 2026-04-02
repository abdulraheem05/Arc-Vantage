import { pool } from "@/lib/db";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    // 1. Fetch Order Data from your DB
    // Assuming you have an orders and order_items table
    const orderRes = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
    const itemsRes = await pool.query(`
        SELECT oi.*, p.name 
        FROM public.order_items oi
        JOIN public.products p ON oi.product_id = p.id
        WHERE oi.order_id = $1
        `, [id]);

    if (orderRes.rows.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const order = orderRes.rows[0];
    const items = itemsRes.rows;

    // 2. Initialize PDF
    const doc = new jsPDF();
    
    // Header Style
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("ARCVANTAGE", 105, 20, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("LUXURY KITCHENWARE", 105, 27, { align: "center" });

    // Bill Details
    doc.line(20, 35, 190, 35); // Horizontal line
    doc.setFontSize(12);
    doc.text(`Order ID: #ARC-${id}`, 20, 45);
    doc.text(`Date: ${new Date(order.created_at).toLocaleDateString()}`, 20, 52);
    
    // Item Table
    const tableRows = items.map(item => [
      item.name.toUpperCase(),
      item.qty.toString(),
      `Rs. ${Number(item.unit_price_lkr).toLocaleString()}`,
      `Rs. ${(item.line_total_lkr).toLocaleString()}`
    ]);

    autoTable(doc, {
    startY: 65,
    head: [['ITEM', 'QTY', 'UNIT PRICE', 'TOTAL']],
    body: tableRows,
    theme: 'plain',
    headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 9, cellPadding: 5 },
  });

    // Summary
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL PAID: Rs. ${Number(order.total_amount).toLocaleString()}`, 190, finalY, { align: "right" });

    // 3. Output as Buffer
    const pdfBuffer = doc.output("arraybuffer");

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=ArcVantage_Receipt_${id}.pdf`,
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}