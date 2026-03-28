import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Icon } from "./Icon";
import { TrustBadge } from "./TrustBadge";
import { getTrustTier } from "../features/trust/trustRanking";
import { getProductImage } from "../core/constants/images";
import { tamagnColors, tamagnRadius, tamagnShadow, tamagnSpacing, tamagnTypography } from "../core/theme/tokens";

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

export function ProductCard({
  title, merchantName, price, rating, trustScore, distanceKm, etaMinutes, category, onPress, onAddToCart,
}: ProductCardProps): JSX.Element {
  const tier = getTrustTier(trustScore);
  return (
    <Pressable onPress={onPress} style={{ borderRadius: tamagnRadius.xxl, backgroundColor: tamagnColors.surfaceContainerLowest, overflow: "hidden", marginBottom: tamagnSpacing.md, ...tamagnShadow }}>
      {/* Image Area */}
      <View style={{ height: 180, overflow: "hidden" }}>
        <Image source={{ uri: getProductImage(category) }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
        {/* Verified Badge */}
        <View style={{ position: "absolute", top: tamagnSpacing.sm, left: tamagnSpacing.sm }}>
          <TrustBadge tier={tier} label={tier === "Gold" ? "Verified Merchant" : tier === "Silver" ? "Trusted" : "New Seller"} />
        </View>
        {/* Favorite */}
        <Pressable style={{ position: "absolute", top: tamagnSpacing.sm, right: tamagnSpacing.sm, width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.85)", justifyContent: "center", alignItems: "center" }}>
          <Icon name="heart-outline" size={18} color={tamagnColors.secondary} />
        </Pressable>
        {/* Rating */}
        <View style={{ position: "absolute", bottom: tamagnSpacing.sm, right: tamagnSpacing.sm, flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: "rgba(255,220,195,0.9)", paddingHorizontal: 8, paddingVertical: 3, borderRadius: tamagnRadius.sm }}>
          <Icon name="star" size={12} color={tamagnColors.tertiary} />
          <Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.tertiary }}>{rating.toFixed(1)}</Text>
        </View>
      </View>
      {/* Content */}
      <View style={{ padding: tamagnSpacing.md }}>
        <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface }} numberOfLines={1}>{title}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 }}>
          <Icon name="location" size={12} color={tamagnColors.secondary} />
          <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{distanceKm.toFixed(1)} km</Text>
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
              <Icon name="add-cart" size={22} color={tamagnColors.onPrimaryContainer} />
            </Pressable>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
