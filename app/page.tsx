import Link from 'next/link';
import HeroSection from '@/components/sections/HeroSection';
import HighlightsSection from '@/components/sections/HighlightsSection';
import TrendingCategories from '@/components/sections/TrendingCategories';
import StorySection from '@/components/sections/StorySection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import NewsletterSection from '@/components/sections/NewsletterSection';
import AssuranceBanner from '@/components/sections/AssuranceBanner';
import ProductGrid from '@/components/ProductGrid';
import { serverApi } from '@/lib/server-api';
import type { Category, Product } from '@/types';

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await serverApi((client) => client.get<Product[]>('/products/featured'));
    if (response.status >= 200 && response.status < 300 && Array.isArray(response.data)) {
      return response.data;
    }
  } catch (error) {
    console.error('Failed to load featured products', error);
  }
  return [];
}

async function getTrendingCategories(): Promise<Category[]> {
  try {
    const response = await serverApi((client) => client.get<Category[]>('/categories'));
    if (response.status >= 200 && response.status < 300 && Array.isArray(response.data)) {
      return response.data.slice(0, 6);
    }
  } catch (error) {
    console.error('Failed to load categories', error);
  }
  return [];
}

export const revalidate = 60;

export default async function HomePage() {
  const [featuredProducts, trendingCategories] = await Promise.all([getFeaturedProducts(), getTrendingCategories()]);

  return (
    <>
      <HeroSection />
      <HighlightsSection />
      <StorySection />
      <TrendingCategories categories={trendingCategories} />
      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-4 animate-fade-in-up">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-200/50 bg-primary-50/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
              Curated today
            </div>
            <h2 className="text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl">
              Featured products loved by our <span className="gradient-text">tastemakers</span>.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-neutral-600">
              Updated daily with limited drops and community favourites. Inventory moves fast—add to your collection before it's gone.
            </p>
          </div>
          <Link
            href="/products"
            className="btn-secondary group animate-fade-in-up"
          >
            <span>View full catalogue</span>
            <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
        <div className="mt-12">
          <ProductGrid products={featuredProducts} emptyMessage="No featured products yet. Check back soon!" />
        </div>
      </section>
      <HowItWorksSection />
      <TestimonialsSection />
      <AssuranceBanner />
      <NewsletterSection />
    </>
  );
}

