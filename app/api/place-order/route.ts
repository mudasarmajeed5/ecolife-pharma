import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { connectDB } from "@/lib/db";
import Order from "@/app/models/Order";
import { sendEmail } from "@/lib/email";

type CartItemPayload = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type OrderPayload = {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  cartItems: CartItemPayload[];
};

export async function POST(req: NextRequest) {
  try {
    const { formData, cartItems } = (await req.json()) as OrderPayload;

    if (!formData || !cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { message: "Missing customer or cart details" },
        { status: 400 },
      );
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      street,
      city,
      province,
      postalCode,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !street ||
      !city ||
      !province ||
      !postalCode
    ) {
      return NextResponse.json(
        { message: "Missing required customer details" },
        { status: 400 },
      );
    }

    if (!process.env.OWNER_EMAIL) {
      return NextResponse.json(
        { message: "Missing OWNER_EMAIL configuration" },
        { status: 500 },
      );
    }

    await connectDB();

    const items = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: Number(item.price || 0),
      quantity: Number(item.quantity || 0),
      image: item.image,
    }));

    const totalItems = items.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0,
    );
    const totalPrice = items.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
      0,
    );

    const orderId = randomUUID();
    const order = await Order.create({
      orderId,
      firstName,
      lastName,
      customerEmail: email,
      phone,
      address: {
        street,
        city,
        province,
        postalCode,
      },
      items,
      totalPrice,
      totalItems,
      status: "pending",
    });

    const origin = req.headers.get("origin");
    const baseUrl = origin || process.env.APP_URL || "http://localhost:3000";
    const acceptLink = `${baseUrl}/order/confirm?id=${orderId}&action=accept`;
    const rejectLink = `${baseUrl}/order/confirm?id=${orderId}&action=reject`;

    const cartItemsText = items
      .map(
        (item: CartItemPayload) =>
          `Product: ${item.name}, Quantity: ${item.quantity}, Price: Rs.${item.price}`,
      )
      .join("\n");

    const cartItemsHtml = items
      .map(
        (item) =>
          `<tr>
            <td style="padding:8px 0;border-bottom:1px solid #eef2f7;">${item.name}</td>
            <td style="padding:8px 0;border-bottom:1px solid #eef2f7;text-align:center;">${item.quantity}</td>
            <td style="padding:8px 0;border-bottom:1px solid #eef2f7;text-align:right;">Rs.${item.price}</td>
          </tr>`,
      )
      .join("");

    const customerHtml = `
      <div style="font-family:Arial,sans-serif;background:#f6f7fb;padding:24px;">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;padding:24px;border:1px solid #e5e7eb;">
          <h2 style="margin:0 0 12px;color:#111827;">Order Placed</h2>
          <p style="margin:0 0 16px;color:#374151;">Hi ${firstName}, your order has been placed and is pending confirmation.</p>
          <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px;">
            <p style="margin:0 0 8px;color:#111827;font-weight:600;">Order ID</p>
            <p style="margin:0;color:#111827;">${orderId}</p>
          </div>
          <p style="margin:16px 0 0;color:#6b7280;font-size:14px;">We will email you once your order is confirmed.</p>
        </div>
      </div>
    `;

    const ownerHtml = `
      <div style="font-family:Arial,sans-serif;background:#f6f7fb;padding:24px;">
        <div style="max-width:720px;margin:0 auto;background:#ffffff;border-radius:12px;padding:24px;border:1px solid #e5e7eb;">
          <h2 style="margin:0 0 12px;color:#111827;">New Order Placed</h2>
          <p style="margin:0 0 16px;color:#374151;">Order ID: <strong>${orderId}</strong></p>

          <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">
            <a href="${acceptLink}" style="background:#16a34a;color:#ffffff;padding:10px 16px;border-radius:8px;text-decoration:none;">Accept Order</a>
            <a href="${rejectLink}" style="background:#dc2626;color:#ffffff;padding:10px 16px;border-radius:8px;text-decoration:none;">Reject Order</a>
          </div>

          <div style="margin-bottom:16px;">
            <h3 style="margin:0 0 8px;color:#111827;">Customer Details</h3>
            <p style="margin:0;color:#374151;">${firstName} ${lastName}</p>
            <p style="margin:4px 0;color:#374151;">Email: ${email}</p>
            <p style="margin:4px 0;color:#374151;">Phone: ${phone}</p>
            <p style="margin:4px 0;color:#374151;">Address: ${street}, ${city}, ${province}, ${postalCode}</p>
          </div>

          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr>
                <th style="text-align:left;border-bottom:2px solid #e5e7eb;padding-bottom:8px;">Item</th>
                <th style="text-align:center;border-bottom:2px solid #e5e7eb;padding-bottom:8px;">Qty</th>
                <th style="text-align:right;border-bottom:2px solid #e5e7eb;padding-bottom:8px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${cartItemsHtml}
            </tbody>
          </table>

          <div style="margin-top:16px;display:flex;justify-content:space-between;">
            <span style="color:#374151;">Total Items: ${totalItems}</span>
            <strong style="color:#111827;">Total: Rs.${totalPrice}</strong>
          </div>
        </div>
      </div>
    `;

    void Promise.allSettled([
      sendEmail({
        to: email,
        subject: "Order Placed",
        text: "Your order has been placed and is pending confirmation",
        html: customerHtml,
      }),
      sendEmail({
        to: process.env.OWNER_EMAIL,
        subject: `New Order Placed - ${orderId}`,
        text: `Order ID: ${orderId}
Customer: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Address: ${street}, ${city}, ${province}, ${postalCode}

Order Details:
${cartItemsText}

Total Items: ${totalItems}
Total Price: Rs.${totalPrice}

Accept: ${acceptLink}
Reject: ${rejectLink}`,
        html: ownerHtml,
      }),
    ]);

    return NextResponse.json(
      { message: "Order placed successfully", orderId },
      { status: 200 },
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
