'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import useCartStore from '@/store/cartStore';
import useAuth from '@/store/authStore';

type NavLink = {
  href: string;
  label: string;
  tag?: string;
};

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/categories/all', label: 'Categories' },
  { href: '/orders', label: 'Track order' }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setScrolled] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const itemCount = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);
  const { user, hydrate, isHydrated } = useAuth();

  // Only hydrate once on mount, not on every render
  useEffect(() => {
    if (!isHydrated) {
      hydrate();
    }
  }, [hydrate, isHydrated]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const renderLinks = (orientation: 'horizontal' | 'vertical' = 'horizontal') => (
    <ul
      className={clsx(
        'list-none pl-0',
        orientation === 'horizontal' && 'flex items-center gap-3 md:gap-4',
        orientation === 'vertical' && 'flex flex-col gap-0'
      )}
    >
      {navLinks.map((link) => {
        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
        return (
          <li key={link.href} className={clsx('list-none leading-none', orientation === 'vertical' && 'w-full')}>
            <Link
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={clsx(
                'group relative inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out no-underline whitespace-nowrap',
                orientation === 'horizontal' ? 'justify-center' : 'justify-start w-full',
                isActive
                  ? 'text-primary-700 bg-primary-50/80 hover:text-primary-700'
                  : 'text-neutral-700 hover:text-primary-700 hover:bg-neutral-50 active:scale-95'
              )}
            >
              {/* Background hover effect */}
              <span
                className={clsx(
                  'absolute inset-0 rounded-lg bg-gradient-to-r from-primary-50/0 to-primary-50/0 transition-all duration-300 ease-in-out',
                  isActive
                    ? 'from-primary-100/50 to-primary-50/50'
                    : 'group-hover:from-primary-50/40 group-hover:to-primary-50/20'
                )}
              />
              
              {/* Active indicator - only for vertical */}
              {isActive && orientation === 'vertical' && (
                <span className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-primary-600" />
              )}
              
              {/* Link content */}
              <span className={clsx(
                'relative z-10 flex items-center gap-2 transition-transform duration-300',
                orientation === 'horizontal' ? 'group-hover:translate-x-0.5' : ''
              )}>
                <span>{link.label}</span>
                {link.tag && (
                  <span
                    className={clsx(
                      'relative inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300',
                      isActive
                        ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30'
                        : 'bg-primary-100 text-primary-700 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-primary-500/30 group-hover:scale-110'
                    )}
                  >
                    {link.tag}
                  </span>
                )}
              </span>
              
              {/* Bottom underline for active state - only for horizontal */}
              {isActive && orientation === 'horizontal' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full bg-primary-600 shadow-sm shadow-primary-500/50" />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 w-full border-b transition-all duration-500 ease-out',
        isScrolled 
          ? 'border-neutral-200/60 bg-white/95 backdrop-blur-xl shadow-md shadow-neutral-900/5' 
          : 'border-transparent bg-white/60 backdrop-blur-lg'
      )}
    >
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link 
          href="/" 
          className="group flex shrink-0 items-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-100"
        >
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 text-xs font-bold uppercase text-white shadow-lg shadow-primary-500/30 transition-all duration-300 group-hover:from-primary-700 group-hover:to-primary-800 group-hover:shadow-xl group-hover:shadow-primary-500/50 group-hover:rotate-3">
            <span className="relative z-10">AC</span>
            <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute inset-0 rounded-xl bg-primary-400/0 blur-xl transition-all duration-300 group-hover:bg-primary-400/30 group-hover:blur-md" />
          </span>
          <span className="hidden sm:flex flex-col leading-tight transition-colors duration-300">
            <span className="text-sm font-bold text-neutral-900 group-hover:text-primary-700 transition-colors duration-300">
              Arvix Commerce
            </span>
            <span className="text-xs text-neutral-500 group-hover:text-neutral-600 transition-colors duration-300">
              Curated marketplace
            </span>
          </span>
        </Link>

        <div className="hidden flex-1 items-center justify-center lg:flex min-w-0">
          {renderLinks('horizontal')}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="group relative inline-flex items-center gap-2.5 rounded-full border-2 border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition-all duration-300 hover:border-primary-400 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-50/80 hover:text-primary-700 hover:shadow-lg hover:shadow-primary-500/10 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-neutral-100 to-neutral-50 text-neutral-700 transition-all duration-300 group-hover:from-primary-600 group-hover:to-primary-700 group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary-500/40 group-hover:scale-110">
              <ShoppingCartIcon className="h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 px-1.5 text-[10px] font-bold text-white shadow-lg ring-2 ring-white transition-all duration-300 group-hover:scale-110 group-hover:ring-primary-200 animate-scale-in">
                  {itemCount}
                </span>
              )}
            </span>
            <span className="hidden text-xs font-bold text-neutral-600 lg:inline transition-colors duration-300 group-hover:text-primary-700">
              Bag
            </span>
          </Link>

          {user ? (
            <Link
              href={(user.role === 'ADMIN' || user.role === 'ROLE_ADMIN') ? '/admin' : '/account'}
              className="btn-primary hidden lg:inline-flex !text-white hover:!text-white"
            >
              {user.username ? `Hi, ${user.username}` : 'Account'}
            </Link>
          ) : (
            <Link
              href="/login"
              className="btn-secondary hidden lg:inline-flex"
            >
              Sign in
            </Link>
          )}

          <button
            type="button"
            className="group inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-neutral-200 bg-white text-neutral-600 transition-all duration-300 hover:border-primary-400 hover:bg-gradient-to-br hover:from-primary-50 hover:to-primary-50/80 hover:text-primary-600 hover:shadow-lg hover:shadow-primary-500/10 hover:scale-110 active:scale-100 lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Bars3Icon className="h-6 w-6 transition-all duration-300 group-hover:rotate-90" />
          </button>
        </div>

        {isMenuOpen ? (
          <div className="fixed inset-0 z-50 flex items-start justify-end bg-neutral-900/60 backdrop-blur-sm lg:hidden animate-fade-in">
            <div className="relative h-full w-full max-w-sm bg-white shadow-2xl animate-slide-in-from-right">
              {/* Header with close button */}
              <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
                <h2 className="text-lg font-bold text-neutral-900">Menu</h2>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-all duration-200 hover:bg-neutral-200 hover:text-neutral-900 active:scale-95"
                  aria-label="Close navigation menu"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="overflow-y-auto pb-6 pt-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                <nav className="px-4">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={clsx(
                          'group relative mb-2 flex items-center justify-between rounded-xl px-5 py-4 text-base font-semibold transition-all duration-200',
                          isActive
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {isActive && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full bg-primary-600" />
                          )}
                          <span className={clsx('relative z-10', isActive && 'ml-3')}>{link.label}</span>
                          {link.tag && (
                            <span
                              className={clsx(
                                'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide',
                                isActive
                                  ? 'bg-primary-600 text-white'
                                  : 'bg-primary-100 text-primary-700'
                              )}
                            >
                              {link.tag}
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </nav>

                {/* Cart and Account Section */}
                <div className="mt-6 border-t border-neutral-200 px-4 pt-6">
                  <Link
                    href="/cart"
                    onClick={() => setMenuOpen(false)}
                    className="mb-4 flex items-center justify-between rounded-xl border-2 border-neutral-200 bg-white px-5 py-4 text-base font-semibold text-neutral-700 transition-all duration-200 hover:border-primary-400 hover:bg-primary-50 active:scale-98"
                  >
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                        <ShoppingCartIcon className="h-5 w-5 text-neutral-700" />
                        {itemCount > 0 && (
                          <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white ring-2 ring-white">
                            {itemCount}
                          </span>
                        )}
                      </span>
                      <span>Shopping Bag</span>
                    </div>
                  </Link>

                  {user ? (
                    <Link
                      href={(user.role === 'ADMIN' || user.role === 'ROLE_ADMIN') ? '/admin' : '/account'}
                      onClick={() => setMenuOpen(false)}
                      className="flex w-full items-center justify-center rounded-xl bg-primary-600 px-5 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-primary-700 active:scale-98"
                    >
                      {user.username ? `Hi, ${user.username}` : 'Account'}
                    </Link>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        href="/login"
                        onClick={() => setMenuOpen(false)}
                        className="flex w-full items-center justify-center rounded-xl border-2 border-primary-600 bg-white px-5 py-4 text-base font-bold text-primary-600 transition-all duration-200 hover:bg-primary-50 active:scale-98"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setMenuOpen(false)}
                        className="flex w-full items-center justify-center rounded-xl bg-primary-600 px-5 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-primary-700 active:scale-98"
                      >
                        Create Account
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}

