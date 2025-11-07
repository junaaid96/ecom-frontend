'use client';

import { useEffect, useRef, useState } from 'react';
import { SparklesIcon, HeartIcon, LightBulbIcon } from '@heroicons/react/24/outline';

const storySteps = [
  {
    icon: LightBulbIcon,
    title: 'The Vision',
    description: 'We started with a simple idea: everyday objects should be beautiful, functional, and made to last.',
    color: 'from-amber-400 to-orange-500'
  },
  {
    icon: HeartIcon,
    title: 'The Craft',
    description: 'Every piece is carefully selected from makers who share our values of quality, sustainability, and timeless design.',
    color: 'from-rose-400 to-pink-500'
  },
  {
    icon: SparklesIcon,
    title: 'The Experience',
    description: 'We curate collections that transform your space into a sanctuary of intentional living and mindful consumption.',
    color: 'from-purple-400 to-indigo-500'
  }
];

export default function StorySection() {
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
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 py-24 sm:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-200/20 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-amber-200/20 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-200/50 bg-primary-50/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary-700 mb-6">
            Our Story
          </div>
          <h2 className="text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl lg:text-6xl mb-6">
            More than a store—a{' '}
            <span className="gradient-text">philosophy</span> of living well.
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-neutral-600">
            We believe the objects you surround yourself with shape your daily experience. That's why we partner with artisans and designers who create pieces that stand the test of time.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mt-16">
          {storySteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className={`relative group animate-fade-in-up ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-full rounded-3xl border border-neutral-200/60 bg-white/80 backdrop-blur-sm p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary-300/50">
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">{step.title}</h3>
                  <p className="text-base leading-relaxed text-neutral-600">{step.description}</p>
                  
                  {/* Decorative element */}
                  <div className="absolute bottom-0 right-0 h-24 w-24 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                    <Icon className="h-full w-full text-primary-600" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Connecting line animation */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-0.5 bg-gradient-to-r from-transparent via-primary-200 to-transparent opacity-30" />
      </div>
    </section>
  );
}

