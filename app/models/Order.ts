import mongoose, { Schema, Document } from "mongoose";

interface ICartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IOrder extends Document {
  orderId: number;
  firstName: string;
  lastName: string;
  customerEmail: string;
  phone: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  items: ICartItem[];
  totalPrice: number;
  totalItems: number;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { _id: false },
);

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: Number, required: true, unique: true },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    phone: { type: String, required: true },

    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      postalCode: { type: String, required: true },
    },

    items: { type: [CartItemSchema], required: true },

    totalPrice: { type: Number, required: true },
    totalItems: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
