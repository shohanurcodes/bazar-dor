
import { getCategories } from "@/lib/api";
import DateDisplay from "./DateDisplay";
import AuthButtons from "./AuthButtons";
import Link from "next/link";

export default async function Navbar() {
  const categories = await getCategories();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        {/* Logo + Date + Authentication */}
        <div className="flex items-center justify-between gap-3 py-4">
          <Link href="/" className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛒</span>

              <span className="text-xl font-bold text-green-700">
                বাজার দর
              </span>
            </div>

            <DateDisplay />
          </Link>

          <AuthButtons />
        </div>

        {/* Categories */}
        <nav className="flex gap-6 overflow-x-auto border-t border-gray-100 py-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="shrink-0 text-sm font-medium text-gray-600 transition hover:text-green-700"
            >
              {category.icon} {category.nameBn}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
