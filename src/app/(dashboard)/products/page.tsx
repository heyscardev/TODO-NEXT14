import { ProductCard } from "@/products";
import { products } from "@/products/data/product";

export default function ProductsPage() {
  return (
    <div className="bg-white dark:bg-slate-400 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-2">
      {products.map((product) => (
        <ProductCard {...product} key={product.id} />
      ))}
    </div>
  );
}
