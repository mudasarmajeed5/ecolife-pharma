"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/store/cartStore";
import { toast } from "sonner";
import { getIcon } from "@/app/utils/getIcon";
import {
  ShoppingCart,
  Check,
  Pill,
  Leaf,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast.success(`${name} removed from cart`);
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id, "");
      return;
    }
    updateQuantity(id, newQuantity);
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Shopping Cart
          </h1>

          <Card className="p-12 text-center border-0 shadow-lg">
            <div className="text-6xl mb-4 flex justify-center">
              <ShoppingCart size={72} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add some products to get started!
            </p>
            <Button
              onClick={() => router.push("/")}
              className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg h-auto flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Continue Shopping
            </Button>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-0 shadow-lg">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className={`p-6 flex gap-6 items-start justify-between ${
                    idx !== items.length - 1 ? "border-b" : ""
                  }`}
                >
                  {/* Product Info Container */}
                  <div className="flex gap-6 items-start flex-grow">
                    {/* Product Image */}
                    <div className="bg-green-50 p-4 rounded-lg w-20 h-20 flex items-center justify-center flex-shrink-0">
                      {getIcon(item.image, 32)}
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-green-600 font-bold mb-4">
                        ₨{item.price.toLocaleString()}
                      </p>

                      {/* Quantity Control */}
                      <div className="flex items-center gap-3 mb-4">
                        <label className="text-sm font-semibold text-gray-700">
                          Qty:
                        </label>
                        <div className="flex items-center gap-0 border-2 border-gray-300 rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="rounded-none text-gray-600 hover:bg-gray-100 h-9 w-9"
                          >
                            <Minus size={18} />
                          </Button>
                          <div className="border-l border-r px-4 h-9 flex items-center justify-center bg-white bg-transparent">
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                handleUpdateQuantity(
                                  item.id,
                                  parseInt(e.target.value) || 1,
                                )
                              }
                              className="border-0 text-center font-bold bg-transparent w-8 focus:ring-0 p-0"
                              min="1"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="rounded-none text-gray-600 hover:bg-gray-100 h-9 w-9"
                          >
                            <Plus size={18} />
                          </Button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div>
                        <p className="text-sm text-gray-600">
                          Subtotal:{" "}
                          <span className="font-bold text-gray-900">
                            ₨{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button - Right Aligned */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(item.id, item.name)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
              ))}
            </Card>

            {/* Continue Shopping */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="mt-6 text-green-600 flex gap-2 ml-20 text-md hover:text-green-700 hover:bg-green-50"
              title="Continue Shopping"
            >
              <ArrowLeft size={24} />
              <span>Continue Shopping</span>
            </Button>
          </div>

          {/* Order Summary */}
          <Card className="lg:col-span-1 p-6 sticky top-4 border-0 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            {/* Items Count */}
            <div className="mb-4 pb-4 border-b flex justify-between">
              <span className="text-gray-700">Items ({getTotalItems()})</span>
              <span className="font-semibold text-gray-900">
                ₨{getTotalPrice().toLocaleString()}
              </span>
            </div>

            {/* Subtotal */}
            <div className="mb-4 pb-4 border-b flex justify-between">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-semibold text-gray-900">
                ₨{getTotalPrice().toLocaleString()}
              </span>
            </div>

            {/* Shipping (Free) */}
            <div className="mb-6 pb-6 border-b flex justify-between">
              <span className="text-gray-700">Shipping</span>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                Free
              </Badge>
            </div>

            {/* Total */}
            <div className="mb-6 flex justify-between text-xl">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-green-600">
                ₨{getTotalPrice().toLocaleString()}
              </span>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 px-6 py-3 text-base h-auto mb-3"
            >
              Proceed to Checkout
            </Button>

            {/* Clear Cart */}
            <Button
              variant="outline"
              onClick={() => {
                clearCart();
                toast.success("Cart cleared");
              }}
              className="w-full border-red-500 text-red-500 hover:bg-red-50"
            >
              Clear Cart
            </Button>

            {/* Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded text-sm text-blue-900 space-y-2">
              <p className="flex items-center gap-2 mb-2">
                <Check size={16} className="text-green-600 flex-shrink-0" />
                <strong>100% Natural Products</strong>
              </p>
              <p className="flex items-center gap-2 mb-2">
                <Pill size={16} className="text-blue-600 flex-shrink-0" />
                <strong>ISO Certified</strong>
              </p>
              <p className="flex items-center gap-2">
                <Leaf size={16} className="text-green-600 flex-shrink-0" />
                <strong>FDA Approved</strong>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
