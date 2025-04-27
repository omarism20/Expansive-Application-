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

export const getGradientByPercentage = (percentage: number): string => {
  if (percentage < 25) {
    return "from-green-500 to-green-400"; // Low usage - Green
  } else if (percentage < 50) {
    return "from-blue-500 to-blue-400"; // Low-medium usage - Blue
  } else if (percentage < 75) {
    return "from-yellow-500 to-yellow-400"; // Medium-high usage - Yellow
  } else {
    return "from-orange-500 to-orange-400"; // High usage - Orange
  }
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
