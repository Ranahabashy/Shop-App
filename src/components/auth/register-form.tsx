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

const schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Enter a valid email'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
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
      setError('root', { message: 'This username or email already exists.' });
    }
  });

  return (
    <AuthShell
      title="Create account"
      description="This uses a mock registration endpoint so you can fully demonstrate the task flow."
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
        <Field label="First name" error={errors.firstName?.message}>
          <Input placeholder="Rana" {...register('firstName')} />
        </Field>
        <Field label="Last name" error={errors.lastName?.message}>
          <Input placeholder="Elhabashy" {...register('lastName')} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Email" error={errors.email?.message}>
            <Input type="email" placeholder="name@example.com" {...register('email')} />
          </Field>
        </div>
        <Field label="Username" error={errors.username?.message}>
          <Input placeholder="rana" {...register('username')} />
        </Field>
        <Field label="Password" error={errors.password?.message}>
          <Input type="password" placeholder="********" {...register('password')} />
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
