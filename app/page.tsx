"use client";

import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import CategoryFilter from "./components/CategoryFilter";
import Footer from "./components/Footer";
import { products } from "./data/products";

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

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Hero />

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Products</h2>
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <ProductGrid
          products={products}
          filter={selectedCategory === "All" ? undefined : selectedCategory}
        />
      </section>

      <section className="bg-green-50 py-12 my-12">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Why Choose EcoLIFE Pharma?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <span className="text-3xl">🌿</span>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">100% Natural</h4>
                <p className="text-gray-600">
                  Research-backed herbal formulations
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">✅</span>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">ISO Certified</h4>
                <p className="text-gray-600">International quality standards</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">🏥</span>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">FDA Approved</h4>
                <p className="text-gray-600">Health authority recognition</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">🔬</span>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  Clinically Tested
                </h4>
                <p className="text-gray-600">Safety and efficacy verified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
