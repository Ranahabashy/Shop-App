import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/src/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, children, variant = 'primary', isLoading, disabled, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center rounded-[8px] px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'primary' && 'bg-brand-500 text-white hover:bg-brand-600',
        variant === 'secondary' && 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50',
        variant === 'ghost' && 'text-slate-700 hover:bg-slate-100',
        className
      )}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
});
