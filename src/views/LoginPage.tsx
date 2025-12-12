"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-1 mt-20 mb-10.5">

      {/* YOUR CARD – untouched */}
      <div className="w-full max-w-155 backdrop-blur-lg border border-white rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.9)]">

        <div className="bg-[#D9D9D9] border-22 border-[#132135] rounded-2xl">

          {/* Centered content + better spacing */}
          <CardContent className="p-10">

            <h1 className="text-3xl font-semibold text-center text-[#132135]">
              Log In
            </h1>

            <p className="text-center text-gray-600 mt-2 mb-10">
              Welcome back to SOL Factory.  
              <br /> Please enter your details.
            </p>

            {/* Perfect spacing between all form items */}
            <div className="flex flex-col items-center space-y-8">

              {/* EMAIL */}
              <Input
                type="email"
                className="border border-white/20 bg-black/60 h-11 rounded-xl text-[#9CA3AF] shadow-[0_15px_30px_rgba(0,0,0,0.5)] w-80"
                placeholder="EMAIL ID"
              />

              {/* PASSWORD */}
              <Input
                type="password"
                className="border border-white/20 bg-black/60 h-11 rounded-xl text-[#9CA3AF] shadow-[0_15px_30px_rgba(0,0,0,0.5)] w-80"
                placeholder="PASSWORD"
              />

              {/* REMEMBER + FORGOT */}
              <div className="flex items-center justify-between w-80">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="border-black/70 size-4" />
                  <Label htmlFor="remember" className="text-sm text-black/70">
                    Remember me
                  </Label>
                </div>

                <Link href="#" className="text-sm text-blue-500 hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* LOGIN BUTTON */}
              <Button className="w-65 h-14 mb-3 rounded-full bg-[#132135] text-white border border-blue-400 shadow-[0_0_12px_#3b82f6] hover:bg-[#132135] hover:text-white/40 cursor-pointer">
                LOG IN
              </Button>

              {/* Divider text */}
              <div className="text-center text-sm text-gray-600 mb-3">
                Or continue with
              </div>

              {/* GOOGLE BUTTON */}
              <Button
                variant="outline"
                className="w-65 h-12 rounded-full font-semibold text-shadow-[0_0_6px_rgba(0,0,0,0.5)]
 bg-white text-gray-700 border-gray-300 shadow-md hover:bg-gray-100 hover:shadow-[0_0_12px_#3b82f6] cursor-pointer mb-2.5"
              >
                CONTINUE WITH GOOGLE
              </Button>

              {/* SIGN UP */}
              <p className="text-center text-sm text-gray-700">
                Don’t have an account?{" "}
                <Link href="/signup" className="text-blue-600 mb-1 hover:underline">
                  Sign Up
                </Link>
              </p>

            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
