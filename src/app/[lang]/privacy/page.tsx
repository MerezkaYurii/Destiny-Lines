'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

export default function PrivacyPage() {
  const params = useParams();
  const lang = params?.lang || 'en';

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-200">
      <Link
        href={`/${lang}/`}
        className="text-sm z-10 mt-4 text-white hover:underline hover:text-gray-400 whitespace-nowrap text-center block"
      >
        ← Back / Назад
      </Link>
      <div className="container w-full max-w-7x bg-gray-800/60 mb-20 mt-6 p-7">
        <h1 className="text-3xl font-bold mb-6 text-white">Privacy Policy</h1>

        <div className="space-y-6 text-base leading-relaxed">
          <p>Your privacy is extremely important to us at SmartyHub.</p>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">
              1. Data Storage & Retention
            </h2>
            <p>
              We do not store your personal inputs, photographs, or generated
              outputs on our permanent servers. All entered and generated
              information is processed in real time and automatically cleared
              once your browser session is closed or refreshed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">
              2. Analytics & Payments
            </h2>
            <p>
              We use secure third-party payment processors to handle checkout
              processes. Your financial details (such as credit card numbers)
              are handled exclusively by certified payment processors and are
              never visible to or stored by us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">
              3. Cookies
            </h2>
            <p>
              We may use temporary session cookies solely to maintain your
              active session and deliver smooth service performance.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
