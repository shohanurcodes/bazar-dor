import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

import { getProducts } from "@/lib/api";

export default async function PriceTicker() {
  const products = await getProducts();

  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <MarqueeText
        direction="right"
        duration={25}
        pauseOnHover
      >
        <div className="flex items-center gap-8 py-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex shrink-0 items-center gap-2 text-sm"
            >
              <span>{product.image}</span>

              <span className="font-medium text-gray-700">
                {product.nameBn}
              </span>

              <span className="font-semibold text-gray-900">
                ৳{product.today}
              </span>

              {product.change.dir === "up" && (
                <span className="font-medium text-red-500">
                  ▲ {product.change.pct}%
                </span>
              )}

              {product.change.dir === "down" && (
                <span className="font-medium text-green-600">
                  ▼ {Math.abs(product.change.pct)}%
                </span>
              )}

              {product.change.dir === "flat" && (
                <span className="font-medium text-gray-400">
                  — 0%
                </span>
              )}
            </div>
          ))}
        </div>
      </MarqueeText>
    </section>
  );
}