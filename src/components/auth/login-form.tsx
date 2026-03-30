'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '@/src/components/ui/field';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { AuthShell } from '@/src/components/auth/auth-shell';
import { serviceContainer } from '@/src/application/services/container';
import { useAuthStore } from '@/src/lib/auth-store';
import { PasswordInput } from './passwordInput';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password is required')
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
      description="Sign in to continue to your account."
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
        <Field label="Email" error={errors.email?.message}>
          <Input
            type="email"
            placeholder="Enter your email"
            {...register('email')}
          />
        </Field>

        <Field label="Password" error={errors.password?.message}>
          <PasswordInput
            placeholder="Enter your password"
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