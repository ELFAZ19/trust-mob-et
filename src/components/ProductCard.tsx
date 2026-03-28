import React from "react";
import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
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
  onAddToCart?: () => void;
}

const categoryEmoji: Record<string, string> = {
  Food: "🍲",
  Coffee: "☕",
  Spices: "🌶️",
  Clothing: "👕",
  Electronics: "📱",
  Home: "🏠",
};

export function ProductCard({
  title, merchantName, price, rating, trustScore, distanceKm, etaMinutes, category, onPress, onAddToCart,
}: ProductCardProps): JSX.Element {
  const tier = getTrustTier(trustScore);
  return (
    <Pressable onPress={onPress} style={{ borderRadius: tamagnRadius.xxl, backgroundColor: tamagnColors.surfaceContainerLowest, overflow: "hidden", marginBottom: tamagnSpacing.md, ...tamagnShadow }}>
      {/* Image Area */}
      <View style={{ height: 160, backgroundColor: tamagnColors.surfaceContainerHigh, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 56 }}>{categoryEmoji[category] ?? "📦"}</Text>
        {/* Verified Badge */}
        <View style={{ position: "absolute", top: tamagnSpacing.sm, left: tamagnSpacing.sm }}>
          <TrustBadge tier={tier} label={tier === "Gold" ? "Verified Merchant" : tier === "Silver" ? "Trusted" : "New Seller"} />
        </View>
        {/* Rating */}
        <View style={{ position: "absolute", top: tamagnSpacing.sm, right: tamagnSpacing.sm, flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: "rgba(255,220,195,0.9)", paddingHorizontal: 8, paddingVertical: 3, borderRadius: tamagnRadius.sm }}>
          <Text style={{ fontSize: 12, color: tamagnColors.tertiary }}>★</Text>
          <Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.tertiary }}>{rating.toFixed(1)}</Text>
        </View>
      </View>
      {/* Content */}
      <View style={{ padding: tamagnSpacing.md }}>
        <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface }} numberOfLines={1}>{title}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 }}>
          <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>📍 {distanceKm.toFixed(1)} km</Text>
          <Text style={{ color: tamagnColors.outlineVariant }}>·</Text>
          <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{merchantName}</Text>
        </View>
        {/* Price + Add */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: tamagnSpacing.sm }}>
          <View>
            <Text style={{ ...tamagnTypography.labelSm, color: tamagnColors.secondary }}>PRICE</Text>
            <Text style={{ ...tamagnTypography.priceLarge, color: tamagnColors.primary }}>{price.toLocaleString()} ETB</Text>
          </View>
          {onAddToCart ? (
            <Pressable onPress={(e) => { e.stopPropagation?.(); onAddToCart(); }} style={{ width: 48, height: 48, borderRadius: tamagnRadius.lg, backgroundColor: tamagnColors.primaryContainer, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 22, color: tamagnColors.onPrimaryContainer }}>+</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
