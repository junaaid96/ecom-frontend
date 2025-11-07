import Link from 'next/link';
import { Metadata } from 'next';
import ProductGrid from '@/components/ProductGrid';
import { serverApi } from '@/lib/server-api';
import type { Category, PagedResponse, Product } from '@/types';

type CategoryPageProps = {
  params: { slug: string };
};

export const revalidate = 300;
export const dynamicParams = true;

async function getCategory(slug: string) {
  try {
    const response = await serverApi((client) => client.get<Category>(`/categories/slug/${slug}`));
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

async function getCategoryProducts(slug: string) {
  try {
    const response = await serverApi((client) =>
      client.get<PagedResponse<Product>>(`/categories/${slug}/products`, {
        params: { limit: 50, page: 0 }
      })
    );
    if (response.status >= 200 && response.status < 300) {
      // Handle paginated response
      return response.data?.content || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching category products:', error);
    return [];
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategory(params.slug);
  if (!category) {
    return {
      title: 'Category not found'
    };
  }
  return {
    title: `Shop ${category.name}`,
    description: category.description ?? `Discover products in the ${category.name} collection.`
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategory(params.slug);
  if (!category) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="rounded-[2.5rem] border border-dashed border-primary-200 bg-primary-50/60 p-16 shadow-inner">
          <h1 className="text-3xl font-semibold text-primary-600">Category not found</h1>
          <p className="mt-4 text-sm text-primary-500">
            We couldn&apos;t find the category you&apos;re looking for. Browse all products instead.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-floating transition hover:bg-primary-700"
          >
            View products
          </Link>
        </div>
      </div>
    );
  }

  const products = await getCategoryProducts(params.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="rounded-[2.5rem] border border-white/60 bg-white/90 p-10 shadow-elevated">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary-500">Category</p>
            <h1 className="text-3xl font-semibold text-neutral-900 sm:text-[2.6rem] sm:leading-tight">{category.name}</h1>
            {category.description ? (
              <p className="text-sm text-neutral-500">{category.description}</p>
            ) : (
              <p className="text-sm text-neutral-500">
                Discover limited collections and timeless staples crafted for intentional living.
              </p>
            )}
          </div>
          <Link
            href="/categories/all"
            className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500 shadow-sm transition hover:text-primary-600"
          >
            Explore all categories
          </Link>
        </div>
      </div>
      <div className="mt-12">
        <ProductGrid products={products} emptyMessage="No products available in this category yet." />
      </div>
    </div>
  );
}

