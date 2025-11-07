import ProductCard from '@/components/ProductCard';
import Loader from '@/components/Loader';
import { Product } from '@/types';

type ProductGridProps = {
  products: Product[];
  isLoading?: boolean;
  emptyMessage?: string;
};

export default function ProductGrid({ products, isLoading, emptyMessage }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!products.length) {
    return <p className="text-center text-sm text-slate-500">{emptyMessage ?? 'No products found.'}</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

