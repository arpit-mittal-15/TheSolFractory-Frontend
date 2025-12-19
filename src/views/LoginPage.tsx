"use client";

import Link from "next/link";
import { useState } from "react";
import { IconBrandGoogle } from '@tabler/icons-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
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

      <div className="glass-panel p-8 md:p-10 w-full max-w-md relative z-10 mb-7 mt-1">
        <h2 className="text-3xl font-serif text-center mb-2" style={{ textShadow: "0 0 4px rgba(255,255,255,0.6)" }}>Login</h2>

        <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-black/40 border placeholder:text-white/90 border-white/10 rounded-lg p-4 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-black/40 border placeholder:text-white/90 border-white/10 rounded-lg p-4 text-sm text-white focus:border-blue-500 outline-none transition focus:bg-black/60"
          />
          
          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                className="border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
              />
              <Label
                htmlFor="remember-me"
                className="text-sm text-gray-300 cursor-pointer hover:text-white transition"
              >
                Remember me
              </Label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-gray-300 hover:text-blue-400 transition"
              onMouseEnter={(e) =>
                (e.currentTarget.style.textShadow = "0 0 8px rgba(59,130,246,0.6)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.textShadow = "none")
              }
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="hover:active btn-liquid w-full max-w-70 mt-4 mx-auto flex items-center justify-center gap-2 px-5 py-3 text-[13px] font-semibold uppercase tracking-widest 
                       text-gray-300 hover:text-white border-gray-500 rounded-3xl hover:bg-gray-800 transition border-2"
            onMouseEnter={(e) =>
              (e.currentTarget.classList.add("active"))
            }
            onMouseLeave={(e) =>
              (e.currentTarget.classList.remove("active"))  
            }
          >
            Sign In
          </button>
        </form>

        <div className="mt-7 pt-6 border-t border-white/10 text-center">
          <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-6 mt-0">
            Or continue with
          </p>
          <div className="flex justify-center gap-4">
            <a
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
            </a>
          </div>
        </div>

        <div className="text-center mt-6">
          <span className="text-xs text-gray-400 mr-1">Don’t have an account?</span>
          <Link
            href="/signup"
            className="text-xs text-gray-300 hover:text-white transition"
            onMouseEnter={(e) =>
              (e.currentTarget.style.textShadow = "0 0 8px rgba(255,255,255,0.6)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.textShadow = "none")
            }
          >
            SignUp
          </Link>

        </div>
      </div>
    </div>
  );
}
