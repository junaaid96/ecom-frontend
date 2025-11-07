import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms and conditions for using Arvix Commerce services.'
};

export default function TermsPage() {
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
            Legal Information
          </div>
          <h1 className="text-5xl font-bold leading-tight text-neutral-900 sm:text-6xl lg:text-7xl mb-6 animate-fade-in-up">
            Terms of <span className="gradient-text">Service</span>
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
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Agreement to Terms</h2>
              <p>
                By accessing or using Arvix Commerce ("we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services. These Terms apply to all visitors, users, and others who access or use our website and services.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Use of Our Services</h2>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">Eligibility</h3>
              <p className="mb-4">
                You must be at least 18 years old to use our services. By using our services, you represent and warrant that you are of legal age to form a binding contract.
              </p>

              <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">Account Registration</h3>
              <p className="mb-4">
                To access certain features, you may need to create an account. You agree to:
              </p>
              <ul className="space-y-2 list-disc pl-6">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information as necessary</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Products and Pricing</h2>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">Product Information</h3>
              <p className="mb-4">
                We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
              </p>

              <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">Pricing</h3>
              <p className="mb-4">
                All prices are in the currency displayed and are subject to change without notice. We reserve the right to correct any pricing errors, even after an order has been placed. If we discover an error, we will notify you and give you the option to cancel your order or proceed at the correct price.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Orders and Payment</h2>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">Order Acceptance</h3>
              <p className="mb-4">
                Your order is an offer to purchase products from us. We reserve the right to accept or reject your order for any reason, including product availability, errors in pricing or product information, or suspected fraud.
              </p>

              <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">Payment</h3>
              <p className="mb-4">
                You agree to provide current, complete, and accurate purchase and account information. You agree to promptly update your account and payment information, including email address, payment method, and payment card expiration date, so we can complete your transactions and contact you as needed.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Shipping and Returns</h2>
              <p className="mb-4">
                Shipping terms and return policies are detailed in our Shipping Policy and Return Policy, which are incorporated into these Terms by reference. Please review these policies before placing an order.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Intellectual Property</h2>
              <p className="mb-4">
                All content on our website, including text, graphics, logos, images, and software, is the property of Arvix Commerce or its content suppliers and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Prohibited Uses</h2>
              <p className="mb-4">You agree not to:</p>
              <ul className="space-y-2 list-disc pl-6">
                <li>Use our services for any illegal purpose</li>
                <li>Violate any laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit any harmful code or malware</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt our services</li>
              </ul>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Limitation of Liability</h2>
              <p className="mb-4">
                To the maximum extent permitted by law, Arvix Commerce shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless Arvix Commerce and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of your use of our services or violation of these Terms.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Termination</h2>
              <p>
                We may terminate or suspend your account and access to our services immediately, without prior notice, for any reason, including if you breach these Terms. Upon termination, your right to use our services will cease immediately.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '1s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of our services after such modifications constitutes acceptance of the updated Terms.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Arvix Commerce operates, without regard to its conflict of law provisions.
              </p>
            </div>

            <div className="mt-12 rounded-3xl border border-neutral-200 bg-gradient-to-br from-primary-50/50 to-white p-8 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Contact Us</h3>
              <p className="mb-6 text-neutral-600">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-neutral-700">
                <p><strong>Email:</strong> <Link href="mailto:legal@arvixcommerce.com" className="text-primary-600 hover:underline">legal@arvixcommerce.com</Link></p>
                <p><strong>Address:</strong> Arvix Commerce, Legal Department</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

