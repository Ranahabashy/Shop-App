'use client';

import { Suspense, useEffect, useRef, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from '@components/ui/input';
import { createPortal } from 'react-dom';

function HeaderSearchInner() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentSearch = searchParams.get('search') ?? '';
    const currentCategory = searchParams.get('category') ?? '';

    const [searchValue, setSearchValue] = useState(currentSearch);
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const loadingToastId = useRef<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const isProductsPage =
        pathname === '/products' || pathname.startsWith('/products/');

    useEffect(() => {
        setSearchValue(currentSearch);
    }, [currentSearch]);

    useEffect(() => {
        if (!isOpen) return;

        const timer = setTimeout(() => {
            inputRef.current?.focus();
        }, 100);

        return () => clearTimeout(timer);
    }, [isOpen]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        if (isPending) {
            if (!loadingToastId.current) {
                loadingToastId.current = toast.loading('Searching products...');
            }
            return;
        }

        if (loadingToastId.current) {
            toast.dismiss(loadingToastId.current);
            loadingToastId.current = null;
            toast.success('Search completed successfully');
        }
    }, [isPending]);

    const handleSearch = () => {
        const trimmed = searchValue.trim();

        if (trimmed && trimmed.length < 3) {
            toast.error('Please enter at least 3 letters to search');
            return;
        }

        const params = new URLSearchParams(searchParams.toString());

        if (trimmed) {
            params.set('search', trimmed);
        } else {
            params.delete('search');
        }

        if (currentCategory) {
            params.set('category', currentCategory);
        } else {
            params.delete('category');
        }

        params.delete('page');

        const queryString = params.toString();

        startTransition(() => {
            router.push(queryString ? `/products?${queryString}` : '/products');
        });

        setIsOpen(false);
    };

    if (!isProductsPage) return null;

    return (
        <>
            <div className="hidden flex-1 md:block">
                <div className="relative w-full">
                    <Input
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                        placeholder="Search products..."
                        className="w-full pr-12"
                    />

                    <button
                        type="button"
                        onClick={handleSearch}
                        disabled={isPending}
                        aria-label="Search products"
                        className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-[8px] bg-blue-500 p-2 text-white transition hover:bg-blue-600 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        <Search className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open search"
                className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 md:hidden"
            >
                <Search className="h-5 w-5" />
            </button>

            {isOpen &&
                createPortal(
                    <div className="fixed inset-0 z-[9999] md:hidden">
                        <div
                            className="absolute inset-0 bg-slate-900/70"
                            onClick={() => setIsOpen(false)}
                        />

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close search"
                            className="absolute right-4 top-4 z-[10001] flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="absolute inset-0 z-[10000] flex items-center justify-center px-4">
                            <div className="relative mx-auto w-full max-w-md">
                                <Input
                                    ref={inputRef}
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSearch();
                                    }}
                                    placeholder="Search products..."
                                    className="h-12 rounded-[12px] border border-white/20 bg-white pr-12 shadow-xl"
                                />

                                <button
                                    type="button"
                                    onClick={handleSearch}
                                    className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-[8px] bg-blue-500 p-2 text-white hover:bg-blue-600"
                                >
                                    <Search className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}

export function HeaderSearch() {
    return (
        <Suspense fallback={null}>
            <HeaderSearchInner />
        </Suspense>
    );
}