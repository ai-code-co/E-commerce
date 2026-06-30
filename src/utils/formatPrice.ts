// src/utils/formatPrice.ts

/**
 * Formats a number into Indian Rupee (₹) formatting.
 * Also handles a mock exchange rate calculation if you want numbers to look closer to INR values,
 * or simply replaces the currency symbol based on your preference.
 */
export const formatPrice = (price: number): string => {
  // Option: Multiply by a fixed rate (e.g., 80) if you want to turn $10 into ₹800
  const inrPrice = price * 83; 
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0, // MegaMart typically uses whole numbers for prices
  }).format(inrPrice);
};