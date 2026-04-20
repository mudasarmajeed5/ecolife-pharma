export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-500 to-green-700 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Natural Health, Naturally
        </h2>
        <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
          EcoLIFE Pharma brings you research-backed herbal and nutraceutical
          formulations approved by health authorities and trusted by thousands.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition">
            Shop Now
          </button>
          <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition">
            Learn More
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-12 text-sm">
          <div>✅ ISO Certified</div>
          <div>✅ FDA Approved</div>
          <div>✅ 100% Natural</div>
        </div>
      </div>
    </section>
  );
}
