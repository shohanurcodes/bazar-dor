
export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] py-8 sm:py-10">
      <div className="mx-auto max-w-6xl animate-pulse px-4">
        {/* Breadcrumb skeleton */}
        <div className="mb-6 h-4 w-48 rounded bg-gray-200" />

        {/* Product header skeleton */}
        <section className="flex flex-col justify-between gap-5 rounded-2xl border border-[#dce5dc] bg-white p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl bg-gray-200" />

            <div className="space-y-3">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-7 w-40 rounded bg-gray-200" />
              <div className="h-4 w-28 rounded bg-gray-200" />
            </div>
          </div>

          <div className="h-24 w-32 rounded-2xl bg-gray-200" />
        </section>

        {/* Price summary skeleton */}
        <section className="mt-5 rounded-2xl border border-[#dce5dc] bg-white p-5">
          <div className="mb-4 h-6 w-40 rounded bg-gray-200" />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-28 rounded-xl border border-gray-100 bg-gray-50"
              />
            ))}
          </div>
        </section>

        {/* Market table skeleton */}
        <section className="mt-5 rounded-2xl border border-[#dce5dc] bg-white p-5">
          <div className="mb-4 h-6 w-52 rounded bg-gray-200" />
          <div className="h-12 rounded-lg bg-gray-200" />
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="mt-3 h-10 rounded bg-gray-100"
            />
          ))}
        </section>
      </div>
    </main>
  );
}
