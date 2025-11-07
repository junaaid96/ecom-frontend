import { ShieldCheckIcon, SparklesIcon, TruckIcon } from '@heroicons/react/24/outline';

const highlights = [
  {
    title: 'Curated by experts',
    description: 'Every piece passes a rigorous design & quality review. Expect only the best form and function.',
    Icon: SparklesIcon
  },
  {
    title: 'Express worldwide delivery',
    description: 'Global shipping partners ensure elite delivery speeds with live tracking and zero-compromise care.',
    Icon: TruckIcon
  },
  {
    title: 'Lifetime support & warranty',
    description: 'Dedicated stylists and product specialists keep your essentials in pristine shape, forever.',
    Icon: ShieldCheckIcon
  }
];

export default function HighlightsSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="relative surface-card p-10 lg:p-16 shadow-xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-lg space-y-6 animate-fade-in-up">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-200/50 bg-primary-50/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
              Why shop with us
            </div>
            <h2 className="text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl">
              A pared-back shopping experience built around{' '}
              <span className="gradient-text">quality essentials</span>.
            </h2>
            <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">
              We collaborate with emerging makers and established ateliers to curate limited releases with lasting value. Your rituals deserve
              nothing less.
            </p>
          </div>
          <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-2xl lg:grid-cols-3">
            {highlights.map(({ title, description, Icon }, index) => (
              <div 
                key={title} 
                className="interactive-card group h-full animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-700 transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-glow-md group-hover:scale-110">
                  <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-neutral-900">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

