import { createTransport } from "nodemailer";

type EmailPayload = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

type OrderEmailItem = {
  name: string;
  quantity: number;
  price: number;
};

const transporter = createTransport({
  service: "Zoho",
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async ({ to, subject, text, html }: EmailPayload) => {
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    throw new Error("Missing SMTP_EMAIL or SMTP_PASSWORD");
  }

  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to,
    subject,
    text,
    html,
  });
};

const BRAND_NAME = "ECOLIFE Pharma";
const BRAND_COLOR = "#16a34a";
const MUTED_TEXT = "#6b7280";

const buildItemsText = (items: OrderEmailItem[]) =>
  items
    .map(
      (item) =>
        `- ${item.name} x${item.quantity} (Rs.${item.price}) = Rs.${
          item.price * item.quantity
        }`,
    )
    .join("\n");

const buildItemsTableRows = (items: OrderEmailItem[]) =>
  items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${item.name}</td>
          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity}</td>
          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;text-align:right;">Rs.${item.price}</td>
          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;text-align:right;">Rs.${
            item.price * item.quantity
          }</td>
        </tr>
      `,
    )
    .join("");

const renderEmailShell = (title: string, preheader: string, body: string) => `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>${title}</title>
    </head>
    <body style="margin:0;background:#f1f5f9;font-family:Arial,sans-serif;color:#111827;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
        ${preheader}
      </div>
      <table role="presentation" width="100%" style="border-collapse:collapse;background:#f1f5f9;padding:24px 12px;">
        <tr>
          <td align="center" style="padding:24px 12px;">
            <table role="presentation" width="100%" style="max-width:640px;border-collapse:separate;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
              <tr>
                <td style="background:${BRAND_COLOR};padding:20px 24px;color:#ffffff;">
                  <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;">${BRAND_NAME}</div>
                  <div style="font-size:22px;font-weight:700;margin-top:6px;">${title}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:24px;">
                  ${body}
                </td>
              </tr>
              <tr>
                <td style="padding:16px 24px;background:#f8fafc;color:${MUTED_TEXT};font-size:12px;">
                  Questions? Reply to this email and our team will help you.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;

export const buildOrderPlacedCustomerEmail = (params: {
  firstName: string;
  orderId: number;
  items: OrderEmailItem[];
  totalItems: number;
  totalPrice: number;
}) => {
  const { firstName, orderId, items, totalItems, totalPrice } = params;
  const title = "Order Received";
  const preheader = `Order ${orderId} is received and pending confirmation.`;
  const body = `
    <p style="margin:0 0 12px;font-size:15px;">Hi ${firstName},</p>
    <p style="margin:0 0 18px;font-size:15px;">We have received your order and it is pending confirmation.</p>
    <div style="background:#ecfdf5;border:1px solid #bbf7d0;border-radius:12px;padding:16px;margin-bottom:20px;">
      <div style="font-weight:600;margin-bottom:6px;">Order ID</div>
      <div style="font-size:18px;">${orderId}</div>
      <div style="margin-top:8px;color:${MUTED_TEXT};font-size:13px;">Status: Pending review</div>
    </div>
    <table role="presentation" width="100%" style="border-collapse:collapse;font-size:14px;">
      <thead>
        <tr>
          <th style="text-align:left;border-bottom:2px solid #e5e7eb;padding-bottom:10px;">Item</th>
          <th style="text-align:center;border-bottom:2px solid #e5e7eb;padding-bottom:10px;">Qty</th>
          <th style="text-align:right;border-bottom:2px solid #e5e7eb;padding-bottom:10px;">Unit</th>
          <th style="text-align:right;border-bottom:2px solid #e5e7eb;padding-bottom:10px;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${buildItemsTableRows(items)}
      </tbody>
    </table>
    <div style="display:flex;justify-content:space-between;margin-top:16px;font-size:14px;">
      <span style="color:${MUTED_TEXT};">Total items: ${totalItems}</span>
      <strong>Total: Rs.${totalPrice}</strong>
    </div>
    <p style="margin:18px 0 0;color:${MUTED_TEXT};font-size:13px;">We will notify you as soon as your order is confirmed.</p>
  `;

  return {
    subject: "Order Received",
    text: `Hi ${firstName}, your order ${orderId} is received and pending confirmation.\n\nItems:\n${buildItemsText(
      items,
    )}\n\nTotal items: ${totalItems}\nTotal: Rs.${totalPrice}`,
    html: renderEmailShell(title, preheader, body),
  };
};

