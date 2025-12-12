"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-20 mb-8">

      {/* CARD */}
      <div className="w-full max-w-[380px] sm:max-w-[480px] md:max-w-155 backdrop-blur-lg border border-white rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.9)]">

        <div className="bg-[#D9D9D9] border-22 border-[#132135] rounded-2xl">
          <CardContent className="p-8 sm:p-10">

            {/* HEADING */}
            <h1 className="text-3xl sm:text-4xl font-semibold text-center text-[#132135] leading-tight">
              Create Your SOL  
              <br /> Factory Account
            </h1>

            <p className="text-center text-gray-600 mt-2 mb-8 sm:mb-10">
              Join us today and unlock a new 
              <br /> dimension of solutions.
            </p>

            {/* FORM CONTAINER (CENTERED + RESPONSIVE) */}
            <div className="flex flex-col items-center w-full">

              {/* INNER FORM WIDTH CONTROL — w-100 on desktop, full on mobile */}
              <div className="flex flex-col space-y-6 w-full sm:w-100">

                {/* NAME */}
                <div className="w-full">
                  <Label className="text-sm text-black/70">Name</Label>
                  <Input
                    className="w-full mt-1 h-11 rounded-xl border-none bg-black/60 text-[#9CA3AF] shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                    placeholder="Name"
                  />
                </div>

                {/* EMAIL */}
                <div className="w-full">
                  <Label className="text-sm text-black/70">Email</Label>
                  <Input
                    type="email"
                    className="w-full mt-1 h-11 rounded-xl border-none bg-black/60 text-[#9CA3AF] shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                    placeholder="JOHN.DOE@EXAMPLE.COM"
                  />
                </div>

                {/* PHONE */}
                <div className="w-full">
                  <Label className="text-sm text-black/70">Phone number</Label>
                  <Input
                    className="w-full mt-1 h-11 rounded-xl border-none bg-black/60 text-[#9CA3AF] shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                    placeholder="+91 *******XXXX"
                  />
                </div>

                {/* COMPANY */}
                <div className="w-full">
                  <Label className="text-sm text-black/70">Company</Label>
                  <Input
                    className="w-full mt-1 h-11 rounded-xl border-none bg-black/60 text-[#9CA3AF] shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                    placeholder="Optional"
                  />
                </div>

                {/* PASSWORD */}
                <div className="w-full">
                  <Label className="text-sm text-black/70">Password</Label>
                  <Input
                    type="password"
                    className="w-full mt-1 h-11 rounded-xl border-none bg-black/60 text-[#9CA3AF] shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                    placeholder="••••••••"
                  />
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="w-full">
                  <Label className="text-sm text-black/70">Confirm Password</Label>
                  <Input
                    type="password"
                    className="w-full mt-1 h-11 rounded-xl border-none bg-black/60 text-[#9CA3AF] shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                    placeholder="••••••••"
                  />
                </div>

                {/* TERMS */}
                <div className="flex items-center space-x-2 mt-1">
                  <Checkbox id="terms" className="border-black/70" />
                  <Label htmlFor="terms" className="text-sm text-black/70">
                    I agree to the terms and conditions
                  </Label>
                </div>

                {/* CREATE ACCOUNT */}
                <Button className="w-full h-14 mb-3 rounded-full bg-[#132135] text-white border border-blue-400 shadow-[0_0_12px_#3b82f6] hover:bg-[#132135] hover:text-white/40 cursor-pointer">
                  CREATE ACCOUNT
                </Button>

                {/* OR */}
                <div className="text-center text-sm text-gray-600 mb-2">
                  Or continue with
                </div>

                {/* GOOGLE BUTTON */}
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-full font-semibold text-shadow-[0_0_6px_rgba(0,0,0,0.5)]
 bg-white text-gray-700 border-gray-300 shadow-md hover:bg-gray-100 hover:shadow-[0_0_12px_#3b82f6] cursor-pointer mb-2.5">
                  CONTINUE WITH GOOGLE
                </Button>

                {/* LOGIN LINK */}
                <p className="text-center text-sm text-gray-700 pt-2 pb-2">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Log in
                  </Link>
                </p>

              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
