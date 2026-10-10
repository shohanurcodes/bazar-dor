
"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    if (signingOut) return;

    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        const message =
          result.error.message || "Sign out failed. Please try again.";

        toast.error(message);
        console.error("Sign out failed:", message);
        return;
      }

      toast.success("Signed out successfully!");
      router.replace("/sign-in");
      router.refresh();
    } catch {
      toast.error("Something went wrong while signing out.");
    } finally {
      setSigningOut(false);
    }
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
          isDisabled={signingOut}
        >
          {signingOut ? "Signing out..." : "Sign Out"}
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
