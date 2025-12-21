"use client";

import Link from "next/link";
import { useState } from "react";
import { IconBrandGoogle, IconEye, IconEyeOff } from '@tabler/icons-react';
import { Checkbox } from "@/components/ui/checkbox";
import { AuthService } from "@/services/auth.service";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function SignupPage() {

  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert("Please accept terms & conditions");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await AuthService.register({
        email: form.email,
        name: `${form.firstName} ${form.lastName}`,
        phoneNumber: "", // backend requires it → adjust later if needed
        password: form.password,
        role: "User",
      });

      // Success UX
      router.push("/");
    } 
    catch (err: unknown) {
        if (err instanceof Error) {
          alert(err.message);
          console.error(err.message);
        } 
        else {
          alert("Something went wrong");
          console.error(err);
       }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-28 md:pt-32 relative">
      {/* Background */}
      <div className="liquid-canvas">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>

      {/* Card */}
      <div className="glass-panel w-full max-w-lg p-6 sm:p-8 md:p-10 relative z-10 mb-13">
        {/* Heading */}
        <h2
          className="text-3xl font-serif text-center mb-8 w-full max-w-112.5 mx-auto"
          style={{ textShadow: "0 0 2px rgba(255,255,255,0.6)" }}
        >
          Sign Up to <span className="text-blue-400">SOL Factory</span>
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="bg-black/40 border border-white/10 placeholder:text-white/50 rounded-lg p-4 text-sm text-white outline-none focus:border-blue-500 transition"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="bg-black/40 border border-white/10 placeholder:text-white/50 rounded-lg p-4 text-sm text-white outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 placeholder:text-white/50 rounded-lg p-4 text-sm text-white outline-none focus:border-blue-500 transition"
          />

          {/* Company */}
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 placeholder:text-white/50 rounded-lg p-4 text-sm text-white outline-none focus:border-blue-500 transition"
          />

          {/* Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg p-4 pr-12 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <IconEyeOff className="mr-1.5 w-5 h-5" />
              ) : (
                <IconEye className="mr-1.5 w-5 h-5" />
              )}
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full bg-black/40 border placeholder:text-white/50 border-white/10 rounded-lg p-4 pr-12 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <IconEyeOff className="mr-1.5 w-5 h-5" />
              ) : (
                <IconEye className="mr-1.5 w-5 h-5" />
              )}
            </button>
          </div>
          </div>

          {/* Terms */}
          <div className="flex items-center md:gap-3 gap-2 pt-2">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked === true)}
              className="border-white/20 ml-3 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            />

            <Label
              htmlFor="terms"
              className="text-[10px] md:text-sm  text-gray-300 leading-relaxed cursor-pointer"
            >
              I agree to the{" "}
              <Link
                href="/"
                className="text-blue-400 hover:underline whitespace-nowrap"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/"
                className="text-blue-400 hover:underline whitespace-nowrap"
              >
                Privacy Policy
              </Link>
            </Label>
          </div>


          {/* Submit */}
          <button
            type="submit"
            className="hover:active btn-liquid active w-full max-w-70 mt-13.5 mx-auto flex items-center justify-center gap-2 px-5 py-3 text-[13px] font-semibold uppercase tracking-widest 
                       text-gray-300 hover:text-white border-gray-500 rounded-3xl hover:bg-gray-800 transition border-2"
          >
            Sign Up
          </button>
        </form>

        {/* Social */}
        <div className="mt-6">
          <p className="text-[11px] text-center uppercase tracking-widest text-gray-400 mb-5">
            Or continue with
          </p>
          <Link
            href="#"
            className="btn-liquid flex items-center justify-center gap-2 px-4 py-3 text-sm w-full max-w-72 mx-auto
              font-semibold text-gray-300 hover:text-white border-gray-500 rounded-3xl hover:bg-gray-800 transition border-2"
          >
            <IconBrandGoogle className="w-5 h-5" />
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
