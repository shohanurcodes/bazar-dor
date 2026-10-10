
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#f6faf7]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12 md:py-16">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-10">
          {/* Left Content */}
          <div className="w-full max-w-2xl">
            <p className="mb-3 text-sm font-medium text-green-600 sm:text-base">
              প্রতিদিনের বাজারের সর্বশেষ তথ্য
            </p>

            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
              বাজার দর জানুন,
              <br className="hidden sm:block" />
              <span className="sm:ml-2">সঠিক দামে বাজার করুন</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              প্রয়োজনীয় পণ্যের বর্তমান বাজার মূল্য এক নজরে দেখুন এবং
              বিভিন্ন বাজারের দামের তুলনা করুন।
            </p>

            <Link
              href="#products"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:text-base"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden shrink-0 md:flex">
            <div className="flex h-44 w-44 items-center justify-center rounded-full bg-green-100 lg:h-52 lg:w-52">
              <Image
                src="/bazar-hero.png"
                alt="বাজারের পণ্য"
                width={200}
                height={200}
                priority
                className="h-auto w-full max-w-[160px] object-contain lg:max-w-[190px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
