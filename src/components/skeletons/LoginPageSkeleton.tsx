"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

export default function LoginPageSkeleton() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex items-center justify-center p-1 mt-20 mb-10.5">
      <div className="w-full max-w-155 backdrop-blur-lg border border-white rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
        <div className="bg-[#D9D9D9] border-22 border-[#132135] rounded-2xl">
          <div className="p-8 md:p-10">
            {/* Header Skeleton */}
            <Skeleton className="h-9 w-32 mx-auto mb-2 bg-gray-400" />
            <Skeleton className="h-5 w-64 mx-auto mb-10 bg-gray-400" />

            {/* Form Skeleton */}
            <div className="flex flex-col items-center space-y-8">
              {/* Email Input */}
              <Skeleton className="h-11 w-80 bg-gray-400 rounded-xl" />

              {/* Password Input */}
              <Skeleton className="h-11 w-80 bg-gray-400 rounded-xl" />

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between w-80">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 bg-gray-400 rounded" />
                  <Skeleton className="h-4 w-24 bg-gray-400" />
                </div>
                <Skeleton className="h-4 w-32 bg-gray-400" />
              </div>

              {/* Login Button */}
              <Skeleton className="h-14 w-65 mb-3 bg-gray-400 rounded-full" />

              {/* Divider */}
              <Skeleton className="h-4 w-32 mb-3 bg-gray-400" />

              {/* Google Button */}
              <Skeleton className="h-12 w-65 mb-2.5 bg-gray-400 rounded-full" />

              {/* Sign Up Link */}
              <Skeleton className="h-4 w-48 mb-1 bg-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

