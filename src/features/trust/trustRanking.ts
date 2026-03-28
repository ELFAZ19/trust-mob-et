export function getTrustTier(score: number): "Gold" | "Silver" | "Bronze" {
  if (score >= 90) {
    return "Gold";
  }
  if (score >= 75) {
    return "Silver";
  }
  return "Bronze";
}

export function deriveTrustScoreFromRating(rating: number, completionRate = 95): number {
  const ratingPart = Math.min(5, Math.max(0, rating)) * 18;
  const completionPart = Math.min(100, Math.max(0, completionRate)) * 0.1;
  return Math.round(ratingPart + completionPart);
}
