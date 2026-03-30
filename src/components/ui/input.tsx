import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/src/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          'h-11 w-full  rounded-[8px] border border-slate-200 bg-white px-4 text-sm placeholder:text-slate-400 focus:border-brand-500',
          className
        )}
        {...props}
      />
    );
  }
);
