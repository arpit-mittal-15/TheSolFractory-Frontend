"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

export default function CatalogPageSkeleton() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-[#132135] pt-24 pb-12 px-4 md:px-8">
      {/* Header Section Skeleton */}
      <div className="max-w-7xl mx-auto mb-8">
        <Skeleton className="h-10 w-64 mx-auto mb-2 bg-gray-700" />
        <Skeleton className="h-6 w-96 mx-auto mb-6 bg-gray-700" />

        {/* Selected Items Preview Skeleton */}
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 flex gap-2 min-h-[80px]">
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  className="w-16 h-16 bg-gray-600 rounded-lg flex-shrink-0"
                />
              ))}
            </div>
            <div className="w-8 flex flex-col items-center gap-1">
              <Skeleton className="h-4 w-4 bg-gray-600 rounded" />
              <Skeleton className="h-8 w-0.5 bg-gray-600" />
              <Skeleton className="h-2 w-2 bg-gray-600 rounded-full" />
              <Skeleton className="h-2 w-2 bg-gray-600 rounded-full" />
              <Skeleton className="h-8 w-0.5 bg-gray-600" />
              <Skeleton className="h-4 w-4 bg-gray-600 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar Skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <Skeleton className="h-7 w-20 mb-6 bg-gray-700" />

            {/* Filter Sections */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="mb-6">
                <Skeleton className="h-6 w-32 mb-3 bg-gray-700" />
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-4 bg-gray-600 rounded" />
                      <Skeleton className="h-4 w-20 bg-gray-600" />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Filter Buttons */}
            <div className="space-y-3 mt-6">
              <Skeleton className="h-10 w-full bg-gray-700 rounded" />
              <Skeleton className="h-10 w-full bg-gray-700 rounded" />
            </div>
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-8 w-48 bg-gray-700" />
            <Skeleton className="h-10 w-[180px] bg-gray-700 rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700"
              >
                <Skeleton className="aspect-square w-full bg-gray-700" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-5 w-3/4 bg-gray-700" />
                  <Skeleton className="h-4 w-1/2 bg-gray-700" />
                  <Skeleton className="h-6 w-16 bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

