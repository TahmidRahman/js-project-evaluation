export function smallestCurrency(amount, smallCurrencyAmount = 100) {
  const result = amount / smallCurrencyAmount;
  return round(result);
}

export function round(number) {
  return number.toFixed(2);
}
