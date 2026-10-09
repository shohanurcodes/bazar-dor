
import Link from "next/link";
import { notFound } from "next/navigation";
import {
getCategories,
getProductsByCategory,
type Product,
} from "@/lib/api";
import SortSelect from "./SortSelect";

interface CategoryPageProps {
params: Promise<{ slug: string }>;
searchParams: Promise<{ sort?: string }>;
}

function formatPrice(price: number) {
return price.toLocaleString("bn-BD");
}

function ProductCard({ product }: { product: Product }) {
    console.log(product.slug)
const changeColor =
product.change.dir === "up"
? "bg-red-50 text-red-600"
: product.change.dir === "down"
? "bg-green-50 text-green-600"
: "bg-gray-100 text-gray-600";

const symbol =
product.change.dir === "up"
? "▲"
: product.change.dir === "down"
? "▼"
: "—";

return (
<Link
href={`/product/${product.slug}`}
className="rounded-xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
> <div className="flex items-start justify-between gap-3"> <span className="text-4xl">{product.image}</span>


    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ${changeColor}`}
    >
      {symbol} {formatPrice(product.change.pct)}%
    </span>
  </div>

  <h2 className="mt-4 font-semibold text-gray-900">
    {product.nameBn}
  </h2>

  <p className="mt-1 text-sm text-gray-500">
    প্রতি {product.unit}
  </p>

  <p className="mt-3 text-xl font-bold text-green-700">
    ৳{formatPrice(product.today)}
  </p>
</Link>


);
}

export default async function CategoryPage({
params,
searchParams,
}: CategoryPageProps) {
const [{ slug }, { sort }] = await Promise.all([
params,
searchParams,
]);

const [categories, products] = await Promise.all([
getCategories(),
getProductsByCategory(slug),
]);

const category = categories.find(
(item) => item.slug === slug,
);

if (!category) {
notFound();
}

const sortedProducts = [...products];

if (sort === "asc") {
sortedProducts.sort((a, b) => a.today - b.today);
} else if (sort === "desc") {
sortedProducts.sort((a, b) => b.today - a.today);
}

return ( <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
{/* Category header */} <section className="mb-8 rounded-2xl bg-green-50 p-6 sm:p-8"> <p className="text-sm font-medium text-green-700">
পণ্যের ক্যাটাগরি </p>


    <div className="mt-2 flex items-center gap-3">
      <span className="text-4xl">{category.icon}</span>

      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        {category.nameBn}
      </h1>
    </div>

    <p className="mt-2 text-sm text-gray-600">
      এই ক্যাটাগরির পণ্যের বর্তমান বাজারদর দেখুন।
    </p>
  </section>

  {/* Product heading and sorting */}
  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
    <h2 className="text-xl font-bold text-gray-900">
      সকল পণ্য
      <span className="ml-2 text-sm font-normal text-gray-500">
        ({formatPrice(products.length)}টি)
      </span>
    </h2>

    <SortSelect
  slug={slug}
  sort={
    sort === "asc" || sort === "desc"
      ? sort
      : "default"
  }
/>
  </div>

  {/* Products grid */}
  {sortedProducts.length > 0 ? (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {sortedProducts.map((product: Product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  ) : (
    <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center">
      <p className="text-lg font-semibold text-gray-800">
        এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
      </p>

      <Link
        href="/"
        className="mt-4 inline-block rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  )}
</main>


);
}
