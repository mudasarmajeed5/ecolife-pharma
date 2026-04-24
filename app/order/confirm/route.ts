import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/app/models/Order";
import { sendEmail } from "@/lib/email";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderIdParam = searchParams.get("id");
  const action = searchParams.get("action");

  const renderPage = (title: string, message: string) => `
    <html>
      <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style="margin:0;font-family:Arial,sans-serif;background:#f6f7fb;">
        <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;">
          <div style="max-width:520px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:24px;text-align:center;">
            <h2 style="margin:0 0 12px;color:#111827;">${title}</h2>
            <p style="margin:0;color:#374151;">${message}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const orderId = Number(orderIdParam);

  if (!orderIdParam || !action) {
    return new Response(
      renderPage("Missing Details", "Order id or action is missing."),
      { status: 400, headers: { "content-type": "text/html" } },
    );
  }

  if (!Number.isFinite(orderId) || orderId <= 0) {
    return new Response(
      renderPage("Invalid Order", "The order id is invalid."),
      { status: 400, headers: { "content-type": "text/html" } },
    );
  }

  if (action !== "accept" && action !== "reject") {
    return new Response(
      renderPage("Invalid Action", "The confirmation action is invalid."),
      { status: 400, headers: { "content-type": "text/html" } },
    );
  }

  await connectDB();
  const order = await Order.findOne({ orderId });

  if (!order) {
    return new Response(
      renderPage("Order Not Found", "No order was found for this link."),
      {
        status: 404,
        headers: { "content-type": "text/html" },
      },
    );
  }

  const status = action === "accept" ? "accepted" : "rejected";

  if (order.status !== status) {
    order.status = status;
    await order.save();

    void sendEmail({
      to: order.customerEmail,
      subject: status === "accepted" ? "Order Confirmed" : "Order Rejected",
      text:
        status === "accepted"
          ? "Your order has been confirmed"
          : "Your order has been rejected",
      html: `
        <div style="font-family:Arial,sans-serif;background:#f6f7fb;padding:24px;">
          <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;padding:24px;border:1px solid #e5e7eb;">
            <h2 style="margin:0 0 12px;color:#111827;">${status === "accepted" ? "Order Confirmed" : "Order Rejected"}</h2>
            <p style="margin:0 0 16px;color:#374151;">${
              status === "accepted"
                ? "Your order has been confirmed. Thank you for shopping with us."
                : "Your order has been rejected. If you have questions, please contact us."
            }</p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px;">
              <p style="margin:0 0 8px;color:#111827;font-weight:600;">Order ID</p>
              <p style="margin:0;color:#111827;">${orderId}</p>
            </div>
          </div>
        </div>
      `,
    });
  }

  return new Response(
    renderPage(
      status === "accepted" ? "Order Confirmed" : "Order Rejected",
      status === "accepted"
        ? "The order has been confirmed and the customer has been notified."
        : "The order has been rejected and the customer has been notified.",
    ),
    { status: 200, headers: { "content-type": "text/html" } },
  );
}
