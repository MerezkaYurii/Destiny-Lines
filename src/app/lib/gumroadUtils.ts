// app/lib/gumroadUtils.ts
import { GUMROAD_PRODUCTS } from '@/app/lib/gumroad';

export type ProductType = keyof typeof GUMROAD_PRODUCTS;

export const openGumroadCheckout = (
  productType: ProductType,
  lang: string = 'en',
) => {
  if (typeof window === 'undefined') return;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000';

  const redirectUrl = encodeURIComponent(
    `${siteUrl}/${lang}/success?wanted_product=${productType}&wanted_language=${lang}`,
  );

  const baseUrl = GUMROAD_PRODUCTS[productType];
  const separator = baseUrl.includes('?') ? '&' : '?';

  const finalUrl = `${baseUrl}${separator}redirect_url=${redirectUrl}`;

  window.location.href = finalUrl;
};
