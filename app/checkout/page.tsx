"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/store/cartStore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Check, Truck, CalendarDays, Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, getTotalItems, removeItem } = useCartStore();
  const [loading, setLoading] = useState(false);

  // Customer Details
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.street ||
      !formData.city ||
      !formData.province ||
      !formData.postalCode
    ) {
      toast.error("Please fill in all fields");
      return false;
    }
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData, cartItems: items }),
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message);
      } else {
        toast.success(result?.message);
        router.push("/order-confirmed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="mb-8 text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Shopping
          </Button>
          <Card className="p-12 text-center border-0 shadow-lg">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Add items to your cart before checking out
            </p>
            <Button
              onClick={() => router.push("/")}
              className="bg-green-600 hover:bg-green-700"
            >
              Continue Shopping
            </Button>
          </Card>
        </div>
      </main>
    );
  }

  const subtotal = getTotalPrice();
  const tax = 0;
  const delivery = 0;
  const total = subtotal + tax + delivery;

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => router.push("/cart")}
          className="mb-8 text-green-600 hover:text-green-700 hover:bg-green-50"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Cart
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 border-0 shadow-lg">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Checkout
              </h1>

              {/* Personal Details */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Personal Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Ahmed"
                      className="border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Khan"
                      className="border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ahmed@example.com"
                      className="border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="03001234567"
                      className="border border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-8 pb-8 border-b">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <Input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      className="border border-gray-300"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City *
                      </label>
                      <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Karachi"
                        className="border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Province *
                      </label>
                      <Input
                        type="text"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        placeholder="Sindh"
                        className="border border-gray-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Postal Code *
                    </label>
                    <Input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="75500"
                      className="border border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <div className="flex items-start gap-4">
                  <Truck
                    size={24}
                    className="text-green-600 shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Free Delivery
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      We offer completely free delivery on all orders across
                      Pakistan.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays size={18} className="text-green-600" />
                      <span className="font-semibold text-gray-900">
                        Estimated delivery: 2-3 business days
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 border-0 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Items List */}
              <div className="mb-6 pb-6 border-b max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between mb-4 text-sm"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      ₨{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                {/* Subtotal */}
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>₨{subtotal.toLocaleString()}</span>
                </div>

                {/* Tax */}
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span className="text-green-600 font-semibold">
                    ₨{tax.toLocaleString()}
                  </span>
                </div>

                {/* Delivery */}
                <div className="flex justify-between text-gray-700">
                  <span>Delivery</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>

                {/* Delivery Time */}
                <div className="flex justify-between text-sm text-gray-600 bg-blue-50 p-3 rounded">
                  <span className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    Delivery Time
                  </span>
                  <span className="font-semibold text-blue-900">2-3 days</span>
                </div>

                {/* Total */}
                <div className="border-t pt-4 flex justify-between text-xl">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-green-600">
                    ₨{total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                onClick={handleSubmitOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>

              {/* Info Box */}
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                <div className="flex items-start gap-2 mb-2">
                  <Check
                    size={18}
                    className="text-green-600 shrink-0 mt-0.5"
                  />
                  <span>
                    <strong>Secure Payment:</strong> Your order is protected
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check
                    size={18}
                    className="text-green-600 shrink-0 mt-0.5"
                  />
                  <span>
                    <strong>Track Your Order:</strong> Get real-time updates
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
