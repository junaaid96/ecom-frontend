import Link from 'next/link';

export default function OrderConfirmationPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <div className="rounded-[2.5rem] border border-white/60 bg-white/90 p-12 shadow-elevated">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-white shadow-floating">
          ✓
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.4em] text-primary-500">Order confirmed</p>
        <h1 className="mt-3 text-3xl font-semibold text-neutral-900">Thank you for your purchase</h1>
        <p className="mt-3 text-sm text-neutral-500">
          We&apos;ve emailed your order summary and will notify you as soon as your pieces are dispatched. Track your order anytime from your dashboard.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/orders"
            className="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-floating transition hover:bg-primary-700"
          >
            View my orders
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-neutral-600 shadow-sm transition hover:text-primary-600"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

