
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Card,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message || "Registration failed.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-default-50 px-4 py-12">
      <Card className="w-full max-w-md rounded-2xl border border-default-200 bg-background p-6 shadow-xl sm:p-8">
        <div className="mb-6 space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Bazar Dor
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Create your account
          </h1>

          <p className="text-sm text-default-500">
            Sign up to continue shopping with Bazar Dor.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-xl border border-danger/30 bg-danger/10 p-3 text-sm text-danger"
          >
            {error}
          </div>
        )}

        <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextField
            name="name"
            isRequired
            className="w-full gap-2"
          >
            <Label>Full name</Label>
            <Input
              className="w-full"
              placeholder="Enter your full name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </TextField>

          <TextField
            name="email"
            type="email"
            isRequired
            className="w-full gap-2"
          >
            <Label>Email address</Label>
            <Input
              className="w-full"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </TextField>

          <TextField
            name="password"
            type="password"
            isRequired
            className="w-full gap-2"
          >
            <Label>Password</Label>
            <Input
              className="w-full"
              placeholder="At least 8 characters"
              autoComplete="new-password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </TextField>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isPending={loading}
            isDisabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </Form>

        <div className="mt-6 border-t border-default-200 pt-5 text-center text-sm text-default-500">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </Link>
        </div>
      </Card>
    </main>
  );
}
