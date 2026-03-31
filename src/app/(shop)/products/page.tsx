import { serviceContainer } from '@services/container';
import { FilterBar } from '@/components/products/reset';
import { Pagination } from '@components/products/pagination';
import { ProductCard } from '@components/products/product-card';
import { EmptyState } from '@components/ui/empty-state';
import { PAGE_SIZE } from '@lib/constants';
import { CategoriesSidebar } from './categories-sidebar';
import { MobileFiltersBar } from './mobile-filters-bar';

export default async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<{ search?: string; category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page ?? '1'));
  const skip = (currentPage - 1) * PAGE_SIZE;

  const [categories, productsResponse] = await Promise.all([
    serviceContainer.getCategories.execute(),
    serviceContainer.getProducts.execute({
      search: params.search,
      category: params.category,
      limit: PAGE_SIZE,
      skip
    })
  ]);

  return (
    <main className="container-page space-y-8 py-8">
      <section className="space-y-3">
        <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-700">
          Deals & Offers
        </span>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need, all in one place
        </h1>

        <p className="max-w-2xl text-sm text-slate-500 sm:text-base">
          Explore top categories, find great prices, and enjoy a smooth shopping experience like your favorite online stores.
        </p>
      </section>
      <MobileFiltersBar categories={categories} />

      <div className="grid gap-6 md:grid-cols-4">
        <div className="hidden md:block md:col-span-1">
          <CategoriesSidebar categories={categories} />
        </div>

        <div className="space-y-6 md:col-span-3">

          {productsResponse.products.length === 0 ? (
            <EmptyState
              title="No products found"
              description="Try a different search term or remove category filters to see more items."
            />
          ) : (
            <>
              <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {productsResponse.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </section>

              <Pagination
                total={productsResponse.total}
                limit={productsResponse.limit}
                currentPage={currentPage}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}