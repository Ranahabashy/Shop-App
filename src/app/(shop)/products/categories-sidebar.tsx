'use client';

import { FilterBar } from '@/components/products/reset';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
    categories: string[];
};

export function CategoriesSidebar({ categories }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedCategory = searchParams.get('category');

    const handleChange = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (selectedCategory === category) {
            params.delete('category'); 
        } else {
            params.set('category', category);
        }

        params.delete('page');

        router.push(`/products?${params.toString()}`);
    };

    return (
        <aside className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm">
            <div className='flex justify-between items-center '>
                <h3 className="mb-4 text-sm font-semibold text-slate-900">
                    Categories
                </h3>
                <FilterBar categories={categories} />
            </div>

            <div className="space-y-3">
                {categories.map((category) => {
                    const checked = selectedCategory === category;

                    return (
                        <label
                            key={category}
                            className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                        >
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => handleChange(category)}
                                className="h-4 w-4 rounded border-slate-300 accent-blue-500"
                            />

                            <span className={checked ? 'font-medium text-blue-600' : ''}>
                                {category}
                            </span>
                        </label>
                    );
                })}
            </div>
        </aside>
    );
}