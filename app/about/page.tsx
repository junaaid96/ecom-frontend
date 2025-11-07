import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Arvix Commerce and our mission to bring thoughtful design to everyday living.'
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-primary-50/20 py-20 sm:py-28">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-primary-200/30 blur-2xl animate-float" />
          <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-amber-200/20 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-200/50 bg-primary-50/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary-700 mb-6 animate-fade-in-up">
            Our Story
          </div>
          <h1 className="text-5xl font-bold leading-tight text-neutral-900 sm:text-6xl lg:text-7xl mb-6 animate-fade-in-up">
            About <span className="gradient-text">Arvix Commerce</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-600 animate-fade-in-up">
            We're on a mission to make thoughtful design accessible to everyone, curating products that elevate everyday living.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="prose prose-lg prose-neutral mx-auto max-w-3xl">
          <div className="space-y-8 text-base leading-relaxed text-neutral-700">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Who We Are</h2>
              <p>
                Arvix Commerce is a product of <strong className="text-primary-600">Arvix Creative</strong>, a design-led company dedicated to bringing beautiful, functional products into your home. We believe that the objects you surround yourself with should be thoughtfully crafted, sustainably made, and designed to last.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Our Mission</h2>
              <p>
                Our mission is simple: to curate a collection of products that make everyday moments feel more intentional. We partner with emerging makers and established artisans who share our values of quality, sustainability, and timeless design. Every piece in our collection is hand-selected by our team of design enthusiasts.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">What We Stand For</h2>
              <ul className="space-y-4 list-none pl-0">
                <li className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 font-bold text-sm">
                    ✓
                  </span>
                  <div>
                    <strong className="text-neutral-900">Quality First</strong>
                    <p className="mt-1 text-neutral-600">We only stock products that meet our rigorous standards for craftsmanship and durability.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 font-bold text-sm">
                    ✓
                  </span>
                  <div>
                    <strong className="text-neutral-900">Sustainable Practices</strong>
                    <p className="mt-1 text-neutral-600">We're committed to working with partners who prioritize environmental responsibility and ethical production.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 font-bold text-sm">
                    ✓
                  </span>
                  <div>
                    <strong className="text-neutral-900">Community Focus</strong>
                    <p className="mt-1 text-neutral-600">We're building a community of design lovers who appreciate thoughtful curation and intentional living.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Our Team</h2>
              <p>
                Behind Arvix Commerce is a passionate team of designers, curators, and customer experience specialists. We're part of the Arvix Creative family, bringing years of design expertise and a shared vision for making beautiful products accessible to everyone.
              </p>
            </div>

            <div className="mt-12 rounded-3xl border border-neutral-200 bg-gradient-to-br from-primary-50/50 to-white p-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Get in Touch</h3>
              <p className="mb-6 text-neutral-600">
                Have questions or want to learn more? We'd love to hear from you.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="mailto:hello@arvixcommerce.com"
                  className="btn-primary group"
                >
                  <span>Contact Us</span>
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/products"
                  className="btn-secondary"
                >
                  Explore Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

