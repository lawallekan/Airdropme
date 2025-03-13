import React from "react";
import { Skeleton } from "./ui/skeleton";

const LoadingState = () => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <div className="flex space-x-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>

      <Skeleton className="h-14 w-full" />

      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>

      <Skeleton className="h-12 w-full" />
    </div>
  );
};

export default LoadingState;
