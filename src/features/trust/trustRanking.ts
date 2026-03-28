export function getTrustTier(score: number): "Gold" | "Silver" | "Bronze" {
  if (score >= 90) return "Gold";
  if (score >= 75) return "Silver";
  return "Bronze";
}
