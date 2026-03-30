export function ProductCardSkeleton() {
  return (
    <div className="card-surface overflow-hidden">
      <div className="h-56 animate-pulse bg-slate-200" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}
