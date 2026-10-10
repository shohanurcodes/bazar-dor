
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

import { Button, Input, Label } from "@heroui/react";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) return;

    const trimmedName = name.trim();

    // Custom validation runs before the API request.
    if (!trimmedName) {
      toast.error("Name is required.");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        toast.error(
          result.error.message || "Could not update your name."
        );
        return;
      }

      await authClient.getSession();

      toast.success("Profile updated successfully!");

      router.replace("/profile");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return (
      <p className="p-8 text-center">Loading profile...</p>
    );
  }

  if (!session) {
    return (
      <main className="p-8 text-center">
        <p>Please sign in to update your profile.</p>

        <Button onPress={() => router.push("/sign-in")}>
          Sign In
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <div className="rounded-xl border border-gray-200 p-6">
        <h1 className="mb-2 text-2xl font-bold">
          Update Information
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Update your profile name.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4"
        >
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="profile-name">Name</Label>

            <Input
              id="profile-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              autoComplete="name"
              aria-required="true"
            />
          </div>

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full"
          >
            {loading ? "Updating..." : "Update Information"}
          </Button>
        </form>
      </div>
    </main>
  );
}
