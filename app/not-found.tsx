import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="text-xs uppercase tracking-widest text-primary-600">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-3 text-sm text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Explore our latest products instead.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="rounded-full bg-primary-600 px-6 py-3 text-sm font-medium text-white">
          Go home
        </Link>
        <Link href="/products" className="rounded-full border border-primary-600 px-6 py-3 text-sm font-medium text-primary-600">
          Browse products
        </Link>
      </div>
    </div>
  );
}

