import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Currency = 'KSH' | 'USD';

interface CurrencyState {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: 'KSH',
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'fexty-currency-storage',
    }
  )
);
