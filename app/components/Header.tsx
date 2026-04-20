export default function Header() {
  return (
    <header className="bg-green-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌿</span>
          <div>
            <h1 className="text-2xl font-bold">EcoLIFE Pharma</h1>
            <p className="text-sm text-green-100">
              Natural Healthcare Solutions
            </p>
          </div>
        </div>
        <nav className="hidden md:flex gap-6 items-center">
          <button className="hover:text-green-200 transition">Products</button>
          <button className="hover:text-green-200 transition">About</button>
          <button className="hover:text-green-200 transition">Contact</button>
          <button className="bg-white text-green-600 px-4 py-2 rounded hover:bg-green-50 transition font-semibold">
            🛒 Cart
          </button>
        </nav>
      </div>
    </header>
  );
}
