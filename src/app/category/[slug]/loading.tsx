export default function Loading() {
return ( <main className="mx-auto w-full max-w-6xl flex-1 animate-pulse px-4 py-8">
{/* Category header skeleton */} <div className="rounded-2xl bg-gray-100 p-6 sm:p-8"> <div className="h-4 w-32 rounded bg-gray-200" />


    <div className="mt-4 h-9 w-56 rounded bg-gray-200" />

    <div className="mt-3 h-4 w-72 max-w-full rounded bg-gray-200" />
  </div>

  {/* Heading and sorting skeleton */}
  <div className="my-6 flex items-center justify-between gap-4">
    <div className="h-7 w-36 rounded bg-gray-200" />
    <div className="h-10 w-44 rounded-lg bg-gray-200" />
  </div>

  {/* Product card skeletons */}
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
    {Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className="rounded-xl border border-gray-100 p-4"
      >
        <div className="h-12 w-12 rounded-lg bg-gray-200" />
        <div className="mt-5 h-5 w-3/4 rounded bg-gray-200" />
        <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" />
        <div className="mt-5 h-7 w-2/3 rounded bg-gray-200" />
      </div>
    ))}
  </div>
</main>


);
}
