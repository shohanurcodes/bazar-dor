
export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
      <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-6">
        <div className="h-7 w-40 rounded bg-gray-200" />

        <div className="mt-6 space-y-4">
          <div className="h-4 w-56 rounded bg-gray-100" />
          <div className="h-4 w-64 rounded bg-gray-100" />
        </div>

        <div className="mt-7 h-10 w-44 rounded-lg bg-gray-200" />
      </div>
    </main>
  );
}
