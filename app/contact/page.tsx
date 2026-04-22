"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Footer from "@/app/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully!", {
        description: "We will get back to you soon.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-500 to-green-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-green-100">
            Get in touch with our team for any inquiries or support
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          <Card className="p-8 border-0 shadow-lg">
            <Phone size={40} className="text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Phone</h3>
            <p className="text-gray-700 mb-2">
              <a
                href="tel:03357777954"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                03357777954
              </a>
            </p>
            <p className="text-sm text-gray-600">
              Available Monday - Friday, 9 AM - 5 PM
            </p>
          </Card>

          <Card className="p-8 border-0 shadow-lg">
            <Mail size={40} className="text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Email</h3>
            <p className="text-gray-700 mb-2">
              <a
                href="mailto:info@ecolifepharma.pk"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                info@ecolifepharma.pk
              </a>
            </p>
            <p className="text-sm text-gray-600">We respond within 24 hours</p>
          </Card>

          <Card className="p-8 border-0 shadow-lg">
            <MapPin size={40} className="text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Location</h3>
            <p className="text-gray-700 mb-2">Karachi, Pakistan</p>
            <p className="text-sm text-gray-600">
              Serving all across Pakistan with nationwide delivery
            </p>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="border border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="border border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="03001234567"
                  className="border border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message here..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 h-auto"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Business Hours & Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Business Hours
            </h2>

            <Card className="p-8 border-0 shadow-lg mb-6">
              <Clock size={40} className="text-green-600 mb-4" />
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Monday - Friday
                  </h4>
                  <p className="text-gray-700">9:00 AM - 5:00 PM</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Saturday</h4>
                  <p className="text-gray-700">10:00 AM - 3:00 PM</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Sunday</h4>
                  <p className="text-gray-700">Closed</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg bg-green-50">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Why Contact Us?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Product inquiries and recommendations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Order tracking and support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Health consultations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Wholesale and corporate inquiries</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>General feedback and suggestions</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
