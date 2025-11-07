'use client';

import { useEffect, useRef, useState } from 'react';
import { MagnifyingGlassIcon, ShoppingBagIcon, TruckIcon, HeartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const steps = [
  {
    number: '01',
    icon: MagnifyingGlassIcon,
    title: 'Discover',
    description: 'Browse our curated collections or let our stylists guide you to pieces that match your aesthetic.',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    number: '02',
    icon: ShoppingBagIcon,
    title: 'Select',
    description: 'Add thoughtfully designed pieces to your cart. Every item is hand-picked for quality and style.',
    color: 'from-purple-400 to-pink-500'
  },
  {
    number: '03',
    icon: TruckIcon,
    title: 'Receive',
    description: 'Get your order delivered in premium packaging. We handle everything with care and attention.',
    color: 'from-amber-400 to-orange-500'
  },
  {
    number: '04',
    icon: HeartIcon,
    title: 'Enjoy',
    description: 'Transform your space with pieces that bring joy every day. We\'re here for lifetime support.',
    color: 'from-rose-400 to-red-500'
  }
];

export default function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-white via-neutral-50 to-white py-24 sm:py-32">
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary-100/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-amber-100/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-200/50 bg-primary-50/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary-700 mb-6">
            Simple Process
          </div>
          <h2 className="text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl lg:text-6xl mb-6">
            How it{' '}
            <span className="gradient-text">works</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-600">
            From discovery to delivery, we've streamlined every step to make finding and owning beautiful objects effortless.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-200 via-primary-300 to-primary-200 opacity-30" />
            <div 
              className={`absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-1000 ${isVisible ? 'w-full' : 'w-0'}`}
              style={{ transitionDelay: '0.3s' }}
            />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`relative group animate-fade-in-up ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Step number badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-4 border-primary-100 shadow-lg">
                      <span className="text-lg font-bold text-primary-600">{step.number}</span>
                    </div>
                  </div>

                  <div className="relative h-full rounded-3xl border-2 border-neutral-200 bg-white p-8 pt-12 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary-300">
                    {/* Gradient background on hover */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                    {/* Icon */}
                    <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-white shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon className="h-8 w-8" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-600">{step.description}</p>

                    {/* Arrow connector (mobile/tablet) */}
                    {index < steps.length - 1 && (
                      <div className="lg:hidden absolute -bottom-4 left-1/2 -translate-x-1/2">
                        <div className="h-8 w-0.5 bg-gradient-to-b from-primary-300 to-transparent" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-primary-400" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Link
            href="/products"
            className="btn-primary group inline-flex items-center text-base px-8 py-4"
          >
            <span>Start Shopping</span>
            <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

