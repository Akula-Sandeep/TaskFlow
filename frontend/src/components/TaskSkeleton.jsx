export default function TaskSkeleton() {
  return (
    <div className="card h-[320px] space-y-4 p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="skeleton h-5 w-2/3" />
        <div className="flex gap-2">
          <div className="skeleton h-6 w-14" />
          <div className="skeleton h-6 w-16" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-4/5" />
      </div>
      <div className="flex gap-4">
        <div className="skeleton h-3 w-24" />
        <div className="skeleton h-3 w-24" />
      </div>
      <div className="flex gap-2 border-t border-border pt-4">
        <div className="skeleton h-9 w-16" />
        <div className="skeleton h-9 w-28" />
        <div className="skeleton h-9 w-16" />
      </div>
    </div>
  );
}

export function TaskSkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <TaskSkeleton key={i} />
      ))}
    </div>
  );
}
