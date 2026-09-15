
export const getEnvVar = (name: string, defaultValue?: string): string => {
  const envMap: Record<string, string | undefined> = {
    NEXT_PUBLIC_STRIPE_PRICE_NUMEROLOGY: process.env.NEXT_PUBLIC_STRIPE_PRICE_NUMEROLOGY,
    NEXT_PUBLIC_STRIPE_PRICE_CHIROMANCY: process.env.NEXT_PUBLIC_STRIPE_PRICE_CHIROMANCY,
    NEXT_PUBLIC_STRIPE_PRICE_TAROT: process.env.NEXT_PUBLIC_STRIPE_PRICE_TAROT,
  };

  const value = envMap[name] ?? process.env[name];
  if (value) return value;
  if (defaultValue !== undefined) return defaultValue;
  throw new Error(`Cannot find process.env[${name}]`);
};