"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Leaf, ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted ? getTotalItems() : 0;

  return (
    <header className="bg-green-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-90 transition"
        >
          <Leaf size={28} />
          <div>
            <h1 className="text-2xl font-bold">EcoLIFE Pharma</h1>
            <p className="text-sm text-green-100">
              Natural Healthcare Solutions
            </p>
          </div>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/products">
            <Button
              variant="ghost"
              className="text-white hover:text-green-200 hover:bg-green-700"
            >
              Products
            </Button>
          </Link>
          <Link href="/about">
            <Button
              variant="ghost"
              className="text-white hover:text-green-200 hover:bg-green-700"
            >
              About
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="ghost"
              className="text-white hover:text-green-200 hover:bg-green-700"
            >
              Contact
            </Button>
          </Link>
          <Button className="bg-white text-green-600 hover:bg-green-50 font-semibold relative">
            <Link href="/cart" className="flex items-center gap-2">
              <ShoppingCart size={20} />
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>
        </nav>
        <Button
          variant="outline"
          size="sm"
          className="md:hidden text-green-600 border-white hover:bg-green-50 relative"
        >
          <Link href="/cart" className="flex items-center gap-2">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </Button>
      </div>
    </header>
  );
}
