'use client'

import { useCurrencyStore } from '@/store/currencyStore';
import { useEffect, useState } from 'react';

interface PriceDisplayProps {
  ksh: number;
  usd: number;
  className?: string;
}

export default function PriceDisplay({ ksh, usd, className = '' }: PriceDisplayProps) {
  const { currency } = useCurrencyStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Prevent hydration mismatch by rendering a placeholder or the default until mounted
    // We render an invisible placeholder or just empty string, but usually KSH is safer if we want SEO
    return <span className={className}>...</span>;
  }

  if (currency === 'USD') {
    return <span className={className}>${usd.toLocaleString()}</span>;
  }

  return <span className={className}>KSH {ksh.toLocaleString()}</span>;
}
