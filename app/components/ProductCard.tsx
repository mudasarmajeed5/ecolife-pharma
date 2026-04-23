"use client";

import Link from "next/link";
import { Product } from "../data/products";
import { useCartStore } from "../store/cartStore";
import { toast } from "sonner";

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
      image: product.image,
    });
    toast.success(`${product.name} added to cart!`, {
      description: `Price: ₨${product.price.toLocaleString()}`,
    });
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer flex flex-col w-full max-w-xs">
        <div className="w-full h-72 bg-white flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="px-4 py-3 bg-white text-left">
          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
          <span className="inline-block bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full mt-1">
            {product.category}
          </span>
        </div>
        <div className="p-4 flex flex-col grow justify-between">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-green-600">
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
