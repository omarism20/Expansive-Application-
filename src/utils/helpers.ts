
import { CurrencySettings } from "@/types";

export const formatCurrency = (amount: number, currency?: CurrencySettings) => {
  const defaultCurrency: CurrencySettings = {
    code: 'USD',
    symbol: '$',
    position: 'before'
  };

  const { symbol, position } = currency || defaultCurrency;
  
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return position === 'before' ? `${symbol}${formattedAmount}` : `${formattedAmount}${symbol}`;
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
