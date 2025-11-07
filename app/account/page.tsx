'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  EnvelopeIcon, 
  UserCircleIcon, 
  ShoppingBagIcon, 
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import useAuth from '@/store/authStore';
import useCartStore from '@/store/cartStore';

export default function AccountPage() {
  const router = useRouter();
  const { user, isHydrated, hydrate, logout } = useAuth();
  const clearCart = useCartStore((state) => state.clearCart);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!isHydrated) {
      hydrate();
    }
  }, [isHydrated, hydrate]);

  useEffect(() => {
    if (isHydrated && !user) {
      router.push('/login');
    }
  }, [user, isHydrated, router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      clearCart();
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!isHydrated || !user) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent"></div>
          <p className="mt-4 text-sm text-neutral-500">Loading account...</p>
        </div>
      </div>
    );
  }

  const displayName = user.username || user.email.split('@')[0];
  const roleDisplay = user.role?.replace('ROLE_', '').toLowerCase() || 'customer';
  const isActive = user.active !== false;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-14">
      {/* Header Section */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary-500">Your account</p>
        <h1 className="mt-2 text-3xl font-semibold text-neutral-900 sm:text-4xl">
          Welcome back, {displayName}
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Manage your account settings and view your order history.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Information Card */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                <UserCircleIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">Profile Information</h2>
                <p className="text-sm text-neutral-500">Your personal account details</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Username */}
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Username
                </label>
                <p className="text-base font-medium text-neutral-900">
                  {user.username || 'Not set'}
                </p>
              </div>

              {/* Email */}
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4">
                <label className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  <EnvelopeIcon className="h-3.5 w-3.5" />
                  Email Address
                </label>
                <p className="mt-1 text-base font-medium text-neutral-900">{user.email}</p>
              </div>

              {/* Account Status */}
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4">
                <label className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  <ShieldCheckIcon className="h-3.5 w-3.5" />
                  Account Status
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <CheckCircleIcon 
                    className={`h-5 w-5 ${isActive ? 'text-green-500' : 'text-neutral-400'}`} 
                  />
                  <p className="text-base font-medium text-neutral-900">
                    {isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Account Type
                </label>
                <div className="mt-1">
                  <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-700 capitalize">
                    {roleDisplay}
                  </span>
                </div>
              </div>

              {/* User ID */}
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  User ID
                </label>
                <p className="text-sm font-mono text-neutral-600">#{user.id}</p>
              </div>
            </div>
          </section>

          {/* Quick Actions Card */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-neutral-900">Quick Actions</h2>
              <p className="mt-1 text-sm text-neutral-500">Navigate to key sections</p>
            </div>

            <div className="space-y-3">
              <Link
                href="/orders"
                className="group flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-white px-5 py-4 text-sm font-semibold text-neutral-700 transition-all hover:border-primary-400 hover:bg-primary-50 hover:text-primary-600 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBagIcon className="h-5 w-5 text-neutral-400 transition-colors group-hover:text-primary-600" />
                  <span>View Orders</span>
                </div>
                <span className="text-neutral-400 transition-transform group-hover:translate-x-1">→</span>
              </Link>
              
              <Link
                href="/products"
                className="group flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-white px-5 py-4 text-sm font-semibold text-neutral-700 transition-all hover:border-primary-400 hover:bg-primary-50 hover:text-primary-600 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-neutral-400 transition-colors group-hover:text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>Continue Shopping</span>
                </div>
                <span className="text-neutral-400 transition-transform group-hover:translate-x-1">→</span>
              </Link>

              {(user.role === 'ADMIN' || user.role === 'ROLE_ADMIN') && (
                <Link
                  href="/admin"
                  className="group flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-white px-5 py-4 text-sm font-semibold text-neutral-700 transition-all hover:border-primary-400 hover:bg-primary-50 hover:text-primary-600 hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheckIcon className="h-5 w-5 text-neutral-400 transition-colors group-hover:text-primary-600" />
                    <span>Admin Dashboard</span>
                  </div>
                  <span className="text-neutral-400 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar - Logout & Account Actions */}
        <div className="space-y-6">
          {/* Logout Card */}
          <section className="rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-orange-50 p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-neutral-900">Account Actions</h2>
              <p className="mt-1 text-sm text-neutral-500">Manage your session</p>
            </div>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="group flex w-full items-center justify-between rounded-xl border-2 border-red-300 bg-white px-5 py-4 text-sm font-semibold text-red-600 transition-all hover:border-red-400 hover:bg-red-50 hover:text-red-700 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-red-300 disabled:hover:bg-white"
            >
              <div className="flex items-center gap-3">
                <ArrowRightOnRectangleIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
              </div>
              <span className="text-red-400 transition-transform group-hover:translate-x-1">→</span>
            </button>

            <p className="mt-4 text-xs text-neutral-500">
              You'll need to sign in again to access your account.
            </p>
          </section>

          {/* Account Security Note */}
          <section className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <h3 className="text-sm font-semibold text-neutral-900">Security</h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-600">
              Your account information is secure and encrypted. For security reasons, please log out when using shared devices.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

