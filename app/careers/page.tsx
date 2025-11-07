import type { Metadata } from 'next';
import Link from 'next/link';
import { BriefcaseIcon, SparklesIcon, HeartIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the Arvix Commerce team and help us shape the future of thoughtful e-commerce.'
};

const benefits = [
  {
    icon: BriefcaseIcon,
    title: 'Flexible Work',
    description: 'Remote-first culture with flexible hours and work-life balance.'
  },
  {
    icon: SparklesIcon,
    title: 'Growth Opportunities',
    description: 'Continuous learning, mentorship, and career development programs.'
  },
  {
    icon: HeartIcon,
    title: 'Great Benefits',
    description: 'Competitive compensation, health insurance, and wellness programs.'
  }
];

const openPositions = [
  {
    title: 'Senior Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time'
  },
  {
    title: 'Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time'
  },
  {
    title: 'Customer Experience Specialist',
    department: 'Support',
    location: 'Remote',
    type: 'Full-time'
  },
  {
    title: 'Product Curator',
    department: 'Merchandising',
    location: 'Remote',
    type: 'Full-time'
  }
];

export default function CareersPage() {
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
            Join Our Team
          </div>
          <h1 className="text-5xl font-bold leading-tight text-neutral-900 sm:text-6xl lg:text-7xl mb-6 animate-fade-in-up">
            Build the future of <span className="gradient-text">thoughtful commerce</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-600 animate-fade-in-up">
            We're looking for passionate individuals who share our vision of making beautiful, intentional design accessible to everyone.
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">Why Work With Us</h2>
          <p className="max-w-2xl mx-auto text-lg text-neutral-600">
            At Arvix Commerce, we're building more than an e-commerce platform—we're creating a community of design lovers and intentional shoppers.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="interactive-card group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-700 transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110 mb-6">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Open Positions */}
      <section className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">Open Positions</h2>
          <p className="max-w-2xl mx-auto text-lg text-neutral-600">
            We're always looking for talented individuals to join our growing team.
          </p>
        </div>

        <div className="space-y-4">
          {openPositions.map((position, index) => (
            <div
              key={position.title}
              className="group rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary-200/50 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{position.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                    <span className="flex items-center gap-2">
                      <BriefcaseIcon className="h-4 w-4" />
                      {position.department}
                    </span>
                    <span>{position.location}</span>
                    <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                      {position.type}
                    </span>
                  </div>
                </div>
                <Link
                  href={`mailto:careers@arvixcommerce.com?subject=Application: ${position.title}`}
                  className="btn-secondary group whitespace-nowrap"
                >
                  <span>Apply Now</span>
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* General Application */}
        <div className="mt-12 rounded-3xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-8 text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-2xl font-bold text-neutral-900 mb-3">Don't see a role that fits?</h3>
          <p className="mb-6 text-neutral-600">
            We're always interested in connecting with talented people. Send us your resume and let's start a conversation.
          </p>
          <Link
            href="mailto:careers@arvixcommerce.com?subject=General Application"
            className="btn-primary group inline-flex items-center"
          >
            <span>Send General Application</span>
            <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

