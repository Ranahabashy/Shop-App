'use client';

import { ReactNode } from 'react';

type FieldProps = {
  label: string;
  error?: string;
  required?: boolean; 
  children: ReactNode;
};

export function Field({ label, error, required, children }: FieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>} 
      </span>

      {children}

      {error ? (
        <span className="text-xs text-red-500">{error}</span>
      ) : null}
    </label>
  );
}