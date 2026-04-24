import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/app/models/Order";
import { sendEmail } from "@/lib/email";

type AdminAction = "accept" | "reject";

const requireAuth = (req: NextRequest) => {
  const password = req.headers.get("x-admin-password");
  const secret = process.env.SECRET_PASSWORD;

  if (!secret || password !== secret) {
    return false;
  }

  return true;
};

const getStatusEmailHtml = (status: AdminAction, orderId: number) => {
  const title = status === "accept" ? "Order Confirmed" : "Order Rejected";
  const message =
    status === "accept"
      ? "Your order has been confirmed. Thank you for shopping with us."
      : "Your order has been rejected. If you have questions, please contact us.";

  return `
    <div style="font-family:Arial,sans-serif;background:#f6f7fb;padding:24px;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;padding:24px;border:1px solid #e5e7eb;">
        <h2 style="margin:0 0 12px;color:#111827;">${title}</h2>
        <p style="margin:0 0 16px;color:#374151;">${message}</p>
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px;">
          <p style="margin:0 0 8px;color:#111827;font-weight:600;">Order ID</p>
          <p style="margin:0;color:#111827;">${orderId}</p>
        </div>
      </div>
    </div>
  `;
};

export async function GET(req: NextRequest) {
  if (!requireAuth(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const safePage = Number.isNaN(page) || page < 1 ? 1 : page;
  const safeLimit = Number.isNaN(limit) || limit < 1 ? 10 : Math.min(limit, 50);
  const skip = (safePage - 1) * safeLimit;

  await connectDB();

  const [orders, totalCount, pendingStats, acceptedStats, rejectedCount] =
    await Promise.all([
      Order.find({}, null, { sort: { createdAt: -1 }, skip, limit: safeLimit })
        .lean()
        .exec(),
      Order.countDocuments().exec(),
      Order.aggregate([
        { $match: { status: "pending" } },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
            revenue: { $sum: "$totalPrice" },
          },
        },
      ]),
      Order.aggregate([
        { $match: { status: "accepted" } },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
            revenue: { $sum: "$totalPrice" },
          },
        },
      ]),
      Order.countDocuments({ status: "rejected" }).exec(),
    ]);

  const pending = pendingStats[0] || { count: 0, revenue: 0 };
  const accepted = acceptedStats[0] || { count: 0, revenue: 0 };
  const totalPages = Math.ceil(totalCount / safeLimit) || 1;

  return NextResponse.json({
    orders,
    pagination: {
      page: safePage,
      limit: safeLimit,
      totalCount,
      totalPages,
    },
    stats: {
      pendingCount: pending.count,
      pendingRevenue: pending.revenue,
      acceptedCount: accepted.count,
      acceptedRevenue: accepted.revenue,
      rejectedCount,
    },
  });
}

export async function PATCH(req: NextRequest) {
  if (!requireAuth(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as {
    orderId?: number;
    action?: AdminAction;
  };

  const orderId = Number(body.orderId);

  if (
    !orderId ||
    !Number.isFinite(orderId) ||
    (body.action !== "accept" && body.action !== "reject")
  ) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  await connectDB();
  const order = await Order.findOne({ orderId });

  if (!order) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  const status = body.action === "accept" ? "accepted" : "rejected";

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
      html: getStatusEmailHtml(body.action, order.orderId),
    });
  }

  return NextResponse.json({ message: `Order ${status}` }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  if (!requireAuth(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as { orderId?: number };

  const orderId = Number(body.orderId);

  if (!orderId || !Number.isFinite(orderId)) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  await connectDB();
  const result = await Order.deleteOne({ orderId });

  if (result.deletedCount === 0) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Order deleted" }, { status: 200 });
}
