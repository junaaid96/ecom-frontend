'use client';

import { FormEvent, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import useCartStore from '@/store/cartStore';
import useAuth from '@/store/authStore';
import { apiClient } from '@/lib/api';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const { user, isHydrated, hydrate } = useAuth();
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isHydrated) {
      hydrate();
    }
  }, [isHydrated, hydrate]);

  // Populate form fields when user data is available
  useEffect(() => {
    if (user && formRef.current) {
      const form = formRef.current;
      const fullNameInput = form.querySelector<HTMLInputElement>('input[name="fullName"]');
      if (fullNameInput && user.username && !fullNameInput.value) {
        fullNameInput.value = user.username;
      }
    }
  }, [user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!items.length) return;
    setSubmitting(true);
    setError(null);
    const formData = new FormData(event.currentTarget);
    
    // Format shipping address as a string (backend expects a string)
    const addressParts = [
      formData.get('fullName'),
      formData.get('addressLine1'),
      formData.get('addressLine2'),
      `${formData.get('city')}, ${formData.get('state')} ${formData.get('postalCode')}`,
      formData.get('country')
    ].filter(Boolean);
    
    const shippingAddress = addressParts.join('\n');
    
    try {
      await apiClient.post('/orders', {
        shippingAddress: shippingAddress,
        items: items.map(({ product, quantity }) => ({ productId: product.id, quantity }))
      });
      clearCart();
      router.push('/orders/confirmation');
    } catch (err) {
      setError('Checkout failed. Please verify your details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary-500">Secure checkout</p>
          <h1 className="text-3xl font-semibold text-neutral-900 sm:text-[2.4rem] sm:leading-tight">Finalize your order</h1>
          <p className="text-sm text-neutral-500">Enter your details below and we&apos;ll handle the rest with white-glove care.</p>
        </div>
        {items.length > 0 && (
          <span className="inline-flex items-center rounded-full border border-white/60 bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500 shadow-sm">
            {items.length} items
          </span>
        )}
      </div>
      {!items.length ? (
        <div className="mt-12 rounded-[2.5rem] border border-dashed border-primary-200 bg-primary-50/60 p-16 text-center shadow-inner">
          <h2 className="text-xl font-semibold text-primary-600">Your cart is empty.</h2>
          <p className="mt-2 text-sm text-primary-500">Add products to your bag before heading to checkout.</p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 grid gap-10 lg:grid-cols-[1.7fr,1fr]">
          <div className="space-y-8">
            <section className="rounded-[2.5rem] border border-white/60 bg-white/90 p-8 shadow-elevated">
              <h2 className="text-lg font-semibold text-neutral-900">Shipping information</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">Full name</label>
                  <input
                    name="fullName"
                    required
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">Address line 1</label>
                  <input
                    name="addressLine1"
                    required
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">Address line 2</label>
                  <input
                    name="addressLine2"
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">City</label>
                  <input
                    name="city"
                    required
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">State</label>
                  <input
                    name="state"
                    required
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">Postal code</label>
                  <input
                    name="postalCode"
                    required
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">Country</label>
                  <input
                    name="country"
                    required
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-[2.5rem] border border-white/60 bg-white/90 p-8 shadow-elevated">
              <h2 className="text-lg font-semibold text-neutral-900">Payment</h2>
              <p className="mt-4 text-sm text-neutral-500">
                Secure payment integration is coming soon. For now, submitting this form will place your order with our concierge team.
              </p>
              <div className="mt-6 rounded-2xl bg-neutral-100/80 p-4 text-xs text-neutral-500">
                We&apos;ll send a confirmation email with secure payment instructions once your order is packed.
              </div>
            </section>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-600">{error}</div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-floating transition hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/40 disabled:cursor-progress disabled:opacity-70"
            >
              {isSubmitting ? 'Processing…' : `Place order (Tk${subtotal.toFixed(2)})`}
            </button>
          </div>

          <aside className="h-fit rounded-[2.5rem] border border-white/60 bg-white/90 p-8 shadow-elevated">
            <h2 className="text-lg font-semibold text-neutral-900">Order summary</h2>
            <ul className="mt-6 space-y-3 text-sm text-neutral-500">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex justify-between">
                  <span>
                    {product.name} × {quantity}
                  </span>
                  <span className="font-semibold text-neutral-900">Tk{(product.price * quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-3 text-sm text-neutral-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900">Tk{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>
              <div className="flex justify-between">
                <span>Carbon offset</span>
                <span className="text-primary-500">Included</span>
              </div>
            </div>
            <div className="mt-6 border-t border-neutral-200 pt-4">
              <div className="flex justify-between text-base font-semibold text-neutral-900">
                <span>Total</span>
                <span>Tk{subtotal.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </form>
      )}
    </div>
  );
}

