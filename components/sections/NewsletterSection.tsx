'use client';

import { useState } from 'react';
import { EnvelopeIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-24 sm:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center animate-fade-in-up">
          {/* Icon */}
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
            <EnvelopeIcon className="h-8 w-8 text-white" />
          </div>

          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white mb-6">
            <SparklesIcon className="h-3 w-3" />
            Exclusive Updates
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl mb-6">
            Stay ahead of the{' '}
            <span className="text-amber-300">curve</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-primary-100 mb-10">
            Be the first to know about new collections, limited drops, exclusive member events, and styling tips from our design team.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mx-auto max-w-md">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting || isSubmitted}
                  className="w-full rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm px-6 py-4 text-white placeholder:text-primary-200 focus:border-white/50 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-primary-700 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
                    Subscribing...
                  </span>
                ) : isSubmitted ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Subscribed!
                  </span>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
          </form>

          {/* Benefits */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              'Early access to new drops',
              'Exclusive member discounts',
              'Weekly styling inspiration'
            ].map((benefit, index) => (
              <div
                key={benefit}
                className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2 text-sm text-white animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <svg className="h-4 w-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Privacy note */}
          <p className="mt-8 text-xs text-primary-200">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}

