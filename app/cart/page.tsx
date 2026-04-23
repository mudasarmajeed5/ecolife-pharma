"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/store/cartStore";
import { toast } from "sonner";
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

function EmptyCartState() {
  const router = useRouter();
  return (
    <div className="min-h-[calc(100vh-80px)] bg-neutral-50/50 flex flex-col items-center justify-center p-6 py-24">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-10 md:p-12 text-center border border-gray-100">
        <div className="w-40 h-40 bg-linear-to-br from-gray-50 to-neutral-100 rounded-full mx-auto flex items-center justify-center border-12 border-white shadow-lg mb-10 overflow-hidden relative">
          <img
            src="/empty-cart.png"
            alt="Empty Cart"
            className="w-24 h-24 object-contain mix-blend-multiply opacity-50"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          {/* Elegant CSS shapes fallback if the image path doesn't exist */}
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20">
            <div className="w-14 h-4 bg-gray-400 rounded-full mb-1 -ml-8 rotate-12" />
            <div className="w-20 h-16 border-4 border-gray-400 rounded-b-2xl border-t-0 -ml-2" />
            <div className="flex gap-4 mt-2 -ml-2">
              <div className="w-4 h-4 bg-gray-400 rounded-full" />
              <div className="w-4 h-4 bg-gray-400 rounded-full" />
            </div>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          Cart is Empty
        </h1>
        <p className="text-gray-500 mb-10 leading-relaxed text-lg px-2">
          Looks like you haven't added anything yet. Explore our top products
          and find something you love!
        </p>
        <Button
          onClick={() => router.push("/products")}
          className="w-full bg-green-600 hover:bg-green-700 text-lg h-14 rounded-2xl font-bold shadow-lg shadow-green-600/30 transition-all active:scale-95 flex items-center justify-center"
        >
          Start Shopping
        </Button>
      </div>
    </div>
  );
}

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
      const item = items.find((i) => i.id === id);
      if (item) {
        handleRemoveItem(id, item.name);
      }
      return;
    }
    updateQuantity(id, newQuantity);
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (items.length === 0) {
    return <EmptyCartState />;
  }

  return (
    <main key="full-cart-main" className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Your Cart</h1>
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardContent className="p-0">
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                    >
                      <div className="flex items-center gap-6 grow">
                        <div className="bg-green-50 rounded-lg w-24 h-24 flex items-center justify-center shrink-0 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="grow">
                          <Link
                            href={`/product/${item.id}`}
                            className="font-bold text-lg text-gray-800 hover:text-green-600 transition-colors"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-gray-500">
                            Unit Price: ₨{item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 sm:gap-10 w-full sm:w-auto">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-bold text-lg w-10 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="font-bold text-lg text-gray-800 w-24 text-right">
                          ₨{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="mt-6 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                {getTotalItems()} items in your cart
              </p>
              <Button
                variant="outline"
                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                onClick={() => {
                  clearCart();
                  toast.success("Cart cleared");
                }}
              >
                <X className="mr-2 h-4 w-4" />
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₨{getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>₨{getTotalPrice().toLocaleString()}</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg"
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
