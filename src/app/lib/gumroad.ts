export const GUMROAD_PRODUCTS = {
  tarot: 'https://curiosityhub0.gumroad.com/l/tarotFullResult?wanted=true',
  chiromancy:
    'https://curiosityhub0.gumroad.com/l/chiromancyFullResult?wanted=true',
  numerology:
    'https://curiosityhub0.gumroad.com/l/numerologyFullResult?wanted=true',
} as const;

export type ProductType = keyof typeof GUMROAD_PRODUCTS;
