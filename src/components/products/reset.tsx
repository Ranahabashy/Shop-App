'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { Select } from '@components/ui/select';
import { RiResetLeftFill } from 'react-icons/ri';

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
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        onClick={handleReset}
        disabled={isPending}
        className="flex items-center gap-2 px-3 py-2"
      >
        <RiResetLeftFill className="h-4 w-4" />
        <span className="text-sm">Reset</span>
      </Button>
    </div>
  );
}