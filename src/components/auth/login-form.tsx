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
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const session = await serviceContainer.loginUser.execute(values);
      setSession(session);
      router.push('/products');
    } catch {
      setError('root', { message: 'Invalid email or password.' });
    }
  });

  return (
    <AuthShell
      title="Welcome"
      footer={
        <span>
          No account yet?{' '}
          <Link href="/register" className="font-semibold text-brand-600">
            Create one
          </Link>
        </span>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Email" required error={errors.email?.message}>
          <Input
            type="email"
            placeholder="Enter your email"
            error={!!errors.email}
            className={errors.email ? 'border-red-500 focus:ring-red-500' : ''}
            {...register('email')}
          />
        </Field>

        <Field label="Password" required error={errors.password?.message}>
          <PasswordInput
            placeholder="Enter your password"
            error={!!errors.password}
            className={errors.password ? 'border-red-500 focus:ring-red-500' : ''}
            {...register('password')}
          />
        </Field>
        {errors.root?.message ? (
          <p className="text-sm text-rose-600">{errors.root.message}</p>
        ) : null}

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Sign in
        </Button>
      </form>
    </AuthShell>
  );
}