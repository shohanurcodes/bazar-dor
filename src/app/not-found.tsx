
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <p className="text-7xl font-extrabold text-green-600">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
          দুঃখিত, তুমি যে পেজটি খুঁজছ সেটি পাওয়া যাচ্ছে না।
          লিংকটি ভুল হতে পারে অথবা পেজটি সরিয়ে ফেলা হয়েছে।
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
        >
          ← হোম পেজে ফিরে যাও
        </Link>
      </div>
    </main>
  );
}
