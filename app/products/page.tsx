import { Suspense } from 'react';
import Loader from '@/components/Loader';
import ProductsClient from './_components/ProductsClient';

export const dynamic = 'force-dynamic';

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <Loader />
        </div>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}

