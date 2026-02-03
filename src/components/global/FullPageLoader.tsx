"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#132135]">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
        {/* Loading text */}
        <Skeleton className="h-5 w-32 bg-gray-700" />
      </div>
    </div>
  );
}

