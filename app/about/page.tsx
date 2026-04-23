"use client";

import { Leaf, Award, Users, Target } from "lucide-react";
import Footer from "@/app/components/Footer";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-500 to-green-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About EcoLIFE Pharma</h1>
          <p className="text-lg text-green-100">
            Pioneering natural healthcare solutions for over a decade
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              EcoLIFE Pharma was founded with a simple mission: to bring the
              healing power of nature to every household. We began as a small
              operation dedicated to researching and developing premium herbal
              medicines.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Today, we have grown into one of Pakistan's trusted pharmaceutical
              brands, serving millions of satisfied customers with our diverse
              range of natural healthcare products.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our commitment to quality, safety, and efficacy has never wavered.
              Every product is manufactured under strict quality control and
              supported by scientific research.
            </p>
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

      {/* Our Values */}
      <section className="bg-green-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 border-0 shadow-lg text-center">
              <Leaf size={48} className="text-green-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Natural</h3>
              <p className="text-gray-700">
                100% natural ingredients without harmful chemicals
              </p>
            </Card>
            <Card className="p-8 border-0 shadow-lg text-center">
              <Award size={48} className="text-green-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality</h3>
              <p className="text-gray-700">
                ISO certified and FDA approved manufacturing standards
              </p>
            </Card>
            <Card className="p-8 border-0 shadow-lg text-center">
              <Target size={48} className="text-green-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Efficacy</h3>
              <p className="text-gray-700">
                Clinically tested formulations with proven results
              </p>
            </Card>
            <Card className="p-8 border-0 shadow-lg text-center">
              <Users size={48} className="text-green-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Care</h3>
              <p className="text-gray-700">
                Dedicated customer support and satisfaction guarantee
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications & Awards */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Certifications & Recognition
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 border-0 shadow-lg">
            <Award size={48} className="text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              ISO 9001:2015 Certified
            </h3>
            <p className="text-gray-700">
              International quality management system certification for
              consistent product excellence
            </p>
          </Card>
          <Card className="p-8 border-0 shadow-lg">
            <Award size={48} className="text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              FDA Registered
            </h3>
            <p className="text-gray-700">
              Registered with the Food and Drug Authority for compliance with
              health regulations
            </p>
          </Card>
          <Card className="p-8 border-0 shadow-lg">
            <Award size={48} className="text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              GMP Compliant
            </h3>
            <p className="text-gray-700">
              Good Manufacturing Practice standards ensuring highest quality
              control
            </p>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-green-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Our Team
          </h2>
          <p className="text-gray-700 text-center text-lg mb-8 max-w-2xl mx-auto">
            We have a dedicated team of pharmaceutical experts, herbalists,
            researchers, and healthcare professionals committed to delivering
            the best natural healthcare solutions.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
