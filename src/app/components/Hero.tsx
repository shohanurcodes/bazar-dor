import Image from "next/image";
import Link from "next/link";
export default function Hero() {
  return (
    <section className="bg-[#f6faf7]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center justify-between gap-8">
          
          {/* Left Content */}
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-medium text-green-600">
              প্রতিদিনের বাজারের সর্বশেষ তথ্য
            </p>

            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              বাজার দর জানুন,
              <br />
              সঠিক দামে বাজার করুন
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600">
              প্রয়োজনীয় পণ্যের বর্তমান বাজার মূল্য এক নজরে দেখুন এবং
              বিভিন্ন বাজারের দামের তুলনা করুন।
            </p>

            <button className="mt-6 rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700">
              সব পন্য দেখুন
            </button>
          </div>

          {/* Right Side */}
          <div className="hidden md:block">
            <div className="flex h-52 w-52 items-center justify-center rounded-full bg-green-100 text-8xl">
              <Image src="/bazar-hero.png" alt="Hero Image" width={200} height={200} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}