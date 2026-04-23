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
          onClick={() => router.push("/products")}
          className="mb-8 text-green-600 hover:text-green-700 hover:bg-green-50"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </Button>

        {/* Main Product Card - Amazon/Alibaba Style */}
        <Card className="border-0 shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Product Image */}
            <div className="bg-white rounded-xl p-0 flex items-center justify-center h-full min-h-96 overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover p-2 rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <div className="text-9xl mb-6 flex justify-center">
                    {getIcon(product.icon, 96)}
                  </div>
                  <Badge className="bg-green-200 text-green-800 hover:bg-green-300 text-sm px-3 py-1">
                    {product.category}
                  </Badge>
                </div>
              )}
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col justify-start">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>
              <p className="text-gray-600 text-base mb-4 leading-relaxed">
                {product.description}
              </p>
              {/* Price Section */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-gray-600 text-xs font-semibold mb-2">
                  Price
                </p>
                <p className="text-3xl font-bold text-green-600">
                  ₨{product.price.toLocaleString()}
                </p>
              </div>
              {/* Form */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-gray-600 text-xs font-semibold mb-2">
                  Product Form
                </p>
                <p className="text-base font-semibold text-gray-800">
                  {product.form}
                </p>
              </div>
              {/* Quantity & Add to Cart */}
              <div>
                <label className="block text-gray-700 font-semibold text-sm mb-3">
                  Quantity
                </label>
                <div className="mb-6 flex items-center justify-start gap-3">
                  <div className="flex items-center gap-0 border-2 border-gray-300 rounded-lg w-fit">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded-none text-gray-600 hover:bg-gray-100 h-10 w-10"
                    >
                      <Minus size={18} />
                    </Button>
                    <div className="border-l border-r border-gray-300 px-4 h-10 flex items-center justify-center">
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(
                            Math.max(1, parseInt(e.target.value) || 1),
                          )
                        }
                        className="border-0 text-center font-bold text-base w-10 focus:ring-0 p-0"
                        min="1"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="rounded-none text-gray-600 hover:bg-gray-100 h-10 w-10"
                    >
                      <Plus size={18} />
                    </Button>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-base flex items-center justify-center gap-2 h-10"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-blue-50 p-3 rounded-lg flex items-center gap-2 border border-blue-200">
                <Check size={20} className="text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-900">
                  <strong>ISO Certified</strong> • FDA Approved • 100% Natural
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Below: Benefits & Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Benefits */}
          <Card className="p-6 border-0 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Benefits</h2>
            <ul className="space-y-3">
              {product.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check
                    size={20}
                    className="text-green-600 flex-shrink-0 mt-0.5"
                  />
                  <span className="text-gray-700 text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Indications */}
          <Card className="p-6 border-0 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Medical Indications
            </h2>
            <ul className="space-y-3">
              {product.indications.map((indication, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Pill
                    size={20}
                    className="text-blue-600 flex-shrink-0 mt-0.5"
                  />
                  <span className="text-gray-700 text-sm">{indication}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Composition */}
        <Card className="p-6 border-0 shadow-lg mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Composition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.composition.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-2 border-green-200 hover:shadow-md transition"
              >
                <p className="text-gray-900 font-semibold text-base">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Usage */}
        {product.usage && (
          <Card className="p-6 border-0 shadow-lg bg-amber-50 border-2 border-amber-200">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Usage Instructions
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              {product.usage}
            </p>
          </Card>
        )}
      </div>
    </main>
  );
}
