import { ProductCardSkeleton } from '@/src/components/ui/product-card-skeleton';

export default function LoadingProductsPage() {
  return (
    <main className="container-page space-y-8 py-8">
      <div className="space-y-3">
        <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
        <div className="h-10 w-96 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-slate-200" />
      </div>
      <div className="card-surface h-20 animate-pulse" />
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </section>
    </main>
  );
}
