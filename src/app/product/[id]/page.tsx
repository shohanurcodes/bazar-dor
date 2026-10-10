
import { Suspense } from "react";
import { getProduct } from "@/lib/api";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

function ProductDetailsLoading() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="animate-pulse rounded-2xl border border-[#dce5dc] bg-white p-6">
          <div className="h-6 w-40 rounded bg-gray-100" />
          <div className="mt-4 h-10 w-56 rounded bg-gray-100" />
        </div>
      </div>
    </main>
  );
}

async function ProductDetails({
  params,
}: ProductDetailsPageProps) {
  // Protect the product details route
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  // Fetch product only after authentication
  const { id } = await params;
  const product = await getProduct(id);

  const markets = product.markets ?? [];

  const lowestPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : 0;

  const highestPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : 0;

  const averagePrice = markets.length
    ? markets.reduce(
        (total, market) =>
          total + (market.min + market.max) / 2,
        0
      ) / markets.length
    : 0;

  const changeIsUp = product.change.dir === "up";
  const changeIsDown = product.change.dir === "down";

  return (
    <main className="min-h-screen bg-[#f0f5f0] py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <a href="/" className="transition hover:text-green-700">
            হোম
          </a>

          <span>›</span>

          <a
            href={`/category/${product.category}`}
            className="transition hover:text-green-700"
          >
            {product.categoryNameBn}
          </a>

          <span>›</span>

          <span className="font-medium text-gray-800">
            {product.nameBn}
          </span>
        </nav>

        {/* Product Header Card */}
        <section className="flex flex-col justify-between gap-5 rounded-2xl border border-[#dce5dc] bg-[#fbfdfb] p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-4xl">
              {product.image}
            </div>

            <div className="min-w-0">
              <p className="text-sm text-gray-500">
                {product.categoryNameBn}
              </p>

              <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {product.unit}
              </p>

              <p
                className={`mt-2 text-sm ${
                  changeIsUp
                    ? "text-red-600"
                    : changeIsDown
                      ? "text-green-600"
                      : "text-gray-500"
                }`}
              >
                {changeIsUp
                  ? "গতকালের তুলনায় আজ দাম বেড়েছে"
                  : changeIsDown
                    ? "গতকালের তুলনায় আজ দাম কমেছে"
                    : "গতকালের তুলনায় দাম অপরিবর্তিত"}

                {" "}

                {product.change.pct > 0 ? "+" : ""}
                {product.change.pct}%
              </p>
            </div>
          </div>

          {/* Today's Price Badge */}
          <div className="shrink-0 rounded-2xl bg-[#f0f5f0] px-5 py-4 text-center sm:min-w-32">
            <p className="text-sm text-gray-500">
              আজকের দাম
            </p>

            <p className="mt-1 text-3xl font-bold text-gray-900">
              ৳{product.today}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              টাকা / {product.unit}
            </p>

            <p
              className={`mt-1 text-sm font-semibold ${
                changeIsUp
                  ? "text-red-600"
                  : changeIsDown
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {product.change.pct > 0
                ? "▲"
                : product.change.pct < 0
                  ? "▼"
                  : "—"}

              {" "}

              {Math.abs(product.change.pct)}%
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-5 rounded-2xl border border-[#dce5dc] bg-[#fbfdfb] p-4 sm:p-5">
          <h2 className="text-lg font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* Lowest Price */}
            <div className="rounded-xl border border-[#dce5dc] p-4">
              <p className="text-sm text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-1 text-xl font-bold text-green-600">
                ৳{Math.round(lowestPrice)}
                <span className="ml-1 text-sm font-normal">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            {/* Highest Price */}
            <div className="rounded-xl border border-[#dce5dc] p-4">
              <p className="text-sm text-gray-500">
                সর্বাধিক দাম
              </p>

              <p className="mt-1 text-xl font-bold text-red-500">
                ৳{Math.round(highestPrice)}
                <span className="ml-1 text-sm font-normal">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            {/* Average Price */}
            <div className="rounded-xl border border-[#dce5dc] p-4">
              <p className="text-sm text-gray-500">
                গড় দাম
              </p>

              <p className="mt-1 text-xl font-bold text-green-600">
                ৳{Math.round(averagePrice)}
                <span className="ml-1 text-sm font-normal">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {product.unit} হিসেবে
              </p>
            </div>
          </div>
        </section>

        {/* Market Prices Table */}
        <section className="mt-5 rounded-2xl border border-[#dce5dc] bg-[#fbfdfb] p-4 sm:p-5">
          <h2 className="text-lg font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="mt-3 overflow-x-auto rounded-xl border border-[#dce5dc]">
            <table className="w-full min-w-[650px] border-collapse text-left text-sm">
              <thead className="bg-[#f5f8f5] text-gray-600">
                <tr>
                  <th className="px-4 py-3 font-medium">
                    বাজার
                  </th>

                  <th className="px-4 py-3 font-medium">
                    বিভাগ
                  </th>

                  <th className="px-4 py-3 text-right font-medium">
                    সর্বনিম্ন
                  </th>

                  <th className="px-4 py-3 text-right font-medium">
                    সর্বোচ্চ
                  </th>

                  <th className="px-4 py-3 text-right font-medium">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${market.division}-${index}`}
                    className="border-t border-[#e7ece7] transition hover:bg-[#f5f8f5]"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {market.market}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {market.division}
                    </td>

                    <td className="px-4 py-3 text-right text-gray-700">
                      {market.min} টাকা
                    </td>

                    <td className="px-4 py-3 text-right text-gray-700">
                      {market.max} টাকা
                    </td>

                    <td className="px-4 py-3 text-right font-semibold text-gray-800">
                      {((market.min + market.max) / 2).toFixed(2)} টাকা
                    </td>
                  </tr>
                ))}

                {markets.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      এই পণ্যের বাজারভিত্তিক দাম পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  return (
    <Suspense fallback={<ProductDetailsLoading />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}
