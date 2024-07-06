export function calculateRegionalPrice (amount: number, percentage: number) {

  return (amount + (amount * percentage / 100)).toFixed(2);
};
