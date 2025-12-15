"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

export default function HomePageSkeleton() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-[#132135]">
      {/* Hero Section Skeleton */}
      <section className="text-white py-20 px-6 text-center mt-28">
        <div className="space-y-4">
          <Skeleton className="h-12 md:h-16 w-full max-w-3xl mx-auto bg-gray-700" />
          <Skeleton className="h-12 md:h-16 w-full max-w-2xl mx-auto bg-gray-700" />
          <Skeleton className="h-6 md:h-8 w-full max-w-xl mx-auto bg-gray-700" />
          <div className="flex justify-center gap-4 flex-wrap mt-8">
            <Skeleton className="h-12 w-[200px] md:w-[22vw] bg-gray-700 rounded-3xl" />
            <Skeleton className="h-12 w-[150px] bg-gray-700 rounded-3xl" />
          </div>
        </div>
      </section>

      {/* Carousel Skeleton */}
      <section className="py-12 px-6">
        <Skeleton className="h-64 md:h-96 w-full max-w-6xl mx-auto bg-gray-700 rounded-lg" />
      </section>

      {/* Advantages Section Skeleton */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <Skeleton className="h-10 w-64 mx-auto bg-gray-700" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full bg-gray-700 rounded-lg" />
                <Skeleton className="h-6 w-3/4 bg-gray-700" />
                <Skeleton className="h-4 w-full bg-gray-700" />
                <Skeleton className="h-4 w-5/6 bg-gray-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Cards Skeleton */}
      <section className="py-12 px-6 space-y-12">
        {[1, 2].map((i) => (
          <div
            key={i}
            className={`max-w-7xl mx-auto ${
              i % 2 === 0 && !isMobile ? "flex-row-reverse" : ""
            } flex flex-col ${isMobile ? "" : "md:flex-row"} gap-8 items-center`}
          >
            <div className="flex-1 space-y-4">
              <Skeleton className="h-8 w-3/4 bg-gray-700" />
              <Skeleton className="h-6 w-full bg-gray-700" />
              <Skeleton className="h-6 w-5/6 bg-gray-700" />
              <div className="space-y-2 mt-4">
                <Skeleton className="h-4 w-2/3 bg-gray-700" />
                <Skeleton className="h-4 w-3/4 bg-gray-700" />
                <Skeleton className="h-4 w-2/3 bg-gray-700" />
              </div>
              <Skeleton className="h-4 w-full mt-4 bg-gray-700" />
            </div>
            <Skeleton className="flex-1 h-64 md:h-80 w-full bg-gray-700 rounded-lg" />
          </div>
        ))}
      </section>

      {/* Trust Section Skeleton */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <Skeleton className="h-10 w-64 mx-auto bg-gray-700" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 w-full bg-gray-700 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

