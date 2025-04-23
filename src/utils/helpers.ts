
/**
 * Format amount as currency
 * @param amount - numeric amount to format
 * @returns formatted currency string
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

/**
 * Calculate percentage
 * @param value - the value to calculate percentage for
 * @param total - the total value
 * @returns formatted percentage string
 */
export const calculatePercentage = (value: number, total: number): string => {
  if (total === 0) return '0%';
  return `${((value / total) * 100).toFixed(1)}%`;
};

/**
 * Format date to readable format
 * @param dateString - date string in ISO format
 * @returns formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Generate random ID
 * @returns random ID string
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

/**
 * Get gradient by percentage
 * @param percentage - percentage value
 * @returns CSS gradient class
 */
export const getGradientByPercentage = (percentage: number): string => {
  if (percentage < 30) return 'from-green-500 to-green-300';
  if (percentage < 70) return 'from-yellow-500 to-yellow-300';
  return 'from-red-500 to-red-300';
};

/**
 * Get difference with previous period
 * @param current - current value
 * @param previous - previous value
 * @returns percentage difference
 */
export const getDifference = (current: number, previous: number): string => {
  if (previous === 0) return '+100%';
  const diff = ((current - previous) / previous) * 100;
  const prefix = diff > 0 ? '+' : '';
  return `${prefix}${diff.toFixed(1)}%`;
};
