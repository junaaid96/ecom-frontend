import Link from 'next/link';

export default function AssuranceBanner() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <div className="relative surface-card px-8 py-12 sm:px-12 sm:py-16 shadow-xl">
        <div className="relative z-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-200/50 bg-primary-50/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
              Our assurance
            </div>
            <h2 className="text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl">
              Every order is hand-packed, climate neutral, and protected by our{' '}
              <span className="gradient-text">lifetime care promise</span>.
            </h2>
            <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">
              We partner with mission-driven makers, carbon-neutral carriers, and design-led artisans. Your purchase invests in sustainable
              craftsmanship and exceptional support.
            </p>
          </div>
          <div className="flex flex-col gap-4 text-sm font-medium text-neutral-700">
            {[
              'Free 30-day returns & complimentary exchanges',
              'Dedicated stylists and product care consultants',
              'Climate neutral fulfilment from certified partners'
            ].map((benefit, index) => (
              <div 
                key={benefit} 
                className="flex items-start gap-4 rounded-2xl border-2 border-neutral-200/60 bg-white px-6 py-4 shadow-sm transition-all duration-300 hover:border-primary-300/50 hover:shadow-md animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white shadow-md">
                  ✓
                </span>
                <span className="leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/register"
            className="btn-primary group"
          >
            <span>Join Arvix Plus</span>
            <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="/products"
            className="btn-secondary"
          >
            Start shopping
          </Link>
        </div>
      </div>
    </section>
  );
}

