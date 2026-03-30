'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/src/components/ui/button';

export function Pagination({ total, limit, currentPage }: { total: number; limit: number; currentPage: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="mt-6 flex items-center justify-between gap-3 p-4">
      <p className="text-sm text-slate-500">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex gap-2">
        <Button variant="secondary" disabled={currentPage <= 1} onClick={() => goToPage(currentPage - 1)}>
          Previous
        </Button>
        <Button variant="primary" disabled={currentPage >= totalPages} onClick={() => goToPage(currentPage + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
