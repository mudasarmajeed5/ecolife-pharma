"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/app/data/products";
import { useCartStore } from "@/app/store/cartStore";
import { toast } from "sonner";
import { getIcon } from "@/app/utils/getIcon";
import {
  Check,
  Home,
  Pill,
  ShoppingCart,
  Leaf,
  Plus,
  Minus,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 max-w-sm">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Product Not Found
            </h1>
            <Button
              onClick={() => router.push("/")}
              className="bg-green-600 hover:bg-green-700"
            >
              Back to Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    });
    toast.success(`${product.name} added to cart!`, {
      description: `Quantity: ${quantity}`,
    });
    setQuantity(1);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="mb-8 text-green-600 hover:text-green-700 hover:bg-green-50"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </Button>

        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-12 flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-9xl mb-4 flex justify-center">
                  {getIcon(product.icon, 96)}
                </div>
                <Badge className="bg-green-200 text-green-800 hover:bg-green-300">
                  {product.category}
                </Badge>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  {product.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    Price
                  </p>
                  <p className="text-5xl font-bold text-green-600">
                    ₨{product.price.toLocaleString()}
                  </p>
                </div>

                {/* Form */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    Product Form
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {product.form}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="mb-8">
                  <label className="block text-gray-700 font-semibold mb-4">
                    Quantity
                  </label>
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg w-fit p-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="hover:bg-gray-100"
                    >
                      <Minus size={18} />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-16 border-0 text-center font-semibold focus:ring-0"
                      min="1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="hover:bg-gray-100"
                    >
                      <Plus size={18} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-bold text-lg mb-4 flex items-center justify-center gap-2 h-12"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </Button>

              {/* Trust Badges */}
              <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
                <Check size={20} className="text-green-600 flex-shrink-0" />
                <span className="text-sm text-blue-900">
                  <strong>ISO Certified</strong> • FDA Approved • 100% Natural
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Details Sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Benefits */}
          <Card className="p-8 border-0 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits</h2>
            <ul className="space-y-4">
              {product.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check
                    size={24}
                    className="text-green-600 flex-shrink-0 mt-1"
                  />
                  <span className="text-gray-700 leading-relaxed">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Indications */}
          <Card className="p-8 border-0 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Indications
            </h2>
            <ul className="space-y-4">
              {product.indications.map((indication, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Pill
                    size={24}
                    className="text-blue-600 flex-shrink-0 mt-1"
                  />
                  <span className="text-gray-700 leading-relaxed">
                    {indication}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Composition */}
        <Card className="mt-8 p-8 border-0 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Composition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.composition.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200 hover:shadow-md transition"
              >
                <p className="text-gray-800 font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Usage */}
        {product.usage && (
          <Card className="mt-8 p-8 border-0 shadow-lg bg-amber-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {product.usage}
            </p>
          </Card>
        )}
      </div>
    </main>
  );
}
