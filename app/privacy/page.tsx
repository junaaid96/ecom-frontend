import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Arvix Commerce protects and handles your personal information.'
};

export default function PrivacyPage() {
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
            Your Privacy Matters
          </div>
          <h1 className="text-5xl font-bold leading-tight text-neutral-900 sm:text-6xl lg:text-7xl mb-6 animate-fade-in-up">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-600 animate-fade-in-up">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="prose prose-lg prose-neutral mx-auto max-w-3xl">
          <div className="space-y-12 text-base leading-relaxed text-neutral-700">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Introduction</h2>
              <p>
                At Arvix Commerce, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this policy carefully to understand our practices regarding your personal data.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Information We Collect</h2>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">Personal Information</h3>
              <p className="mb-4">
                We may collect personal information that you provide directly to us, including:
              </p>
              <ul className="space-y-2 list-disc pl-6">
                <li>Name and contact information (email address, phone number, mailing address)</li>
                <li>Payment information (credit card details, billing address)</li>
                <li>Account credentials (username, password)</li>
                <li>Order history and preferences</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">Automatically Collected Information</h3>
              <p className="mb-4">
                When you visit our website, we automatically collect certain information, including:
              </p>
              <ul className="space-y-2 list-disc pl-6">
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (pages visited, time spent, click patterns)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="space-y-2 list-disc pl-6">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your account and orders</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Detect and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Information Sharing</h2>
              <p className="mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="space-y-2 list-disc pl-6">
                <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf (payment processing, shipping, analytics)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Your Rights</h2>
              <p className="mb-4">Depending on your location, you may have the following rights:</p>
              <ul className="space-y-2 list-disc pl-6">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookies through your browser settings, but disabling cookies may limit your ability to use certain features of our website.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </div>

            <div className="mt-12 rounded-3xl border border-neutral-200 bg-gradient-to-br from-primary-50/50 to-white p-8 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Contact Us</h3>
              <p className="mb-6 text-neutral-600">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <div className="space-y-2 text-neutral-700">
                <p><strong>Email:</strong> <Link href="mailto:privacy@arvixcommerce.com" className="text-primary-600 hover:underline">privacy@arvixcommerce.com</Link></p>
                <p><strong>Address:</strong> Arvix Commerce, Privacy Department</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

