"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get("redirect") || "/";
  // Prevent open redirect: only allow relative paths
  const redirectTo = (rawRedirect.startsWith("/") && !rawRedirect.startsWith("//") && !rawRedirect.includes("://")) ? rawRedirect : "/";
  const message = searchParams.get("message");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="wiki-container max-w-md mx-auto mt-8">
      <h1 className="wiki-heading text-2xl mb-4">Log in</h1>

      {message && (
        <div className="wiki-notice wiki-notice-info mb-4">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="login-email" className="block text-sm font-medium mb-1">Email</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="wiki-input w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="login-password" className="block text-sm font-medium mb-1">Password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="wiki-input w-full"
            required
          />
        </div>
        <button type="submit" disabled={loading} className="wiki-btn wiki-btn-primary w-full">
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="wiki-link">
          Create one
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="wiki-container max-w-md mx-auto mt-8">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
