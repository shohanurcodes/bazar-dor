"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
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
  const [socialLoading, setSocialLoading] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading || socialLoading) return;

    setLoading(true);
    setError("");

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        const message =
          result.error.message || "Invalid email or password.";

        setError(message);
        toast.error(message);
        return;
      }

      toast.success("Signed in successfully!");
      router.replace("/");
      router.refresh();
    } catch {
      const message = "Something went wrong. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignIn(
    provider: "google" | "github"
  ) {
    if (loading || socialLoading) return;

    setSocialLoading(provider);
    setError("");

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        const message =
          result.error.message ||
          `Could not sign in with ${provider}.`;

        setError(message);
        toast.error(message);
        setSocialLoading("");
      }
    } catch {
      const message = `Could not sign in with ${provider}. Please try again.`;
      setError(message);
      toast.error(message);
      setSocialLoading("");
    }
  }

  const isBusy = loading || Boolean(socialLoading);

  return (
    <main className="flex min-h-[70vh] items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold">Welcome Back</h1>

        <p className="mb-4 text-sm text-gray-500">
          Sign in to your Bazar Dor account.
        </p>

        <Form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <TextField className="w-full" isRequired>
            <Label>Email</Label>
            <Input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
            />
          </TextField>

          <TextField className="w-full" isRequired>
            <Label>Password</Label>
            <Input
              type="password"
              autoComplete="current-password"
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
            isDisabled={isBusy}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="flex w-full items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <Button
            type="button"
            variant="bordered"
            className="w-full"
            isDisabled={isBusy}
            onPress={() => handleSocialSignIn("google")}
          >
            {socialLoading === "google"
              ? "Connecting to Google..."
              : "Continue with Google"}
          </Button>

          <Button
            type="button"
            variant="bordered"
            className="w-full"
            isDisabled={isBusy}
            onPress={() => handleSocialSignIn("github")}
          >
            {socialLoading === "github"
              ? "Connecting to GitHub..."
              : "Continue with GitHub"}
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