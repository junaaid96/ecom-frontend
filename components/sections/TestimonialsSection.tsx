'use client';

import { useEffect, useRef, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Interior Designer',
    location: 'San Francisco, CA',
    rating: 5,
    text: 'The curation here is exceptional. Every piece I\'ve purchased has become a conversation starter and a cherished part of my home.',
    image: 'SC'
  },
  {
    name: 'Marcus Thompson',
    role: 'Architect',
    location: 'New York, NY',
    rating: 5,
    text: 'Finally, a store that understands that good design isn\'t about trends—it\'s about timeless quality. My entire studio is furnished from here.',
    image: 'MT'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Lifestyle Blogger',
    location: 'Los Angeles, CA',
    rating: 5,
    text: 'The attention to detail in both the products and the shopping experience is unmatched. This is how e-commerce should feel.',
    image: 'ER'
  },
  {
    name: 'David Kim',
    role: 'Product Designer',
    location: 'Seattle, WA',
    rating: 5,
    text: 'As someone who designs for a living, I appreciate the thoughtfulness behind every selection. These pieces elevate any space.',
    image: 'DK'
  }
];

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-200/50 bg-primary-50/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary-700 mb-6">
            Loved by Creators
          </div>
          <h2 className="text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl lg:text-6xl mb-6">
            What our{' '}
            <span className="gradient-text">community</span> says
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`group relative animate-fade-in-up ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-full rounded-3xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50/50 p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-primary-200/50">
                {/* Quote mark decoration */}
                <div className="absolute -top-2 -left-2 h-12 w-12 rounded-full bg-primary-100/50 flex items-center justify-center text-4xl text-primary-600/30 font-serif">
                  "
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-sm leading-relaxed text-neutral-700 mb-6 relative z-10">
                  {testimonial.text}
                </p>

                {/* Author info */}
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-200/60">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-sm font-bold text-white shadow-md">
                    {testimonial.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-neutral-900 truncate">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-neutral-500 truncate">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                {/* Hover effect gradient */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Trust badge */}
        <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="inline-flex items-center gap-3 rounded-full border border-neutral-200 bg-white px-6 py-3 shadow-sm">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-semibold text-neutral-700">
              4.9/5 from 2,400+ reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

