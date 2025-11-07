'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import useAuth from '@/store/authStore';
import useCartStore from '@/store/cartStore';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/products', label: 'Products', icon: '📦' },
  { href: '/admin/categories', label: 'Categories', icon: '🏷️' },
  { href: '/admin/orders', label: 'Orders', icon: '🛒' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const clearCart = useCartStore((state) => state.clearCart);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  return (
    <aside className="flex w-64 flex-col border-r border-slate-200 bg-white p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900">Admin Panel</h2>
        <p className="mt-1 text-sm text-slate-500">E-commerce Management</p>
      </div>
      
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2 border-t border-slate-200 pt-6">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <span className="text-lg">🏠</span>
          <span>Back to Store</span>
        </Link>
        
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 rounded-lg border border-red-200 bg-white px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    </aside>
  );
}

