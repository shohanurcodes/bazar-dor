import { getProducts } from "@/lib/api";
import ProductCard from "./ProductCard";

export default async function PriceMovement() {
  const products = await getProducts();

  const increasedProducts = products
    .filter((product) => product.change.dir === "up")
    .slice(0, 6);

  const decreasedProducts = products
    .filter((product) => product.change.dir === "down")
    .slice(0, 6);

  return (
    <section className="bg-[#f6faf7] py-10">
      <div className="mx-auto max-w-6xl px-4">

        {/* দাম বেড়েছে */}
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />

            <h2 className="text-xl font-bold text-gray-900">
              আজ দাম বেড়েছে
            </h2>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {increasedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>

        {/* দাম কমেছে */}
        <div className="mt-10">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

            <h2 className="text-xl font-bold text-gray-900">
              আজ দাম কমেছে
            </h2>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {decreasedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}