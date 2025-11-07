import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { Product } from '@/types';
import AddToCartButton from '@/components/buttons/AddToCartButton';

type ProductCardProps = {
  product: Product;
};

const getInventoryLabel = (inventory: number) => {
  if (inventory <= 0) return { label: 'Sold out', tone: 'sold-out' } as const;
  if (inventory <= 5) return { label: `Only ${inventory} left`, tone: 'warning' } as const;
  return { label: 'In stock', tone: 'success' } as const;
};

export default function ProductCard({ product }: ProductCardProps) {
  const inventory = product.stock ?? product.inventory ?? 0;
  const inventoryState = getInventoryLabel(inventory);

  return (
    <article className="product-card">
      {/* Image container with overlay effects */}
      <div className="relative overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
        <Link href={`/products/${product.slug}`} className="relative block aspect-[5/4] w-full overflow-hidden">
          {product.imageUrl ? (
            <>
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-xs font-medium text-neutral-400">
              No image
            </div>
          )}
        </Link>
        
        {/* Badges */}
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
          <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-neutral-700 shadow-md backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:shadow-lg">
            {product.category?.name ?? 'Collection'}
          </span>
          {/* Only show inventory badge when sold out or low stock */}
          {(inventoryState.tone === 'sold-out' || inventoryState.tone === 'warning') && (
            <span
              className={clsx(
                'inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold shadow-md backdrop-blur-md transition-all duration-300 group-hover:shadow-lg',
                {
                  'bg-amber-500/90 text-white': inventoryState.tone === 'warning',
                  'bg-neutral-600/90 text-white': inventoryState.tone === 'sold-out'
                }
              )}
            >
              {inventoryState.label}
            </span>
          )}
        </div>

        {/* Quick view overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-neutral-900 shadow-lg">
            Quick View
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-1.5">
          <Link
            href={`/products/${product.slug}`}
            className="block text-base font-bold leading-tight text-neutral-900 transition-colors duration-200 hover:text-primary-700"
          >
            {product.name}
          </Link>
          <p className="line-clamp-2 text-xs leading-relaxed text-neutral-600">{product.description}</p>
        </div>
        
        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="flex flex-col">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Price</p>
            <p className="mt-0.5 text-xl font-bold text-neutral-900">
              Tk{product.price.toFixed(2)}
            </p>
          </div>
          <AddToCartButton product={product} disabled={inventory <= 0} />
        </div>
      </div>
    </article>
  );
}

