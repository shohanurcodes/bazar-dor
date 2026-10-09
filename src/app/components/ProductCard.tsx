import Link from "next/link";
import type { Product } from "@/lib/api";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.id}`}
      className="block rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Top */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-2xl">
            {product.image}
          </div>

          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              {product.nameBn}
            </h3>

            <p className="mt-0.5 text-xs text-gray-500">
              প্রতি {product.unit}
            </p>
          </div>
        </div>

        <span
          className={`shrink-0 text-sm font-medium ${
            isUp
              ? "text-red-500"
              : isDown
                ? "text-green-600"
                : "text-gray-500"
          }`}
        >
          {product.change.pct > 0 ? "+" : ""}
          {product.change.pct}%
        </span>
      </div>

      {/* Price */}
      <div className="mt-5">
        <span className="text-2xl font-bold text-gray-900">
          ৳{product.today}
        </span>

        <span className="ml-1 text-sm text-gray-500">
          / {product.unit}
        </span>
      </div>
    </Link>
  );
}