import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@lib/utils';

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { error?: boolean }
>(function Input({ className, error, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        'h-11 w-full rounded-[8px] border bg-white px-4 text-sm placeholder:text-slate-400 transition',
        !error && 'border-slate-200 focus:border-brand-500',
        error && 'border-red-500 focus:border-red-500',

        className
      )}
      {...props}
    />
  );
});