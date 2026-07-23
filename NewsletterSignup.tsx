"use client";

import { useState } from "react";

interface NewsletterSignupProps {
  variant?: "inline" | "card" | "banner";
}

export default function NewsletterSignup({
  variant = "card",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're subscribed!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-5 py-2.5 bg-primary-600 text-white font-semibold text-sm rounded-lg hover:bg-primary-700 disabled:opacity-60 transition"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </form>
    );
  }

  if (variant === "banner") {
    return (
      <div className="newsletter-cta rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-2">
          📬 Stay in the Loop
        </h3>
        <p className="text-white/80 text-sm mb-4">
          Get weekly reviews, guides, and exclusive deals.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
            className="flex-1 px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-5 py-2.5 bg-white text-primary-700 font-semibold text-sm rounded-lg hover:bg-gray-100 disabled:opacity-60 transition"
          >
            {status === "loading" ? "..." : "Join"}
          </button>
        </form>
        {status === "success" && (
          <p className="text-green-200 text-sm mt-3">✅ {message}</p>
        )}
        {status === "error" && (
          <p className="text-red-200 text-sm mt-3">❌ {message}</p>
        )}
      </div>
    );
  }

  // Card variant
  return (
    <div className="bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100 rounded-2xl p-6">
      <div className="text-center mb-4">
        <span className="text-3xl mb-2 block">📬</span>
        <h3 className="text-lg font-bold text-gray-900">
          Join Our Newsletter
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Get the latest reviews & deals delivered weekly.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full px-4 py-2.5 bg-primary-600 text-white font-semibold text-sm rounded-lg hover:bg-primary-700 disabled:opacity-60 transition"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe — It's Free"}
        </button>
      </form>
      {status === "success" && (
        <p className="text-green-600 text-sm mt-3 text-center">
          ✅ {message}
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm mt-3 text-center">
          ❌ {message}
        </p>
      )}
      <p className="text-[11px] text-gray-500 text-center mt-3">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
