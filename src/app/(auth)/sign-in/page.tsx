
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from 'next/link';
import {
  Button,
  Card,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(
          result.error.message || "Invalid email or password."
        );
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="mb-4 text-sm text-gray-500">
          Sign in to your Bazar Dor account.
        </p>

        <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField className="w-full" isRequired>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
            />
          </TextField>

          <TextField className="w-full" isRequired>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
            />
          </TextField>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            isDisabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <p className="text-sm">
            Don't have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign Up
            </Link>
          </p>
        </Form>
      </Card>
    </main>
  );
}
