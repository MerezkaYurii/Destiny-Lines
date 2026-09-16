'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

export default function ContactPage() {
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
        <h1 className="text-3xl font-bold mb-6 text-white">
          Contact & Support
        </h1>

        <div className="space-y-6 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">
              Project Name
            </h2>
            <p>CuriosityHub / Destiny Lines</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">
              Contact Email
            </h2>
            <p>
              <a
                href="mailto:curiosityhub.contact@gmail.com"
                className="text-blue-400 underline hover:text-blue-300"
              >
                curiosityhub.contact@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">
              Response Time
            </h2>
            <p>We strive to respond to all inquiries within 24–48 hours.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