export const buildOrderPlacedAdminEmail = (params: {
  orderId: number;
  items: OrderEmailItem[];
  totalItems: number;
  totalPrice: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
  acceptLink: string;
  rejectLink: string;
}) => {
  const {
    orderId,
    items,
    totalItems,
    totalPrice,
    customer,
    acceptLink,
    rejectLink,
  } = params;
  const title = "New Order Placed";
  const preheader = `Order ${orderId} is ready for review.`;
  const body = `
    <p style="margin:0 0 18px;font-size:15px;">A new order is ready for review.</p>
    <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin-bottom:18px;">
      <div style="font-weight:600;margin-bottom:6px;">Order ID</div>
      <div style="font-size:18px;">${orderId}</div>
    </div>
    <div style="margin-bottom:18px;">
      <a href="${acceptLink}" style="display:inline-block;margin-right:10px;background:${BRAND_COLOR};color:#ffffff;padding:10px 18px;border-radius:10px;text-decoration:none;font-weight:600;">Accept Order</a>
      <a href="${rejectLink}" style="display:inline-block;background:#dc2626;color:#ffffff;padding:10px 18px;border-radius:10px;text-decoration:none;font-weight:600;">Reject Order</a>
    </div>
    <div style="margin-bottom:18px;">
      <h3 style="margin:0 0 8px;font-size:15px;">Customer Details</h3>
      <p style="margin:0;">${customer.firstName} ${customer.lastName}</p>
      <p style="margin:4px 0 0;">Email: ${customer.email}</p>
      <p style="margin:4px 0 0;">Phone: ${customer.phone}</p>
      <p style="margin:4px 0 0;">Address: ${customer.address}</p>
    </div>
    <table role="presentation" width="100%" style="border-collapse:collapse;font-size:14px;">
      <thead>
        <tr>
          <th style="text-align:left;border-bottom:2px solid #e5e7eb;padding-bottom:10px;">Item</th>
          <th style="text-align:center;border-bottom:2px solid #e5e7eb;padding-bottom:10px;">Qty</th>
          <th style="text-align:right;border-bottom:2px solid #e5e7eb;padding-bottom:10px;">Unit</th>
          <th style="text-align:right;border-bottom:2px solid #e5e7eb;padding-bottom:10px;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${buildItemsTableRows(items)}
      </tbody>
    </table>
    <div style="display:flex;justify-content:space-between;margin-top:16px;font-size:14px;">
      <span style="color:${MUTED_TEXT};">Total items: ${totalItems}</span>
      <strong>Total: Rs.${totalPrice}</strong>
    </div>
  `;

  return {
    subject: `New order #${orderId}`,
    text: `New order ${orderId}.\n\nCustomer: ${customer.firstName} ${customer.lastName}\nEmail: ${customer.email}\nPhone: ${customer.phone}\nAddress: ${customer.address}\n\nItems:\n${buildItemsText(
      items,
    )}\n\nTotal items: ${totalItems}\nTotal: Rs.${totalPrice}\n\nAccept: ${acceptLink}\nReject: ${rejectLink}`,
    html: renderEmailShell(title, preheader, body),
  };
};

export const buildOrderStatusEmail = (params: {
  status: "accepted" | "rejected";
  orderId: number;
  firstName?: string;
}) => {
  const { status, orderId, firstName } = params;
  const title = status === "accepted" ? "Order Confirmed" : "Order Rejected";
  const preheader =
    status === "accepted"
      ? `Order ${orderId} is confirmed.`
      : `Order ${orderId} has been rejected.`;
  const body = `
    <p style="margin:0 0 12px;font-size:15px;">${firstName ? `Hi ${firstName},` : "Hello,"}</p>
    <p style="margin:0 0 18px;font-size:15px;">${
      status === "accepted"
        ? "Your order has been confirmed and will be processed soon."
        : "Your order has been rejected. If you have questions, reply to this email."
    }</p>
    <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;padding:16px;">
      <div style="font-weight:600;margin-bottom:6px;">Order ID</div>
      <div style="font-size:18px;">${orderId}</div>
      <div style="margin-top:8px;color:${MUTED_TEXT};font-size:13px;">Status: ${
        status === "accepted" ? "Confirmed" : "Rejected"
      }</div>
    </div>
  `;

  return {
    subject: title,
    text:
      status === "accepted"
        ? `Your order ${orderId} has been confirmed.`
        : `Your order ${orderId} has been rejected.`,
    html: renderEmailShell(title, preheader, body),
  };
};
