export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4 text-green-400">About Us</h4>
            <p className="text-gray-400 text-sm">
              EcoLIFE Pharma - Pakistan's leading herbal pharmaceutical company
              committed to natural wellness.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-green-400">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Eye Care</li>
              <li>Pain Relief</li>
              <li>Nutritional</li>
              <li>Digestive</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-green-400">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Shop</li>
              <li>About</li>
              <li>Contact</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-green-400">Contact</h4>
            <p className="text-sm text-gray-400">
              Email: info@ecolifepharma.pk
              <br />
              Phone: 03357777954
              <br />
              Location: Pakistan
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2026 EcoLIFE Pharma. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Certifications</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
