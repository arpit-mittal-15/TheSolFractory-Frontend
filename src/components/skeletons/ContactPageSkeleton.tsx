"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ContactPageSkeleton() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-[#132135] pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-12 md:mb-16">
          <Skeleton className="h-12 md:h-14 w-80 mx-auto mb-4 bg-gray-700" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto bg-gray-700" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Contact Info Cards Skeleton - Left Side */}
          <div className="lg:col-span-1 space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <Skeleton className="h-12 w-12 bg-gray-700 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-20 bg-gray-700" />
                    <Skeleton className="h-4 w-full bg-gray-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form Skeleton - Right Side */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 rounded-lg p-6 md:p-10 border border-gray-700">
              <Skeleton className="h-8 w-48 mb-6 bg-gray-700" />
              <div className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16 bg-gray-700" />
                    <Skeleton className="h-11 w-full bg-gray-700 rounded" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16 bg-gray-700" />
                    <Skeleton className="h-11 w-full bg-gray-700 rounded" />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20 bg-gray-700" />
                  <Skeleton className="h-11 w-full bg-gray-700 rounded" />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20 bg-gray-700" />
                  <Skeleton className="h-40 w-full bg-gray-700 rounded" />
                </div>

                {/* Submit Button */}
                <Skeleton className="h-12 w-full md:w-48 bg-gray-700 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section Skeleton */}
        <div className="mt-12 md:mt-16">
          <div className="bg-gray-800/30 rounded-lg p-6 md:p-8 border border-gray-700/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center space-y-2">
                  <Skeleton className="h-6 w-32 mx-auto bg-gray-700" />
                  <Skeleton className="h-4 w-full bg-gray-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

