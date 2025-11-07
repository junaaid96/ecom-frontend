'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdjustmentsHorizontalIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ProductGrid from '@/components/ProductGrid';
import Loader from '@/components/Loader';
import { apiClient } from '@/lib/api';
import type { Category, PagedResponse, Product } from '@/types';

type FilterState = {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
};

const PAGE_SIZE = 12;

export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => ({
    category: searchParams.get('category') ?? undefined,
    minPrice: searchParams.get('minPrice') ?? undefined,
    maxPrice: searchParams.get('maxPrice') ?? undefined,
    sort: searchParams.get('sort') ?? 'createdAt,desc'
  }));
  const [page, setPage] = useState(() => Number(searchParams.get('page') ?? '0'));
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [meta, setMeta] = useState({ totalPages: 0, totalElements: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('size', PAGE_SIZE.toString());
    if (filters.category) params.set('category', filters.category);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.sort) params.set('sort', filters.sort);
    router.replace(`/products?${params.toString()}`);
  }, [filters, page, router]);

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params: Record<string, string | number> = {
          page,
          size: PAGE_SIZE
        };
        
        // Only add filter params if they have values
        if (filters.category) params.category = filters.category;
        if (filters.minPrice) {
          const minPriceNum = parseFloat(filters.minPrice);
          if (!isNaN(minPriceNum) && minPriceNum > 0) {
            params.minPrice = minPriceNum;
          }
        }
        if (filters.maxPrice) {
          const maxPriceNum = parseFloat(filters.maxPrice);
          if (!isNaN(maxPriceNum) && maxPriceNum > 0) {
            params.maxPrice = maxPriceNum;
          }
        }
        if (filters.sort) params.sort = filters.sort;
        
        const { data } = await apiClient.get<PagedResponse<Product>>('/products', { params });
        if (!isMounted) return;
        setProducts(data.content);
        setMeta({ totalPages: data.totalPages, totalElements: data.totalElements });
      } catch (err) {
        if (!isMounted) return;
        setError('Unable to load products. Please try again later.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [filters.category, filters.maxPrice, filters.minPrice, filters.sort, page]);

  useEffect(() => {
    apiClient
      .get<Category[]>('/categories')
      .then(({ data }) => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  const canPrev = page > 0;
  const canNext = page < meta.totalPages - 1;

  const appliedFilters = useMemo(
    () =>
      [
        filters.category && {
          key: 'category',
          label: `Category: ${categories.find(c => c.slug === filters.category)?.name || filters.category}`
        },
        filters.minPrice && {
          key: 'minPrice',
          label: `Min Price: Tk${filters.minPrice}`
        },
        filters.maxPrice && {
          key: 'maxPrice',
          label: `Max Price: Tk${filters.maxPrice}`
        }
      ].filter(Boolean) as Array<{ key: string; label: string }>,
    [filters, categories]
  );

  const onResetFilters = () => {
    setFilters({ sort: 'createdAt,desc' });
    setPage(0);
  };

  const filterControls = (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <h2 className="text-base font-semibold text-neutral-900">Filters</h2>
        <button
          type="button"
          onClick={onResetFilters}
          className="text-sm font-medium text-neutral-500 transition hover:text-neutral-700"
        >
          Reset
        </button>
      </div>
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">Category</label>
          <select
            value={filters.category ?? ''}
            onChange={(event) => {
              setFilters((prev) => ({ ...prev, category: event.target.value || undefined }));
              setPage(0);
            }}
            className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-700 transition focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">Price Range</label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice ?? ''}
                onChange={(event) => setFilters((prev) => ({ ...prev, minPrice: event.target.value || undefined }))}
                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-700 transition focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200"
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice ?? ''}
                onChange={(event) => setFilters((prev) => ({ ...prev, maxPrice: event.target.value || undefined }))}
                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-700 transition focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">Sort by</label>
          <select
            value={filters.sort ?? 'createdAt,desc'}
            onChange={(event) => {
              setFilters((prev) => ({ ...prev, sort: event.target.value }));
              setPage(0);
            }}
            className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-700 transition focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200"
          >
            <option value="createdAt,desc">Newest first</option>
            <option value="price,asc">Price: Low to High</option>
            <option value="price,desc">Price: High to Low</option>
            <option value="name,asc">Name: A-Z</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      {/* Header Section */}
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl lg:text-5xl">
            All Products
          </h1>
          <p className="mt-3 text-base text-neutral-600">
            Discover our curated collection of thoughtfully designed essentials.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFilterDrawerOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50 lg:hidden"
          >
            <FunnelIcon className="h-4 w-4" />
            <span>Filters</span>
          </button>
          <div className="hidden rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-600 sm:inline-flex">
            <span className="font-medium">{meta.totalElements}</span>
            <span className="ml-1 text-neutral-500">products</span>
          </div>
        </div>
      </div>

      {/* Filter Section - Moved to Top */}
      <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
            <h2 className="text-base font-semibold text-neutral-900">Filters</h2>
            <button
              type="button"
              onClick={onResetFilters}
              className="text-sm font-medium text-neutral-500 transition hover:text-neutral-700"
            >
              Reset
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">Category</label>
              <select
                value={filters.category ?? ''}
                onChange={(event) => {
                  setFilters((prev) => ({ ...prev, category: event.target.value || undefined }));
                  setPage(0);
                }}
                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-700 transition focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200"
              >
                <option value="">All categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">Min Price</label>
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice ?? ''}
                onChange={(event) => {
                  setFilters((prev) => ({ ...prev, minPrice: event.target.value || undefined }));
                  setPage(0);
                }}
                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-700 transition focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">Max Price</label>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice ?? ''}
                onChange={(event) => {
                  setFilters((prev) => ({ ...prev, maxPrice: event.target.value || undefined }));
                  setPage(0);
                }}
                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-700 transition focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">Sort by</label>
              <select
                value={filters.sort ?? 'createdAt,desc'}
                onChange={(event) => {
                  setFilters((prev) => ({ ...prev, sort: event.target.value }));
                  setPage(0);
                }}
                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-700 transition focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200"
              >
                <option value="createdAt,desc">Newest first</option>
                <option value="price,asc">Price: Low to High</option>
                <option value="price,desc">Price: High to Low</option>
                <option value="name,asc">Name: A-Z</option>
              </select>
            </div>
          </div>
          {/* Filter Tags */}
          {appliedFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-200">
              {appliedFilters.map((filter) => (
                <span
                  key={filter.key}
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-700"
                >
                  <span>{filter.label}</span>
                  <button
                    type="button"
                    className="ml-1 text-neutral-400 transition hover:text-neutral-600"
                    onClick={() => {
                      if (filter.key === 'category') {
                        setFilters((prev) => ({ ...prev, category: undefined }));
                      }
                      if (filter.key === 'minPrice') {
                        setFilters((prev) => ({ ...prev, minPrice: undefined }));
                      }
                      if (filter.key === 'maxPrice') {
                        setFilters((prev) => ({ ...prev, maxPrice: undefined }));
                      }
                      setPage(0);
                    }}
                    aria-label={`Remove ${filter.label}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={onResetFilters}
                className="text-sm font-medium text-neutral-500 underline-offset-4 transition hover:text-neutral-700 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <section className="w-full">
        {/* Products Grid */}
        <div>
          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-sm text-red-600">
              {error}
            </div>
          ) : (
            <ProductGrid products={products} isLoading={isLoading} emptyMessage="Try adjusting your filters to find products." />
          )}
        </div>

        {/* Pagination */}
        {meta.totalPages > 1 && (
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 sm:flex-row">
            <div className="text-sm text-neutral-600">
              Showing page <span className="font-medium">{page + 1}</span> of{' '}
              <span className="font-medium">{meta.totalPages}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={!canPrev || isLoading}
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                className="inline-flex items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={!canNext || isLoading}
                onClick={() => setPage((prev) => prev + 1)}
                className="inline-flex items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>

      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-neutral-900/40 backdrop-blur-sm lg:hidden">
          <div className="w-full max-h-[90vh] overflow-y-auto rounded-t-2xl border border-neutral-200 bg-white shadow-lg">
            <div className="sticky top-0 flex items-center justify-between border-b border-neutral-200 bg-white p-4">
              <h2 className="text-lg font-semibold text-neutral-900">Filters</h2>
              <button
                type="button"
                onClick={() => setFilterDrawerOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition hover:bg-neutral-50"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">{filterControls}</div>
            <div className="sticky bottom-0 flex gap-3 border-t border-neutral-200 bg-white p-4">
              <button
                type="button"
                className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
                onClick={() => {
                  onResetFilters();
                  setFilterDrawerOpen(false);
                }}
              >
                Clear all
              </button>
              <button
                type="button"
                className="flex-1 rounded-lg bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
                onClick={() => setFilterDrawerOpen(false)}
              >
                Apply filters
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <Loader />
        </div>
      )}
    </div>
  );
}

