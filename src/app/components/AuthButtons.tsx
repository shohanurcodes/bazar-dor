
"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    const result = await authClient.signOut();

    if (result.error) {
      console.error("Sign out failed:", result.error.message);
      return;
    }

    router.replace("/sign-in");
    router.refresh();
  }

  if (isPending) {
    return (
      <Button isDisabled size="sm">
        Loading...
      </Button>
    );
  }

  
if (session) {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/profile"
        className="text-sm font-medium text-green-700 hover:underline"
      >
        Profile
      </Link>

      <span className="hidden text-sm text-gray-600 sm:inline">
        {session.user.name || session.user.email}
      </span>

      <Button
        size="sm"
        variant="outline"
        onPress={handleSignOut}
      >
        Sign Out
      </Button>
    </div>
  );
}


  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        onPress={() => router.push("/sign-in")}
      >
        Sign In
      </Button>

      <Button
        size="sm"
        onPress={() => router.push("/sign-up")}
      >
        Sign Up
      </Button>
    </div>
  );
}
