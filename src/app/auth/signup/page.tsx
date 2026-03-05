"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/auth/login?message=Check your email to confirm your account");
    router.refresh();
  }

  return (
    <div className="wiki-container max-w-md mx-auto mt-8">
      <h1 className="wiki-heading text-2xl mb-4">Create account</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label htmlFor="signup-username" className="block text-sm font-medium mb-1">Username</label>
          <input
            id="signup-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="wiki-input w-full"
            required
            minLength={3}
          />
        </div>
        <div>
          <label htmlFor="signup-email" className="block text-sm font-medium mb-1">Email</label>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="wiki-input w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="signup-password" className="block text-sm font-medium mb-1">Password</label>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="wiki-input w-full"
            required
            minLength={6}
          />
        </div>
        <button type="submit" disabled={loading} className="wiki-btn wiki-btn-primary w-full">
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link href="/auth/login" className="wiki-link">
          Log in
        </Link>
      </p>
    </div>
  );
}
