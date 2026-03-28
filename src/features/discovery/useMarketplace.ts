import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../../core/api/supabaseClient";
import type { MarketplaceCard } from "../../core/types/domain";
import { withRetry } from "../../core/network/retry";

const fallbackData: MarketplaceCard[] = [
  {
    id: "p-1",
    type: "product",
    title: "Fresh Injera Pack",
    description: "Daily baked fresh injera from verified kitchen.",
    priceLabel: "ETB 180",
    merchantName: "Selam Foods",
    rating: 4.8,
    distanceKm: 1.3,
    etaMinutes: 28
  },
  {
    id: "s-1",
    type: "service",
    title: "Home Plumbing Visit",
    description: "On-demand plumbing support in your neighborhood.",
    priceLabel: "ETB 600 - 1200",
    merchantName: "Abel Services",
    rating: 4.6,
    distanceKm: 3.1,
    etaMinutes: 55
  }
];

export function useMarketplace() {
  return useQuery({
    queryKey: ["marketplace", "cards"],
    queryFn: async () =>
      withRetry(async () => {
        const { data, error } = await supabaseClient.from("marketplace_cards").select("*").limit(30);
        if (error) {
          throw error;
        }
        if (!data || data.length === 0) {
          return fallbackData;
        }
        return data as MarketplaceCard[];
      }),
    staleTime: 30_000
  });
}
