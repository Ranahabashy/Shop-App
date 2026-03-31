'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { RiResetLeftFill } from 'react-icons/ri';
import { Button } from '@components/ui/button';
import { Select } from '@components/ui/select';

type MobileFiltersBarProps = {
    categories: string[];
};

export function MobileFiltersBar({ categories }: MobileFiltersBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedCategory = searchParams.get('category') ?? 'all';

    const handleCategoryChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === 'all') {
            params.delete('category');
        } else {
            params.set('category', value);
        }

        params.delete('page');
        router.push(`/products?${params.toString()}`);
    };

    const handleReset = () => {
        router.push('/products');
    };

    return (
        <div className="flex items-center gap-2 md:hidden">
            <div className="flex-1">
                <Select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="h-10 w-full rounded-[8px] border border-slate-200 px-3 text-sm"
                >
                    <option value="all">All categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </Select>
            </div>

            <Button
                variant="secondary"
                onClick={handleReset}
                className="flex items-center gap-2 px-3 py-2"
            >
                <RiResetLeftFill className="h-4 w-4" />
                <span className="text-sm">Reset</span>
            </Button>
        </div>
    );
}