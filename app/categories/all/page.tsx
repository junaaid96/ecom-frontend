import Link from 'next/link';
import { serverApi } from '@/lib/server-api';
import type { Category } from '@/types';

export const revalidate = 300;

async function getCategories(): Promise<Category[]> {
  const response = await serverApi((client) => client.get<Category[]>('/categories'));
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  return [];
}

export default async function CategoriesIndexPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary-500">Categories</p>
        <h1 className="text-3xl font-semibold text-neutral-900 sm:text-[2.6rem] sm:leading-tight">Browse by category</h1>
        <p className="text-sm text-neutral-500">
          Explore collections tailored to your interests. Each category is a curated universe of designs ready to complement your lifestyle.
        </p>
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 p-[1px] shadow-elevated transition-transform duration-300 ease-out hover:-translate-y-1"
          >
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-primary-50/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative h-full rounded-[1.9rem] border border-white/40 bg-white/90 p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
                Collection {index + 1}
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-neutral-900 group-hover:text-primary-600">{category.name}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-500">
                {category.description ?? 'Discover limited-edition drops, bespoke collaborations, and timeless staples curated for modern living.'}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary-600">
                View products
                <span className="text-lg">→</span>
              </span>
            </div>
          </Link>
        ))}
        {categories.length === 0 && (
          <div className="rounded-[2rem] border border-dashed border-neutral-200 bg-white/80 p-8 text-sm text-neutral-500">
            No categories available yet.
          </div>
        )}
      </div>
    </div>
  );
}

