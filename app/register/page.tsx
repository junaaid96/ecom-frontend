'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/store/authStore';

export default function RegisterPage() {
  const { register, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get('firstName')?.toString() ?? '';
    const lastName = formData.get('lastName')?.toString() ?? '';
    const email = formData.get('email')?.toString() ?? '';
    const password = formData.get('password')?.toString() ?? '';
    
    // Generate username from firstName and lastName (lowercase, remove special chars, join)
    let username = `${firstName}${lastName}`
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 50);
    
    // Fallback to email prefix if username is too short or empty
    if (!username || username.length < 3) {
      username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 50);
    }
    
    // Ensure minimum length of 3 characters
    if (username.length < 3) {
      username = username.padEnd(3, '0');
    }

    const payload = {
      username,
      email,
      password
    };

    try {
      await register(payload);
      router.push('/');
    } catch (err: any) {
      // Extract error message from API response if available
      const errorMessage = err?.response?.data?.message || 
                          err?.response?.data?.details?.join(', ') ||
                          'Registration failed. Please review your information.';
      setError(errorMessage);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-4 py-16 sm:px-6">
      <div className="rounded-[2.5rem] border border-white/60 bg-white/90 p-10 shadow-elevated">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary-500">Join the circle</p>
          <h1 className="text-3xl font-semibold text-neutral-900">Create your account</h1>
          <p className="text-sm text-neutral-500">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary-600">
              Sign in
            </Link>
            .
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-9 grid gap-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">First name</label>
              <input
                name="firstName"
                required
                className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">Last name</label>
              <input
                name="lastName"
                required
                className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">Email</label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">Password</label>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
            <p className="text-xs text-neutral-400">Minimum 8 characters. You can update your profile and preferences anytime.</p>
          </div>
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-600">{error}</div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-floating transition hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/40 disabled:cursor-progress disabled:opacity-70"
          >
            {isLoading ? 'Creating account…' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
}

