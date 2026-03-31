'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  total: number;
  limit: number;
  currentPage: number;
};

export function Pagination({
  total,
  limit,
  currentPage,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`/products?${params.toString()}`);
  };

  const getPages = (): Array<number | '...'> => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', currentPage, '...', totalPages];
  };

  const pages = getPages();

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex justify-center px-4">
      <nav className="flex max-w-full items-center overflow-x-auto rounded-[8px] border border-slate-200 bg-white shadow-sm">
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex h-10 shrink-0 items-center gap-1 border-r border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:gap-2 sm:px-5 sm:text-base"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex h-10 min-w-10 shrink-0 items-center justify-center px-2 text-sm text-slate-500 sm:h-14 sm:min-w-14 sm:px-4 sm:text-lg"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              type="button"
              onClick={() => goToPage(page)}
              className={`flex h-10 min-w-10 shrink-0 items-center justify-center border-r border-slate-200 px-3 text-sm font-medium transition last:border-r-0 sm:h-14 sm:min-w-14 sm:px-4 sm:text-lg ${currentPage === page
                ? 'bg-white text-blue-600 border border-blue-600 font-semibold'
                : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                }`}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex h-10 shrink-0 items-center gap-1 border-l border-slate-200 px-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:gap-2 sm:px-5 sm:text-base"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </nav>
    </div>
  );
}