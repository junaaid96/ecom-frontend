import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/buttons/AddToCartButton';
import ProductGrid from '@/components/ProductGrid';
import { serverApi } from '@/lib/server-api';
import type { Product } from '@/types';

type ProductResponse = {
  product: Product;
  related: Product[];
};

async function getProduct(slug: string): Promise<Product> {
  const response = await serverApi((client) => client.get<Product>(`/products/slug/${slug}`));
  if (response.status === 404 || !response.data) {
    notFound();
  }
  return response.data;
}

async function getRelatedProducts(categorySlug: string, productId: number): Promise<Product[]> {
  const response = await serverApi((client) =>
    client.get<Product[]>('/products/related', {
      params: { category: categorySlug, exclude: productId, limit: 4 }
    })
  );
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  return [];
}

type ProductPageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.slug);
  return {
    title: `${product.name}`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.imageUrl ? [product.imageUrl] : []
    }
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);
  const related = await getRelatedProducts(product.category.slug, product.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/80 p-3 shadow-elevated">
            <div className="absolute inset-6 rounded-[2rem] bg-grid-pattern bg-[length:160px_160px] opacity-30" />
            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-neutral-100">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  fill
                  alt={product.name}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">
                  Image coming soon
                </div>
              )}
            </div>
            <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              {product.category?.name ?? 'Collection'}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[{ label: 'Crafted in', value: 'Small batches' }, { label: 'Dispatch', value: 'Ships in 24h' }, { label: 'Care', value: 'Lifetime support' }].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/60 bg-white/80 p-5 text-sm text-neutral-500">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">{item.label}</p>
                <p className="mt-2 text-base font-semibold text-neutral-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary-500">{product.category?.name}</p>
            <h1 className="text-3xl font-semibold text-neutral-900 sm:text-[2.6rem] sm:leading-tight">{product.name}</h1>
            <p className="text-sm leading-relaxed text-neutral-500">{product.description}</p>
          </div>

          <div className="rounded-[2rem] border border-white/60 bg-white/90 p-8 shadow-elevated">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">Price</p>
            <p className="mt-3 text-4xl font-semibold text-neutral-900">Tk{product.price.toFixed(2)}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary-500">
              {product.inventory > 0 ? `${product.inventory} pieces ready to ship` : 'Currently out of stock'}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AddToCartButton product={product} disabled={product.inventory <= 0} />
              <a
                href="mailto:support@arvixcommerce.com"
                className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-2 text-sm font-semibold text-neutral-600 shadow-sm transition hover:text-primary-600"
              >
                Chat with a stylist
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary-500">What to expect</p>
            <ul className="space-y-3 text-sm leading-relaxed text-neutral-500">
              <li>
                <span className="font-semibold text-neutral-900">Thoughtful craftsmanship:</span> ethically sourced materials with meticulous finishing for long-term durability.
              </li>
              <li>
                <span className="font-semibold text-neutral-900">Carbon-neutral delivery:</span> each shipment is offset and arrives in eco-conscious packaging.
              </li>
              <li>
                <span className="font-semibold text-neutral-900">Lifetime assistance:</span> access personalised styling and care resources whenever you need them.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary-500">Curated for you</p>
            <h2 className="mt-2 text-2xl font-semibold text-neutral-900">You might also love</h2>
          </div>
          <a href="/products" className="text-sm font-semibold text-primary-500 transition hover:text-primary-600">
            Discover more
          </a>
        </div>
        <div className="mt-8">
          <ProductGrid products={related} emptyMessage="More items coming soon." />
        </div>
      </section>
    </div>
  );
}

