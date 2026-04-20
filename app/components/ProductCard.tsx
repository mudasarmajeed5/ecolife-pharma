"use client";

import Link from "next/link";
import { Product } from "../data/products";
import { useCartStore } from "../store/cartStore";
import { toast } from "sonner";
import { getIcon } from "../utils/getIcon";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.icon,
    });
    toast.success(`${product.name} added to cart!`, {
      description: `Price: ₨${product.price.toLocaleString()}`,
    });
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow h-full cursor-pointer">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 text-center">
          <div className="text-6xl mb-4 flex justify-center">
            {getIcon(product.icon, 48)}
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {product.name}
          </h3>
          <span className="inline-block bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        <div className="p-4 flex flex-col h-full">
          <p className="text-sm text-gray-600 mb-3 min-h-12">
            <strong>Benefits:</strong> {product.benefits.slice(0, 2).join(", ")}
            ...
          </p>
          <div className="mb-4 pb-4 border-b flex-grow">
            <p className="text-xs text-gray-500 mb-2">
              <strong>Key Ingredients:</strong>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.composition.slice(0, 2).map((item, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <div>
              <p className="text-2xl font-bold text-green-600">
                ₨{product.price.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">ISO Certified</p>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition font-semibold text-sm"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
