'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

export default function RefundPage() {
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
          Refund & Cancellation Policy
        </h1>

        <div className="space-y-6 text-base leading-relaxed">
          <p>
            Due to the digital nature of our AI-generated services and instant
            delivery of reports/analyses:
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">
              1. Digital Delivery
            </h2>
            <p>
              Access to paid features and downloadable PDF reports is granted
              immediately upon successful completion of the payment transaction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">
              2. Refund Requests
            </h2>
            <p>
              If you experience a technical failure where payment was deducted
              but access/report was not delivered, please contact our support
              team at{' '}
              <a
                href="mailto:yuriimerezka@gmail.com"
                className="text-blue-400 underline hover:text-blue-300"
              >
                yuriimerezka@gmail.com
              </a>{' '}
              within 14 days with your transaction details. Verified technical
              issues will be refunded in full.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">
              3. Non-Refundable Cases
            </h2>
            <p>
              Once credits have been consumed or a PDF report has been generated
              and downloaded, payments are non-refundable unless a technical
              system error is demonstrated.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
