'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '@components/ui/field';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { AuthShell } from '@components/auth/auth-shell';
import { serviceContainer } from '@services/container';
import { useAuthStore } from '@lib/auth-store';
import { PasswordInput } from './passwordInput';

const schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

type FormValues = z.infer<typeof schema>;

export function RegisterForm() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const session = await serviceContainer.registerUser.execute(values);
      setSession(session);
      router.push('/products');
    } catch {
      setError('root', { message: 'This email already exists.' });
    }
  });

  return (
    <AuthShell
      title="Create account"
      footer={
        <span>
          Already registered?{' '}
          <Link href="/login" className="font-semibold text-brand-600">
            Sign in
          </Link>
        </span>
      }
    >
      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" required error={errors.firstName?.message}>
          <Input
            type="text"
            placeholder="Enter your first name"
            error={!!errors.firstName}
            {...register('firstName')}
          />
        </Field>
        <Field label="Last name" required error={errors.lastName?.message}>
          <Input
            type="text"
            placeholder="Enter your last name"
            error={!!errors.lastName}
            {...register('lastName')}
          />
        </Field>
        <Field label="Email" required error={errors.email?.message}>
          <Input
            type="email"
            placeholder="name@example.com"
            error={!!errors.email}
            {...register('email')}
          />
        </Field>

        <Field label="Password" required error={errors.password?.message}>
          <PasswordInput
            placeholder="Enter your password"
            error={!!errors.password}
            {...register('password')}
          />
        </Field>
        {errors.root?.message ? <p className="text-sm text-rose-600 sm:col-span-2">{errors.root.message}</p> : null}
        <div className="sm:col-span-2">
          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Create account
          </Button>
        </div>
      </form>
    </AuthShell>
  );
}
