"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "@/src/components/Footer";
import Link from "next/link";

export default function VerifyEmailPendingPage() {
  const params = useSearchParams();
  const email = params.get("email");

  return (
  <>
      <div className="min-h-screen bg-transparent flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-emerald-500 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M3 8.5L12 13l9-4.5v7A2.5 2.5 0 0118.5 18h-13A2.5 2.5 0 013 15.5v-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-white">Verify your email</h1>
              <p className="mt-1 text-sm text-gray-300">
                We sent a verification link to
              </p>

              {email && (
                <p className="mt-1 text-sm font-medium text-white break-all">
                  {email}
                </p>
              )}

              {/* messages */}
              <div className="mt-4">
              </div>

              <div className="mt-6 text-sm text-gray-400">
                Didn’t receive it? Check your spam folder or try resending. If you used a work email, corporate filters might block messages — try a personal email.
              </div>

              <div className="mt-4 text-sm text-gray-400">
                Need help? <Link href="mailto:braj@thesolfactory.com" className="text-indigo-400 hover:underline">Contact support</Link>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-gray-400">For security, this link will expire in a short time.</div>
        </div>
      </div>
      <Footer />
  </>
  );
}
