
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");
    setMessage("");

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Name is required.");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        setError(result.error.message || "Could not update your name.");
        return;
      }

      setMessage("Name updated successfully!");
      await authClient.getSession();
      router.replace("/profile");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return <p className="p-8 text-center">Loading profile...</p>;
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

        <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField className="w-full" isRequired>
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
            />
          </TextField>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          {message && (
            <p role="status" className="text-sm text-green-700">
              {message}
            </p>
          )}

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full"
          >
            {loading ? "Updating..." : "Update Information"}
          </Button>
        </Form>
      </div>
    </main>
  );
}
