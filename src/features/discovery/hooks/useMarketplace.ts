import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../../../core/api/supabaseClient";
import type { MarketplaceCard } from "../../../core/types/domain";
import { withRetry } from "../../../core/network/retry";

const fallbackData: MarketplaceCard[] = [
  { id: "p1", title: "Fresh Injera Pack", description: "Daily baked fresh injera from verified kitchen.", price: 180, category: "Food", merchantId: "m1", merchantName: "Selam Foods", rating: 4.8, reviewCount: 124, distanceKm: 1.3, etaMinutes: 28, trustScore: 92, inStock: true },
  { id: "p2", title: "Organic Ethiopian Coffee", description: "Premium single-origin Yirgacheffe beans.", price: 450, category: "Coffee", merchantId: "m3", merchantName: "Harar Beans", rating: 4.9, reviewCount: 203, distanceKm: 3.4, etaMinutes: 45, trustScore: 96, inStock: true },
];

export function useMarketplace() {
  return useQuery({
    queryKey: ["marketplace", "cards"],
    queryFn: async () =>
      withRetry(async () => {
        const { data, error } = await supabaseClient.from("marketplace_cards").select("*").limit(30);
        if (error) throw error;
        if (!data || data.length === 0) return fallbackData;
        return data as MarketplaceCard[];
      }),
    staleTime: 30_000
  });
}
