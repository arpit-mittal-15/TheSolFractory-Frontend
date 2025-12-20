"use client";

import Link from "next/link";
import { useState } from "react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-28 md:pt-32 relative">
      <div className="liquid-canvas">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>

      <div className="glass-panel p-8 md:p-10 w-full max-w-lg relative z-10 mb-8 mt-1">
        <h2
          className="text-3xl font-serif text-center mb-9.25 w-112.5"
          style={{ textShadow: "0 0 3px rgba(255,255,255,0.6)" }}
        >
          Sign Up to <span className="text-blue-400">SOL Factory</span>
        </h2>

        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="bg-black/40 border placeholder:text-white border-white/10 rounded-lg p-4 text-sm text-white"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="bg-black/40 border placeholder:text-white border-white/10 rounded-lg p-4 text-sm text-white"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-black/40 placeholder:text-white border border-white/10 rounded-lg p-4 text-sm text-white"
          />

          {/* Company */}
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            className="w-full bg-black/40 placeholder:text-white border border-white/10 rounded-lg p-4 text-sm text-white"
          />

          {/* Password */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="bg-black/40 border placeholder:text-white border-white/10 rounded-lg p-4 text-sm text-white"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="bg-black/40 border placeholder:text-white border-white/10 rounded-lg p-4 text-sm text-white"
            />
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start gap-3 pt-2">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked === true)}
              className="mt-1 ml-1 border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            />
            <Label
              htmlFor="terms"
              className="text-sm text-gray-300 leading-relaxed cursor-pointer hover:text-white transition"
            >
              I agree to the{" "}
              <Link href="/terms" className="text-blue-400 hover:underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-400 hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>

          {/* Submit */}
          <Link
            href="#"
            className="btn-liquid active flex items-center justify-center mt-14 gap-2 px-3 py-3 text-sm w-full max-w-70 mx-auto
              font-semibold text-gray-300 hover:text-white border-gray-500 rounded-3xl hover:bg-gray-800 transition border-2"
            // onMouseEnter={(e) => e.currentTarget.classList.add("active")}
            // onMouseLeave={(e) => e.currentTarget.classList.remove("active")}
          >
            Sign Up
          </Link>
        </form>

        {/* Social */}
        <div className="mt-[25px]">
          <p className="text-[11px] text-center uppercase tracking-widest text-gray-400 mb-[25px]">
            Or continue with
          </p>
          <Link
            href="#"
            className="btn-liquid flex items-center justify-center gap-2 px-3 py-3 text-sm w-full max-w-70 mx-auto
              font-semibold text-gray-300 hover:text-white border-gray-500 rounded-3xl hover:bg-gray-800 transition border-2"
            // onMouseEnter={(e) => e.currentTarget.classList.add("active")}
            // onMouseLeave={(e) => e.currentTarget.classList.remove("active")}
          >
            <IconBrandGoogle className="w-5 h-6" />
            Continue with Google
          </Link>
        </div>

        {/* Login */}
        <div className="text-center mt-6">
          <span className="text-xs text-gray-400 mr-1">
            Already have an account?
          </span>
          <Link
            href="/login"
            className="text-xs text-gray-300 hover:text-white transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
