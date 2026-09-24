import { GUMROAD_PRODUCTS, ProductType } from './gumroad';

export const openGumroadCheckout = (productType: ProductType, lang: string) => {
  const baseUrl = GUMROAD_PRODUCTS[productType];

  // Берем URL из env или текущего window.location
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== 'undefined'
      ? window.location.origin
      : 'http://localhost:3000');

  // Формируем редирект на общую страницу успеха
  const redirectPath = `${siteUrl}/${lang}/success?wanted_product=${productType}&wanted_language=${lang}`;
  const redirectUrl = encodeURIComponent(redirectPath);

  const fullUrl = `${baseUrl}?redirect_url=${redirectUrl}&wanted_product=${productType}&wanted_language=${lang}`;

  const link = document.createElement('a');
  link.href = fullUrl;
  link.className = 'gumroad-button';
  link.setAttribute('data-gumroad-single-product', 'true');
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
