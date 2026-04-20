import { Product } from "../data/products";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  filter?: string;
}

export default function ProductGrid({ products, filter }: ProductGridProps) {
  const filteredProducts = filter
    ? products.filter((p) => p.category.toLowerCase() === filter.toLowerCase())
    : products;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
