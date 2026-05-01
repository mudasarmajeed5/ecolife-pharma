import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-500 to-green-700 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Natural Health, Naturally
        </h2>
        <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
          ECOLIFE Pharma brings you research-backed herbal and nutraceutical
          formulations approved by health authorities and trusted by thousands.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/products">
            <Button className="bg-white text-green-600 hover:bg-green-50 font-semibold px-8 py-3 h-auto text-lg">
              Shop Now
            </Button>
          </Link>
          <Button
            variant="outline"
            className="border-2 border-white text-black hover:bg-white hover:text-green-600 px-6 py-3 text-base h-auto"
          >
            Learn More
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-12 text-sm justify-items-center">
          <div className="flex items-center gap-2">
            <Check size={20} /> ISO Certified
          </div>
          <div className="flex items-center gap-2">
            <Check size={20} /> FDA Approved
          </div>
          <div className="flex items-center gap-2">
            <Check size={20} /> 100% Natural
          </div>
        </div>
      </div>
    </section>
  );
}
