import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/app/models/Order";
import Counter from "@/app/models/Counter";
import {
  buildOrderPlacedAdminEmail,
  buildOrderPlacedCustomerEmail,
  sendEmail,
} from "@/lib/email";

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

    const counter = await Counter.findOneAndUpdate(
      { name: "order" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );
    const orderId = counter.seq;
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

    const customerEmail = buildOrderPlacedCustomerEmail({
      firstName,
      orderId,
      items,
      totalItems,
      totalPrice,
    });

    const adminEmail = buildOrderPlacedAdminEmail({
      orderId,
      items,
      totalItems,
      totalPrice,
      customer: {
        firstName,
        lastName,
        email,
        phone,
        address: `${street}, ${city}, ${province}, ${postalCode}`,
      },
      acceptLink,
      rejectLink,
    });

    void Promise.allSettled([
      sendEmail({
        to: email,
        subject: customerEmail.subject,
        text: customerEmail.text,
        html: customerEmail.html,
      }),
      sendEmail({
        to: process.env.OWNER_EMAIL,
        subject: adminEmail.subject,
        text: adminEmail.text,
        html: adminEmail.html,
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
