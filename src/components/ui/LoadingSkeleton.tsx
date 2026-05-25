export default function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl bg-glass/50 border border-glass-border p-5 animate-pulse"
        >
          <div className="flex gap-4">
            <div className="w-20 h-20 rounded-lg bg-gray-800" />
            <div className="flex-1 space-y-3">
              <div className="h-3 w-16 bg-gray-800 rounded" />
              <div className="h-4 w-3/4 bg-gray-800 rounded" />
              <div className="h-3 w-1/2 bg-gray-800 rounded" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-glass-border flex justify-between">
            <div className="h-3 w-20 bg-gray-800 rounded" />
            <div className="h-8 w-8 bg-gray-800 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
