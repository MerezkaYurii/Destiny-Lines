'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

export default function TermsPage() {
  const params = useParams();
  const lang = params?.lang || 'en';
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-200">
      <Link
        href={`/${lang}/`}
        className="text-sm z-10 mt-4 text-white hover:underline  hover:text-gray-400 whitespace-nowrap text-center block"
      >
        ← Back / Назад
      </Link>
      <div className="container w-full max-w-7x bg-gray-800/60 mb-20 mt-6 p-7">
        <h1 className="text-3xl font-bold mb-6 text-white">Terms of Service</h1>

        <div className="space-y-6 text-base leading-relaxed">
          <p>
            Welcome to CuriosityHub ecosystem (including Passion Alchemy,
            Destiny Lines, and Style Aura). By using our websites, you agree to
            the following terms:
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">
              1. Entertainment & Informational Purpose Only
            </h2>
            <p>
              All content, texts, generated predictions, advice, and images
              provided by our AI assistants are for entertainment and
              informational purposes only. They do not constitute professional
              medical, psychological, sexological, legal, or financial advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">
              2. AI-Generated Content
            </h2>
            <p>
              All analyses, consultations, and outputs are generated dynamically
              by artificial intelligence algorithms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">
              3. Usage & Responsibility
            </h2>
            <p>
              The website administration is not responsible for any
              interpretation, decisions, or actions taken by users based on the
              generated content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">
              4. Paid Features
            </h2>
            <p>
              We offer both free basic services and paid digital credit
              packages/features (e.g., downloadable PDF reports, extended
              analysis). All payments are one-time charges for digital credit
              usage unless explicitly stated otherwise.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">
              5. Age Limit
            </h2>
            <p>Our services are intended solely for users aged 18 and older.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
