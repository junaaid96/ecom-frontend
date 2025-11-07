'use client';

import Link from 'next/link';
import { FormEvent, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useAuth from '@/store/authStore';

export default function LoginForm() {
  const { login, isLoading, user, hydrate } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check if user is already logged in
  useEffect(() => {
    hydrate().then(() => {
      const currentUser = useAuth.getState().user;
      if (currentUser) {
        const redirectTo = searchParams.get('redirect') ?? '/';
        const isAdmin = currentUser.role === 'ADMIN' || currentUser.role === 'ROLE_ADMIN';
        
        // Determine redirect destination
        let destination = redirectTo;
        
        // If trying to access admin but user is not admin, redirect to home
        if ((redirectTo === '/admin' || redirectTo.startsWith('/admin')) && !isAdmin) {
          destination = '/';
        } else if (isAdmin && (redirectTo === '/admin' || redirectTo.startsWith('/admin'))) {
          // User is admin and wants to access admin, allow it
          destination = '/admin';
        } else if (isAdmin && redirectTo === '/') {
          // Admin logged in from home page, redirect to admin dashboard
          destination = '/admin';
        }
        
        router.push(destination);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email')?.toString() ?? '';
    const password = formData.get('password')?.toString() ?? '';
    setError(null);
    try {
      await login(email, password);
      
      // Get updated user state after login
      const updatedUser = useAuth.getState().user;
      const redirectTo = searchParams.get('redirect') ?? '/';
      const isAdmin = updatedUser?.role === 'ADMIN' || updatedUser?.role === 'ROLE_ADMIN';
      
      // Determine redirect destination
      let destination = redirectTo;
      
      // If trying to access admin but user is not admin, redirect to home
      if ((redirectTo === '/admin' || redirectTo.startsWith('/admin')) && !isAdmin) {
        destination = '/';
      } else if (isAdmin && (redirectTo === '/admin' || redirectTo.startsWith('/admin'))) {
        // User is admin and wants to access admin, allow it
        destination = '/admin';
      } else if (isAdmin && redirectTo === '/') {
        // Admin logged in from home page, redirect to admin dashboard
        destination = '/admin';
      }
      
      // Use window.location for full page reload to ensure server-side checks work
      window.location.href = destination;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || 'Invalid credentials. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-4 py-16 sm:px-6">
      <div className="rounded-[2.5rem] border border-white/60 bg-white/90 p-10 shadow-elevated">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary-500">Welcome back</p>
          <h1 className="text-3xl font-semibold text-neutral-900">Sign in to Arvix Commerce</h1>
          <p className="text-sm text-neutral-500">
            New to Arvix Commerce?{' '}
            <Link href="/register" className="font-semibold text-primary-600">
              Create an account
            </Link>
            .
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
              autoComplete="current-password"
              required
              className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
            <div className="text-right text-xs">
              <a href="mailto:support@arvixcommerce.com" className="font-semibold text-primary-500">
                Forgot password?
              </a>
            </div>
          </div>
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-600">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-floating transition hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/40 disabled:cursor-progress disabled:opacity-70"
          >
            {isLoading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}

