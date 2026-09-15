'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/app/hooks/useDictionary';

export default function Footer() {
  const dict = useDictionary();
  const params = useParams();
  const lang = params?.lang || 'en';

  if (!dict) return null;

  return (
    <footer className="w-full bg-gray-900/80 text-white py-4 shadow-sm transition-colors duration-500">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4 text-sm text-center">
        <div>
          © {new Date().getFullYear()} {dict.footer.title} — {dict.footer.text}{' '}
          ♥
        </div>

        <nav className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-gray-300">
          <Link
            href={`/${lang}/terms`}
            className="hover:text-white transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href={`/${lang}/privacy`}
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href={`/${lang}/refund`}
            className="hover:text-white transition-colors"
          >
            Refund Policy
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="hover:text-white transition-colors"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  );
}
