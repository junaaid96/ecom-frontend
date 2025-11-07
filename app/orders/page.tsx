'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuth from '@/store/authStore';
import { apiClient } from '@/lib/api';
import { Order } from '@/types';

export default function OrdersPage() {
  const router = useRouter();
  const { user, isHydrated, hydrate } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isHydrated) {
      hydrate();
    }
  }, [isHydrated, hydrate]);

  useEffect(() => {
    if (isHydrated && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchOrders();
    }
  }, [user, isHydrated, router]);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await apiClient.get<Order[]>('/orders/me');
      setOrders(data);
    } catch (err) {
      setError('Failed to load orders. Please try again.');
      console.error('Error fetching orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isHydrated || !user) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent"></div>
          <p className="mt-4 text-sm text-neutral-500">Loading...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800';
      case 'SHIPPED':
        return 'bg-primary-100 text-primary-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary-500">Order history</p>
          <h1 className="text-3xl font-semibold text-neutral-900 sm:text-[2.4rem] sm:leading-tight">Track your orders</h1>
          <p className="text-sm text-neutral-500">View and track all your past and current orders.</p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-neutral-600 shadow-sm transition hover:text-primary-600"
        >
          Continue shopping
        </Link>
      </div>

      {isLoading ? (
        <div className="mt-12 flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent"></div>
            <p className="mt-4 text-sm text-neutral-500">Loading orders...</p>
          </div>
        </div>
      ) : error ? (
        <div className="mt-12 rounded-2xl border border-red-200 bg-red-50/80 p-8 text-center">
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={fetchOrders}
            className="mt-4 rounded-full bg-primary-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary-600"
          >
            Try again
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="mt-12 rounded-[2.5rem] border border-dashed border-primary-200 bg-primary-50/60 p-16 text-center shadow-inner">
          <h2 className="text-xl font-semibold text-primary-600">No orders yet</h2>
          <p className="mt-2 text-sm text-primary-500">You haven&apos;t placed any orders yet.</p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-floating transition hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/40"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="mt-12 space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="rounded-[2.5rem] border border-white/60 bg-white/90 p-8 shadow-elevated">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900">Order #{order.id}</h3>
                      <p className="mt-1 text-sm text-neutral-500">Placed on {formatDate(order.placedAt || order.createdAt || '')}</p>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm text-neutral-600">
                        <span>Total</span>
                        <span className="font-semibold text-neutral-900">
                          Tk{typeof order.total === 'number' ? order.total.toFixed(2) : parseFloat(String(order.total)).toFixed(2)}
                        </span>
                      </div>
                      {order.items && order.items.length > 0 && (
                        <div className="mt-4 border-t border-neutral-200 pt-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400 mb-3">Items</p>
                          <ul className="space-y-2">
                            {order.items.map((item) => (
                              <li key={item.id} className="flex items-center justify-between text-sm">
                                <span className="text-neutral-600">
                                  {item.productName} × {item.quantity}
                                </span>
                                <span className="font-semibold text-neutral-900">
                                  Tk{typeof item.unitPrice === 'number' ? item.unitPrice.toFixed(2) : parseFloat(String(item.unitPrice)).toFixed(2)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {order.shippingAddress && (
                        <div className="mt-4 border-t border-neutral-200 pt-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400 mb-2">Shipping Address</p>
                          <p className="text-sm text-neutral-600 whitespace-pre-line">{order.shippingAddress}</p>
                        </div>
                      )}
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

