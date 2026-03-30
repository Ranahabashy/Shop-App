import { forwardRef, SelectHTMLAttributes } from 'react';
import { cn } from '@/src/lib/utils';

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, children, ...props }, ref) {
    return (
      <select
        ref={ref}
        className={cn(
          'h-11 w-full rounded-[8px] border border-slate-200 bg-white px-4 text-sm focus:border-brand-500',
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);
