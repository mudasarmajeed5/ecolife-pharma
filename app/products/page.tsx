"use client";

import { useState } from "react";
import { products } from "@/app/data/products";
import ProductGrid from "@/app/components/ProductGrid";
import CategoryFilter from "@/app/components/CategoryFilter";
import Footer from "@/app/components/Footer";

const categories = [
  "All",
  "Eye Care",
  "Nutritional",
  "Pain Relief",
  "Digestive",
  "Skin Care",
  "Blood Purification",
  "Cold & Cough",
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-green-500 to-green-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-lg text-green-100">
            Discover our premium range of natural herbal medicines and
            supplements
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Filter by Category
          </h2>
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        <ProductGrid
          products={products}
          filter={selectedCategory === "All" ? undefined : selectedCategory}
        />
      </section>

      <Footer />
    </main>
  );
}
