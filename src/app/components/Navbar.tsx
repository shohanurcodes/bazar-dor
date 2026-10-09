import { getCategories } from "@/lib/api";
import DateDisplay from "./DateDisplay";
import Link from "next/link";

export default async function Navbar() {
  const categories = await getCategories();


  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        {/* Logo + Date */}
        <Link href="/" className="flex items-center gap-2 py-4"> 
        <div className="py-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛒</span>

            <span className="text-xl font-bold text-green-700">
              বাজার দর
            </span>
          </div>

          
            <DateDisplay />
          
        </div>
</Link>
        {/* Categories */}
        <nav className="flex gap-6 overflow-x-auto border-t border-gray-100 py-3">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/category/${category.slug}`}
              className="shrink-0 text-sm font-medium text-gray-600 transition hover:text-green-700"
            >
              {category.icon} {category.nameBn}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}