"use client";
import Link from "next/link";
import { Shield, Zap, Globe } from "lucide-react";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Hero />

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About EcoLIFE Pharma
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Since our inception, EcoLIFE Pharma has been committed to bringing
              the power of nature to your healthcare. We specialize in premium
              herbal medicines and nutraceuticals that are sourced from the
              finest natural ingredients.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Our products are formulated with traditional wisdom combined with
              modern pharmaceutical standards, ensuring safety, efficacy, and
              purity in every product.
            </p>
            <Link href="/about">
              <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 h-auto">
                Learn More About Us
              </Button>
            </Link>
          </div>
          <div className="bg-white rounded-xl overflow-hidden h-96 w-full">
            <img
              src="/products/arq e ghulab.jpeg"
              alt="EcoLIFE Pharma Product"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-green-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Choose EcoLIFE Pharma?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg">
              <Shield size={48} className="text-green-600 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Quality Assured
              </h4>
              <p className="text-gray-700">
                ISO certified and FDA approved products manufactured under
                strict quality control standards.
              </p>
            </Card>
            <Card className="p-8 border-0 shadow-lg">
              <Zap size={48} className="text-green-600 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Natural Ingredients
              </h4>
              <p className="text-gray-700">
                100% natural and herbal formulations without harmful chemicals
                or artificial additives.
              </p>
            </Card>
            <Card className="p-8 border-0 shadow-lg">
              <Globe size={48} className="text-green-600 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Wide Range
              </h4>
              <p className="text-gray-700">
                Comprehensive selection of products for eye care, pain relief,
                nutrition, and more.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-green-600 text-white rounded-xl p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-lg mb-8 text-green-100">
            Browse our complete collection of natural healthcare products
          </p>
          <Link href="/products">
            <Button className="bg-white text-green-600 hover:bg-green-50 font-semibold px-8 py-3 h-auto text-lg">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
