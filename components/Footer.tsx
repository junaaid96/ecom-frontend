import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-neutral-200/60 bg-white text-neutral-600">
      
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr]">
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-200/50 bg-primary-50/50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-700">
                Stay in the loop
              </div>
              <h2 className="mt-6 text-4xl font-bold leading-tight text-neutral-900 lg:text-5xl">
                Join the <span className="gradient-text">Arvix Circle</span> for exclusive drops and curated inspiration.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-neutral-600">
              Subscribe to receive early access to limited collections, interviews with makers, and member-only perks.
            </p>
            <form className="flex flex-col gap-4 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-full border-2 border-neutral-200 bg-white px-6 py-3.5 text-sm font-medium text-neutral-700 shadow-sm placeholder:text-neutral-400 transition-all duration-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:shadow-md"
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Notify me
              </button>
            </form>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">Shop</h3>
              <ul className="space-y-3 text-sm font-medium text-neutral-600">
                <li>
                  <Link href="/products" className="transition-colors duration-200 hover:text-primary-600 hover:font-semibold">
                    All products
                  </Link>
                </li>
                <li>
                  <Link href="/categories/all" className="transition-colors duration-200 hover:text-primary-600 hover:font-semibold">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="transition-colors duration-200 hover:text-primary-600 hover:font-semibold">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link href="/checkout" className="transition-colors duration-200 hover:text-primary-600 hover:font-semibold">
                    Checkout
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">Company</h3>
              <ul className="space-y-3 text-sm font-medium text-neutral-600">
                <li>
                  <Link href="/about" className="transition-colors duration-200 hover:text-primary-600 hover:font-semibold">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="transition-colors duration-200 hover:text-primary-600 hover:font-semibold">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="transition-colors duration-200 hover:text-primary-600 hover:font-semibold">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="transition-colors duration-200 hover:text-primary-600 hover:font-semibold">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">Support</h3>
              <ul className="space-y-3 text-sm font-medium text-neutral-600">
                <li>
                  <a href="mailto:support@arvixcommerce.com" className="transition-colors duration-200 hover:text-primary-600 hover:font-semibold">
                    support@arvixcommerce.com
                  </a>
                </li>
                <li>
                  <a href="tel:+123456789" className="transition-colors duration-200 hover:text-primary-600 hover:font-semibold">
                    +1 (234) 567-890
                  </a>
                </li>
                <li>
                  <Link href="/orders" className="transition-colors duration-200 hover:text-primary-600 hover:font-semibold">
                    Track order
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="transition-colors duration-200 hover:text-primary-600 hover:font-semibold">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-6 border-t border-neutral-200/60 pt-8 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium">© {year} Arvix Commerce. Crafted with intention for modern living.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="https://instagram.com" className="font-medium transition-colors duration-200 hover:text-primary-600" aria-label="Instagram">
              Instagram
            </a>
            <a href="https://pinterest.com" className="font-medium transition-colors duration-200 hover:text-primary-600" aria-label="Pinterest">
              Pinterest
            </a>
            <a href="https://facebook.com" className="font-medium transition-colors duration-200 hover:text-primary-600" aria-label="Facebook">
              Facebook
            </a>
            <a href="https://tiktok.com" className="font-medium transition-colors duration-200 hover:text-primary-600" aria-label="TikTok">
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

