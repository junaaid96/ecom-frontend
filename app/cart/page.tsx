'use client';

import Link from 'next/link';
import Image from 'next/image';
import useCartStore from '@/store/cartStore';

export default function CartPage() {
  const { items, subtotal, removeFromCart, updateQuantity, clearCart } = useCartStore();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary-500">Your selection</p>
          <h1 className="text-3xl font-semibold text-neutral-900 sm:text-[2.4rem] sm:leading-tight">Shopping bag</h1>
          <p className="mt-2 text-sm text-neutral-500">Thoughtfully curated pieces ready to elevate your space.</p>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-red-500 transition hover:text-red-600"
          >
            Clear bag
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-12 rounded-[2.5rem] border border-dashed border-primary-200 bg-primary-50/60 p-16 text-center shadow-inner">
          <h2 className="text-xl font-semibold text-primary-600">Your bag is currently empty.</h2>
          <p className="mt-2 text-sm text-primary-500">Start exploring our latest drops to find your next favourite piece.</p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-primary-600 px-8 py-3 text-sm font-semibold text-white shadow-floating transition hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/40"
          >
            Discover products
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr,0.9fr]">
          <div className="space-y-6">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-5 rounded-[2rem] border border-white/60 bg-white/80 p-4 shadow-elevated sm:p-6">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[1.5rem] bg-neutral-100">
                  {product.imageUrl ? (
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="112px" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
                      Preview soon
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <Link href={`/products/${product.slug}`} className="text-base font-semibold text-neutral-900 hover:text-primary-600">
                          {product.name}
                        </Link>
                        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">{product.category?.name}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400 transition hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-sm text-neutral-500">
                      Tk{product.price.toFixed(2)} each ·{' '}
                      <span className="text-neutral-400">Subtotal Tk{(product.price * quantity).toFixed(2)}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">Quantity</label>
                    <input
                      type="number"
                      min={1}
                      value={quantity || ''}
                      onChange={(event) => {
                        const value = event.target.value;
                        const numValue = value === '' ? 1 : Number(value);
                        if (!Number.isNaN(numValue) && numValue > 0) {
                          updateQuantity(product.id, numValue);
                        }
                      }}
                      className="w-24 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-[2rem] border border-white/60 bg-white/90 p-8 shadow-elevated">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-900">Order summary</h2>
              <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary-600">
                {items.length} items
              </span>
            </div>
            <div className="mt-6 space-y-4 text-sm text-neutral-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900">Tk{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span>Carbon offset</span>
                <span className="text-primary-500">Included</span>
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-neutral-100/80 p-4 text-xs text-neutral-500">
              Complimentary gift wrapping and dedicated concierge support on all orders.
            </div>
            <div className="mt-6 border-t border-neutral-200 pt-5">
              <div className="flex justify-between text-base font-semibold text-neutral-900">
                <span>Total</span>
                <span>Tk{subtotal.toFixed(2)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-floating transition hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/40"
            >
              Proceed to checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}

