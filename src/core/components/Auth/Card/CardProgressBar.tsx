'use client';

import { LinearIndeterminate } from '@/core/components/Loading';

export default function CardProgressBar({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) {
    return (
      <div suppressHydrationWarning className="h-1 w-full" aria-hidden="true" />
    );
  }

  return (
    <div
      suppressHydrationWarning
      className="absolute top-0 left-0 right-0 z-30 overflow-hidden rounded-t-[28px]"
    >
      <LinearIndeterminate />
    </div>
  );
}
