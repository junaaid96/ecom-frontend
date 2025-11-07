'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-primary-50/20">
      {/* Animated background gradient that follows mouse */}
      <div 
        className="absolute inset-0 opacity-30 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(220, 38, 38, 0.15), transparent 50%)`
        }}
      />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-primary-200/30 blur-2xl animate-float" />
      <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-amber-200/20 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:gap-16">
          <div className="flex flex-col justify-center space-y-8 animate-fade-in-up">
            <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-primary-200/50 bg-white/80 px-4 py-1.5 text-xs font-semibold text-primary-700 shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-600 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-600" />
              </span>
              <span className="tracking-wider">Just landed — New collection</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
                Thoughtful objects that make{' '}
                <span className="gradient-text">everyday rituals</span> feel considered.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
                Discover well-crafted pieces curated by design lovers and trusted by thousands of discerning shoppers. 
                Shop the edits, explore limited drops, and elevate your home in minutes.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/products"
                className="btn-primary group"
              >
                <span>Browse collections</span>
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/categories/all"
                className="btn-secondary"
              >
                Explore categories
              </Link>
            </div>

            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="group rounded-3xl border border-neutral-200/60 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary-300/50 hover:bg-white hover:shadow-md">
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Customers</dt>
                <dd className="mt-3 text-3xl font-bold text-neutral-900">24k+</dd>
                <p className="mt-2 text-xs leading-relaxed text-neutral-500">Trusted community of design-led shoppers.</p>
              </div>
              <div className="group rounded-3xl border border-neutral-200/60 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary-300/50 hover:bg-white hover:shadow-md">
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Delivery</dt>
                <dd className="mt-3 text-3xl font-bold text-neutral-900">48h</dd>
                <p className="mt-2 text-xs leading-relaxed text-neutral-500">Same-day dispatch on curated essentials.</p>
              </div>
              <div className="group rounded-3xl border border-neutral-200/60 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary-300/50 hover:bg-white hover:shadow-md sm:col-span-1 col-span-2">
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Satisfaction</dt>
                <dd className="mt-3 text-3xl font-bold text-neutral-900">4.9 / 5</dd>
                <p className="mt-2 text-xs leading-relaxed text-neutral-500">The rating we uphold with every order.</p>
              </div>
            </dl>
          </div>

          {/* Right side card - enhanced */}
          <div className="relative hidden lg:flex">
            <div className="surface-card group relative h-full w-full flex-col justify-between p-10 shadow-xl transition-all duration-500 hover:shadow-2xl">
              <div className="relative z-10 flex flex-col gap-6">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
                  This week's edit
                </div>
                <h3 className="text-2xl font-bold leading-tight text-neutral-900 sm:text-3xl">
                  Curated lounge essentials for designing your dream sanctuary.
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600">
                  Limited quantities. Members enjoy early access and complimentary styling guides curated by our in-house team.
                </p>
              </div>

              <div className="relative z-10 mt-10 flex flex-col gap-6">
                <div className="rounded-2xl border border-neutral-200/60 bg-neutral-50 p-6 text-sm leading-relaxed text-neutral-700 shadow-inner">
                  <span className="text-2xl leading-none">"</span>
                  <span className="relative">
                    A calm, minimal palette that layers beautifully with warm textures. Each piece is hand-finished in small batches.
                  </span>
                  <span className="text-2xl leading-none">"</span>
                </div>
                <Link
                  href="/products"
                  className="btn-secondary group w-full justify-center"
                >
                  <span>Shop the edit</span>
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

