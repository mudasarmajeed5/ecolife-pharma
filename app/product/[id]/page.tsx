"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/app/data/products";
import { useCartStore } from "@/app/store/cartStore";
import { toast } from "sonner";
import {
  Check,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

// Mock related products
const relatedProducts = products.slice(0, 4);

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("benefits");

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="p-8 text-center shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Product Not Found
            </CardTitle>
            <CardDescription>
              We couldn't find the product you're looking for.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/")}>Back to Home</Button>
          </CardContent>
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
      description: `Quantity: ${quantity} | Total: ₨${(
        product.price * quantity
      ).toLocaleString()}`,
      action: {
        label: "View Cart",
        onClick: () => router.push("/cart"),
      },
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "benefits":
        return (
          <ul className="space-y-3 text-gray-600">
            {product.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className="text-green-500 mt-1 h-5 w-5 shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        );
      case "composition":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.composition.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-100 p-4 rounded-lg border border-gray-200"
              >
                <p className="font-semibold text-gray-800">{item}</p>
              </div>
            ))}
          </div>
        );
      case "indications":
        return (
          <ul className="space-y-3 text-gray-600">
            {product.indications.map((indication, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className="text-blue-500 mt-1 h-5 w-5 shrink-0" />
                <span>{indication}</span>
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/products" className="hover:text-gray-900">
            Products
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="font-medium text-gray-700">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="bg-gray-50 rounded-xl flex items-center justify-center aspect-square overflow-hidden border">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Thumbnails can be added here */}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200 w-fit mb-2"
            >
              {product.category}
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              {product.name}
            </h1>
            <p className="text-gray-600 text-lg mb-4">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-5 w-5" />
                <Star className="h-5 w-5" />
                <Star className="h-5 w-5" />
                <Star className="h-5 w-5" />
                <Star className="h-5 w-5 text-gray-300" />
              </div>
              <span className="text-sm text-gray-500">(12 Reviews)</span>
            </div>

            <Separator className="my-6" />

            <div>
              <span className="text-sm text-gray-500">Price</span>
              <p className="text-4xl font-extrabold text-gray-900 mb-2">
                ₨{product.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">Inclusive of all taxes</p>
            </div>

            <Separator className="my-6" />

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-700">
                  Quantity
                </span>
                <div className="flex items-center gap-2 border rounded-lg p-2 w-fit">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-bold text-lg w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="w-full sm:w-auto grow bg-green-600 hover:bg-green-700 h-12 text-base font-semibold shadow-md shadow-green-600/20 active:scale-[0.98] transition-all"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 w-12 p-0 flex items-center justify-center rounded-lg border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-500 hover:bg-red-50 transition-colors"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Card className="mt-8 bg-gray-50 border-gray-200">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="h-6 w-6 text-green-600" />
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Free Shipping</span> on
                    orders over ₨1000
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-green-600" />
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">100% Secure</span> payment
                    and data
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("benefits")}
                className={`${
                  activeTab === "benefits"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Benefits
              </button>
              <button
                onClick={() => setActiveTab("composition")}
                className={`${
                  activeTab === "composition"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Composition
              </button>
              <button
                onClick={() => setActiveTab("indications")}
                className={`${
                  activeTab === "indications"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Indications
              </button>
            </nav>
          </div>
          <div className="py-10">{renderTabContent()}</div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <Separator className="mb-8" />
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((related) => (
              <Link
                key={related.id}
                href={`/product/${related.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col h-full w-full">
                  <div className="w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="px-3 py-2 bg-white text-left">
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
                      {related.name}
                    </h3>
                    <span className="inline-block bg-green-200 text-green-800 text-[10px] px-2 py-0.5 rounded-full mt-1">
                      {related.category}
                    </span>
                  </div>
                  <div className="p-3 pt-0 flex flex-col grow justify-end">
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-base font-bold text-green-600">
                        ₨{related.price.toLocaleString()}
                      </p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addItem({
                            id: related.id,
                            name: related.name,
                            price: related.price,
                            quantity: 1,
                            image: related.image,
                          });
                          toast.success(`${related.name} added to cart!`, {
                            description: `Price: ₨${related.price.toLocaleString()}`,
                          });
                        }}
                        className="bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 transition font-semibold text-xs shadow-sm hover:shadow-md"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
