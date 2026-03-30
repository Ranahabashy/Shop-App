'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { Select } from '@/src/components/ui/select';

type FilterBarProps = {
  categories: string[];
};

export function FilterBar({ categories }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get('search') ?? '';
  const currentCategory = searchParams.get('category') ?? 'all';

  const [searchValue, setSearchValue] = useState(currentSearch);
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [isPending, startTransition] = useTransition();

  const loadingToastId = useRef<string | null>(null);
  const lastAction = useRef<'search' | 'filter' | 'reset' | null>(null);

  useEffect(() => {
    setSearchValue(currentSearch);
    setSelectedCategory(currentCategory);
  }, [currentSearch, currentCategory]);

  useEffect(() => {
    if (isPending) {
      if (!loadingToastId.current) {
        loadingToastId.current = toast.loading('Loading products...');
      }
      return;
    }

    if (loadingToastId.current) {
      toast.dismiss(loadingToastId.current);
      loadingToastId.current = null;

      if (lastAction.current === 'search') {
        toast.success('Search completed successfully');
      }

      if (lastAction.current === 'filter') {
        toast.success('Category filter applied successfully');
      }

      if (lastAction.current === 'reset') {
        toast.success('Filters have been reset successfully');
      }

      lastAction.current = null;
    }
  }, [isPending]);

  const pushFilters = ({
    search,
    category,
    action,
  }: {
    search?: string;
    category?: string;
    action: 'search' | 'filter' | 'reset';
  }) => {
    try {
      const params = new URLSearchParams(searchParams.toString());

      const trimmedSearch = (search ?? searchValue).trim();
      const nextCategory = category ?? selectedCategory;

      if (trimmedSearch) {
        if (trimmedSearch.length < 3) {
          toast.error('Please enter at least 3 letters to search');
          return;
        }
        params.set('search', trimmedSearch);
      } else {
        params.delete('search');
      }

      if (nextCategory && nextCategory !== 'all') {
        params.set('category', nextCategory);
      } else {
        params.delete('category');
      }

      params.delete('page');

      const queryString = params.toString();
      lastAction.current = action;

      startTransition(() => {
        router.push(queryString ? `/products?${queryString}` : '/products');
      });
    } catch {
      toast.error('Something went wrong while filtering products');
    }
  };

  const handleSearch = () => {
    pushFilters({
      search: searchValue,
      category: selectedCategory,
      action: searchValue.trim() ? 'search' : 'filter',
    });
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);

    pushFilters({
      search: searchValue,
      category: value,
      action: 'filter',
    });
  };

  const handleReset = () => {
    setSearchValue('');
    setSelectedCategory('all');

    pushFilters({
      search: '',
      category: 'all',
      action: 'reset',
    });
  };

  return (
    <div className="card-surface grid gap-4 p-4 lg:grid-cols-[1fr_220px_auto]">
      <div className="relative">
        <Input
          value={searchValue}
          className="pr-14"
          placeholder="Search by product title"
          onChange={(event) => setSearchValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSearch();
            }
          }}
        />

        <button
          type="button"
          onClick={handleSearch}
          disabled={isPending}
          aria-label="Search products"
          className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-md bg-blue-500 p-2 text-white transition hover:bg-blue-600 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      <Select
        value={selectedCategory}
        onChange={(event) => handleCategoryChange(event.target.value)}
        disabled={isPending}
      >
        <option value="all">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>

      <Button variant="secondary" onClick={handleReset} disabled={isPending}>
        Reset filters
      </Button>
    </div>
  );
}