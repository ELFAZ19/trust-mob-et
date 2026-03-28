import React, { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SectionCard } from "../../components/SectionCard";
import { TamagnScreen } from "../../components/TamagnScreen";
import { TrustBadge } from "../../components/TrustBadge";
import { tamagnColors, tamagnRadius } from "../../core/theme/tokens";
import { deriveTrustScoreFromRating, getTrustTier } from "../trust/trustRanking";
import { useMarketplace } from "./useMarketplace";

export function DiscoveryScreen(): JSX.Element {
  const [search, setSearch] = useState("");
  const [maxDistanceKm, setMaxDistanceKm] = useState(10);
  const { data = [], isLoading } = useMarketplace();

  const filtered = useMemo(
    () =>
      data.filter(
        (card) =>
          card.distanceKm <= maxDistanceKm &&
          (card.title.toLowerCase().includes(search.toLowerCase()) ||
            card.description.toLowerCase().includes(search.toLowerCase()) ||
            card.merchantName.toLowerCase().includes(search.toLowerCase()))
      ),
    [data, maxDistanceKm, search]
  );

  return (
    <TamagnScreen
      title="Discover trusted local commerce"
      subtitle="Search by product or service, then filter by proximity."
    >

      <SectionCard title="Filters">
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search listings, merchants, services"
          style={{
            backgroundColor: tamagnColors.surfaceContainerLow,
            borderRadius: tamagnRadius.lg,
            padding: 12,
            marginBottom: 8
          }}
        />
        <Text>Distance filter: within {maxDistanceKm} km</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
          {[3, 5, 10, 20].map((value) => (
            <Pressable
              key={value}
              onPress={() => setMaxDistanceKm(value)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 999,
                backgroundColor: maxDistanceKm === value ? tamagnColors.primaryContainer : tamagnColors.surfaceContainer
              }}
            >
              <Text style={{ fontWeight: "700", color: maxDistanceKm === value ? "#014400" : tamagnColors.secondary }}>
                {value}km
              </Text>
            </Pressable>
          ))}
        </View>
      </SectionCard>

      {isLoading ? <Text>Loading nearby listings...</Text> : null}

      {filtered.map((card) => {
        const trustScore = deriveTrustScoreFromRating(card.rating);
        const trustTier = getTrustTier(trustScore);
        return (
        <SectionCard
          key={card.id}
          title={card.title}
          subtitle={`${card.merchantName} • ${card.priceLabel} • ⭐ ${card.rating.toFixed(1)}`}
        >
          <TrustBadge label={trustTier === "Gold" ? "Verified Merchant" : "Growing Merchant"} />
          <Text>{card.description}</Text>
          <Text style={{ marginTop: 8, color: tamagnColors.secondary }}>
            {card.distanceKm.toFixed(1)} km away • ETA {card.etaMinutes} min
          </Text>
          <Text style={{ marginTop: 4 }}>Trust: {trustScore}/100 ({trustTier})</Text>
        </SectionCard>
        );
      })}
    </TamagnScreen>
  );
}
