import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/app/models/Order";
import { buildOrderStatusEmail, sendEmail } from "@/lib/email";

type AdminAction = "accept" | "reject";

const requireAuth = (req: NextRequest) => {
  const password = req.headers.get("x-admin-password");
  const secret = process.env.SECRET_PASSWORD;

  if (!secret || password !== secret) {
    return false;
  }

  return true;
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

    const statusEmail = buildOrderStatusEmail({
      status,
      orderId: order.orderId,
      firstName: order.firstName,
    });

    void sendEmail({
      to: order.customerEmail,
      subject: statusEmail.subject,
      text: statusEmail.text,
      html: statusEmail.html,
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
