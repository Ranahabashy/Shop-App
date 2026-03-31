'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@components/ui/input';

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export function PasswordInput({ error, className, ...props }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={show ? 'text' : 'password'}
        error={error} 
        className={`pr-10 ${className ?? ''}`}
      />

      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className={`absolute right-3 top-1/2 -translate-y-1/2 transition ${error ? 'text-red-500' : 'text-slate-500 hover:text-slate-700'
          }`}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}