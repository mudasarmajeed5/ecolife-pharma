"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/store/cartStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmedPage() {
  const router = useRouter();
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="p-12 text-center border-0 shadow-lg max-w-lg">
        <CheckCircle
          className="text-green-500 mx-auto mb-6"
          size={64}
          strokeWidth={1.5}
        />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <Button
          onClick={() => router.push("/")}
          className="bg-green-600 hover:bg-green-700"
        >
          Continue Shopping
        </Button>
      </Card>
    </main>
  );
}
