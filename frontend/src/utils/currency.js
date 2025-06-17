import currency from 'currency.js';

// Currency formatting utility
export const formatPrice = (price) => {
  if (!price) return currency(0).format();
  
  // Remove any commas and convert to number
  const cleanPrice = typeof price === 'string' ? price.replace(/,/g, '') : price;
  const numericPrice = parseFloat(cleanPrice) || 0;
  
  return currency(numericPrice, {
    symbol: '$',
    precision: 0,
    separator: ',',
    decimal: '.'
  }).format();
};

// Parse price for sorting/comparison
export const parsePrice = (price) => {
  if (!price) return 0;
  
  // Remove any commas and convert to number
  const cleanPrice = typeof price === 'string' ? price.replace(/,/g, '') : price;
  return parseFloat(cleanPrice) || 0;
}; 