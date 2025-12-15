"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

export default function SignupPageSkeleton() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-20 mb-8">
      <div className="w-full max-w-[380px] sm:max-w-[480px] md:max-w-155 backdrop-blur-lg border border-white rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
        <div className="bg-[#D9D9D9] border-22 border-[#132135] rounded-2xl">
          <div className="p-8 sm:p-10">
            {/* Header Skeleton */}
            <Skeleton className="h-10 sm:h-12 w-64 mx-auto mb-2 bg-gray-400" />
            <Skeleton className="h-5 w-56 mx-auto mb-8 sm:mb-10 bg-gray-400" />

            {/* Form Skeleton */}
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-col space-y-6 w-full sm:w-100">
                {/* Name Field */}
                <div className="w-full">
                  <Skeleton className="h-4 w-16 mb-1 bg-gray-400" />
                  <Skeleton className="h-11 w-full bg-gray-400 rounded-xl" />
                </div>

                {/* Email Field */}
                <div className="w-full">
                  <Skeleton className="h-4 w-16 mb-1 bg-gray-400" />
                  <Skeleton className="h-11 w-full bg-gray-400 rounded-xl" />
                </div>

                {/* Phone Field */}
                <div className="w-full">
                  <Skeleton className="h-4 w-20 mb-1 bg-gray-400" />
                  <Skeleton className="h-11 w-full bg-gray-400 rounded-xl" />
                </div>

                {/* Company Field */}
                <div className="w-full">
                  <Skeleton className="h-4 w-20 mb-1 bg-gray-400" />
                  <Skeleton className="h-11 w-full bg-gray-400 rounded-xl" />
                </div>

                {/* Password Field */}
                <div className="w-full">
                  <Skeleton className="h-4 w-20 mb-1 bg-gray-400" />
                  <Skeleton className="h-11 w-full bg-gray-400 rounded-xl" />
                </div>

                {/* Confirm Password Field */}
                <div className="w-full">
                  <Skeleton className="h-4 w-32 mb-1 bg-gray-400" />
                  <Skeleton className="h-11 w-full bg-gray-400 rounded-xl" />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-center space-x-2 mt-1">
                  <Skeleton className="h-4 w-4 bg-gray-400 rounded" />
                  <Skeleton className="h-4 w-48 bg-gray-400" />
                </div>

                {/* Create Account Button */}
                <Skeleton className="h-14 w-full mb-3 bg-gray-400 rounded-full" />

                {/* Divider */}
                <Skeleton className="h-4 w-24 mx-auto mb-2 bg-gray-400" />

                {/* Google Button */}
                <Skeleton className="h-12 w-full mb-2.5 bg-gray-400 rounded-full" />

                {/* Login Link */}
                <Skeleton className="h-4 w-48 mx-auto pt-2 pb-2 bg-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

