import { getProducts } from "@/lib/api";
import ProductCard from "./ProductCard";

export default async function ProductSection() {
  const products = await getProducts();

  return (
    <section id="products" className="bg-[#f6faf7] py-12 scroll-mt-4">
      <div className="mx-auto max-w-6xl px-4">

        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            সব পণ্য
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            মোট {products.length} টি পণ্য পাওয়া গেছে।
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
}