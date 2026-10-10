
import { Suspense } from "react";
import Link from "next/link";
import { getSession } from "@/lib/get-session";

function ProfileLoading() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="animate-pulse rounded-xl border border-gray-200 p-6">
        <div className="h-7 w-40 rounded bg-gray-200" />
        <div className="mt-5 h-4 w-56 rounded bg-gray-100" />
      </div>
    </main>
  );
}

async function ProfileContent() {
  const session = await getSession();

  if (!session) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold">My Profile</h1>

        <p className="mt-3 text-gray-600">
          নিজের profile দেখতে Sign In করুন।
        </p>

        <Link
          href="/sign-in"
          className="mt-4 inline-block rounded-lg bg-green-700 px-4 py-2 text-white"
        >
          Sign In
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h1 className="text-2xl font-bold text-green-700">
          My Profile
        </h1>

        <div className="mt-5 space-y-3">
          <p>
            <strong>Name:</strong>{" "}
            {session.user.name || "Not set"}
          </p>

          <p>
            <strong>Email:</strong> {session.user.email}
          </p>
        </div>

        <Link
          href="/profile/update"
          className="mt-6 inline-block rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
        >
          Update Information
        </Link>
      </div>
    </main>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileLoading />}>
      <ProfileContent />
    </Suspense>
  );
}
