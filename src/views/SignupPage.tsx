"use client";

import Link from "next/link";
import { useState } from "react";
import { IconBrandGoogle } from '@tabler/icons-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-28 md:pt-32 relative">
      <div className="liquid-canvas">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>

      <div className="glass-panel p-8 md:p-10 w-full max-w-lg relative z-10 mb-7 mt-1">
        <h2 className="text-3xl font-serif text-center mb-2 w-[450px]" style={{ textShadow: "0 0 3px rgba(255,255,255,0.6)" }}>Sign Up to <span className="text-blue-400">SOL Factory </span> </h2>

        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="bg-black/40 border placeholder:text-white/90 border-white/10 rounded-lg p-4 text-sm text-white"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="bg-black/40 border placeholder:text-white/90 border-white/10 rounded-lg p-4 text-sm text-white"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-black/40 placeholder:text-white/90 border border-white/10 rounded-lg p-4 text-sm text-white"
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            className="w-full bg-black/40 placeholder:text-white/90 border border-white/10 rounded-lg p-4 text-sm text-white"
          />
          
          {/* Remember Me */}
          <div className="flex items-center space-x-2 pt-1">
            <Checkbox
              id="remember-me-signup"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
              className="border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            />
            <Label
              htmlFor="remember-me-signup"
              className="text-sm text-gray-300 cursor-pointer hover:text-white transition"
            >
              Remember me
            </Label>
          </div>

          <button
            type="submit"
            className="btn-liquid w-full max-w-70 mt-5 mx-auto flex items-center justify-center gap-2 px-3 py-3 text-[12px] font-semibold uppercase tracking-widest 
                       text-gray-300 hover:text-white border-gray-500 rounded-3xl hover:bg-gray-800 transition border-2"
            onMouseEnter={(e) =>
              (e.currentTarget.classList.add("active"))
            }
            onMouseLeave={(e) =>
              (e.currentTarget.classList.remove("active"))  
            }
          >
            Submit Application
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-7">
            Or continue with
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="#"
              className="btn-liquid flex items-center justify-center gap-2 px-3 py-2 text-sm w-full max-w-70
                         font-semibold text-gray-300 hover:text-white border-gray-500 rounded-3xl hover:bg-gray-800 transition border-2"
              onMouseEnter={(e) =>
                (e.currentTarget.classList.add("active"))
              }
              onMouseLeave={(e) =>
                (e.currentTarget.classList.remove("active"))  
              }
            >
              <IconBrandGoogle className="w-5 h-6" />
              Continue with Google
            </Link>
          </div>
        </div>

        <div className="text-center mt-6">
          <span className="text-xs text-gray-400 mr-1">Already have an account?</span>
          <Link
            href="/login"
            className="text-xs text-gray-300 hover:text-white transition"
            onMouseEnter={(e) =>
              (e.currentTarget.style.textShadow = "0 0 8px rgba(255,255,255,0.6)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.textShadow = "none")
            }
          >
            Login
          </Link>


        </div>
      </div>
    </div>
  );
}
