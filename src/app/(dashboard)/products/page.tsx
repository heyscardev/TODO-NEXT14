import { ProductCard } from "@/products";

export default function ProductsPage() {
  return (
    <div className="bg-white rounded-lg p-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
      <ProductCard />
    </div>
  );
}
