import React from "react";
import { Pressable, Text, View } from "react-native";
import { tamagnColors, tamagnRadius, tamagnShadow, tamagnSpacing, tamagnTypography } from "../core/theme/tokens";
import { TrustBadge } from "./TrustBadge";
import { getTrustTier } from "../features/trust/trustRanking";

interface ProductCardProps {
  title: string;
  merchantName: string;
  price: number;
  rating: number;
  trustScore: number;
  distanceKm: number;
  etaMinutes: number;
  category: string;
  onPress: () => void;
}

export function ProductCard({
  title,
  merchantName,
  price,
  rating,
  trustScore,
  distanceKm,
  etaMinutes,
  category,
  onPress,
}: ProductCardProps): JSX.Element {
  const tier = getTrustTier(trustScore);
  return (
    <Pressable
      onPress={onPress}
      style={{
        borderRadius: tamagnRadius.xl,
        backgroundColor: tamagnColors.surfaceContainerLowest,
        overflow: "hidden",
        marginBottom: tamagnSpacing.md,
        ...tamagnShadow,
      }}
    >
      <View style={{ height: 140, backgroundColor: tamagnColors.surfaceContainerHigh, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 48 }}>📦</Text>
        <View style={{ position: "absolute", top: tamagnSpacing.sm, left: tamagnSpacing.sm }}>
          <View style={{ backgroundColor: tamagnColors.surfaceContainerLowest, borderRadius: tamagnRadius.pill, paddingHorizontal: 10, paddingVertical: 3 }}>
            <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{category}</Text>
          </View>
        </View>
      </View>
      <View style={{ padding: tamagnSpacing.md }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface }} numberOfLines={1}>{title}</Text>
            <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginTop: 2 }}>{merchantName}</Text>
          </View>
          <Text style={{ ...tamagnTypography.price, color: tamagnColors.primary }}>ETB {price}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: tamagnSpacing.sm }}>
          <TrustBadge tier={tier} score={trustScore} />
          <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>⭐ {rating.toFixed(1)}</Text>
        </View>
        <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginTop: 6 }}>
          {distanceKm.toFixed(1)} km · {etaMinutes} min
        </Text>
      </View>
    </Pressable>
  );
}
