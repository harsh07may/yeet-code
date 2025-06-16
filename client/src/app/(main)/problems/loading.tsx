import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
  return (
    <main className="container mx-auto p-4 min-h-screen">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Problems</h1>
        <div className="space-y-2">
          {/* Simulate table headers */}
          <Skeleton className="h-10 w-full" />

          {/* Simulate table rows */}
          <div className="space-y-5 mt-4">
            <Skeleton className="h-60 w-full" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default loading;
