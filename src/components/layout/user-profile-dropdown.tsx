'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, CircleUserRound, LogOut } from 'lucide-react';
import type { User } from '@/src/domain/entities/auth';

type UserProfileDropdownProps = {
    user?: User | null;
    onLogout: () => void;
};

export function UserProfileDropdown({
    user,
    onLogout,
}: UserProfileDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!dropdownRef.current) return;

            if (!dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fullName =
        [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'User';

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left shadow-sm transition hover:bg-slate-50"
            >
                <div className="flex h-7 w-7 items-center justify-center rounded-full  text-slate-700 ">
                    <CircleUserRound className="h-5 w-5" />
                </div>

                <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-slate-800">
                        {`${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || 'User'}
                    </p>
                </div>

                <ChevronDown
                    className={`h-4 w-4 text-slate-500 transition ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>

            {isOpen ? (
                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                    <div className="border-b border-slate-100 px-4 py-3">
                        <p className="text-sm font-semibold text-slate-800">{fullName}</p>
                        <p className="text-xs text-slate-500">{user?.email}</p>
                    </div>

                    <div className="p-2">
                        {/* <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                        >
                            <CircleUserRound className="h-4 w-4 text-slate-500" />
                            User Profile
                        </Link> */}

                        <button
                            type="button"
                            onClick={onLogout}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                        >
                            <LogOut className="h-4 w-4" />
                            Log out
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}