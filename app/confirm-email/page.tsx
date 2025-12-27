// app/confirm-email/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ConfirmEmailPage() {
  const params = useSearchParams();
  const userId = params.get("userId");
  const token = params.get("token");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const confirmEmail = async () => {
    setStatus("loading");
    const res = await fetch("/api/auth/confirm-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, token }),
    });

    setStatus(res.ok ? "success" : "error");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {status === "success" ? (
        <p>Email verified ✅</p>
      ) : (
        <button onClick={confirmEmail} disabled={!userId || !token} className="border bg-black rounded-2xl">
          {status === "loading" ? "Verifying..." : "Confirm Email"}
        </button>
      )}
    </div>
  );
}
