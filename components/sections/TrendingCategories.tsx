import Link from 'next/link';
import type { Category } from '@/types';

type TrendingCategoriesProps = {
  categories: Category[];
};

export default function TrendingCategories({ categories }: TrendingCategoriesProps) {
  if (!categories.length) return null;

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-4 animate-fade-in-up">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-200/50 bg-primary-50/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
            Trending now
          </div>
          <h2 className="text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl">
            Explore categories shaping{' '}
            <span className="gradient-text">modern living</span>.
          </h2>
        </div>
        <Link
          href="/categories/all"
          className="btn-secondary group animate-fade-in-up"
        >
          <span>View all categories</span>
          <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <article 
            key={category.id} 
            className="interactive-card group h-full animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
                Category
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{category.name}</h3>
              {category.description ? (
                <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600">{category.description}</p>
              ) : (
                <p className="text-sm leading-relaxed text-neutral-600">Shop the latest releases crafted for intentional living.</p>
              )}
            </div>
            <Link
              href={`/categories/${category.slug}`}
              className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-primary-700 transition-all duration-300 group-hover:text-primary-800 group-hover:gap-4"
            >
              <span>Shop now</span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-200 bg-primary-50 text-base transition-all duration-300 group-hover:border-primary-400 group-hover:bg-primary-100 group-hover:scale-110">
                →
              </span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

