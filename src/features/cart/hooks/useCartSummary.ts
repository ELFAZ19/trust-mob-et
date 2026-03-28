const DELIVERY_FEE = 75;
const PLATFORM_FEE_PCT = 0.03;

export function useCartSummary(subtotal: number) {
  const platformFee = Math.round(subtotal * PLATFORM_FEE_PCT);
  const deliveryFee = subtotal > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee + platformFee;
  return { deliveryFee, platformFee, total };
}
