import React, { useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../../components/Icon";
import { SectionCard } from "../../components/SectionCard";
import { TrustBadge } from "../../components/TrustBadge";
import { QuantityStepper } from "../../components/QuantityStepper";
import { useCart } from "../../core/cart/CartContext";
import { getProductImage, getMerchantImage } from "../../core/constants/images";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography, tamagnShadow, GRADIENT_PRIMARY } from "../../core/theme/tokens";
import { getTrustTier } from "../trust/trustRanking";
import type { MarketplaceCard } from "../../core/types/domain";

export function ProductDetailScreen({ route, navigation }: { route: any; navigation: any }): JSX.Element {
  const product: MarketplaceCard = route.params.product;
  const insets = useSafeAreaInsets();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const tier = getTrustTier(product.trustScore);

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) {
      addItem({ listingId: product.id, title: product.title, price: product.price, merchantName: product.merchantName });
    }
    Alert.alert("Added to Cart", `${qty}× ${product.title}`);
  }

  return (
    <View style={{ flex: 1, backgroundColor: tamagnColors.surface }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={{ height: 300, overflow: "hidden" }}>
          <Image source={{ uri: getProductImage(product.category) }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
          {/* Gradient overlay at bottom */}
          <LinearGradient colors={["transparent", "rgba(0,0,0,0.3)"]} style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80 }} />
          {/* Back button */}
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", top: insets.top + 8, left: 16, width: 42, height: 42, borderRadius: 21, backgroundColor: "rgba(255,255,255,0.9)", justifyContent: "center", alignItems: "center", ...tamagnShadow }}
          >
            <Icon name="back" size={20} color={tamagnColors.onSurface} />
          </Pressable>
          {/* Share + Favorite */}
          <View style={{ position: "absolute", top: insets.top + 8, right: 16, flexDirection: "row", gap: 8 }}>
            <Pressable style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: "rgba(255,255,255,0.9)", justifyContent: "center", alignItems: "center" }}>
              <Icon name="share" size={18} color={tamagnColors.onSurface} />
            </Pressable>
            <Pressable style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: "rgba(255,255,255,0.9)", justifyContent: "center", alignItems: "center" }}>
              <Icon name="heart-outline" size={18} color={tamagnColors.error} />
            </Pressable>
          </View>
          {/* Verified badge */}
          <View style={{ position: "absolute", bottom: 16, left: 16 }}>
            <TrustBadge tier={tier} label={tier === "Gold" ? "Verified Merchant" : tier === "Silver" ? "Trusted" : "New Seller"} size="md" />
          </View>
        </View>

        {/* Content */}
        <View style={{ padding: tamagnSpacing.lg, marginTop: -tamagnSpacing.lg, borderTopLeftRadius: tamagnRadius.xl, borderTopRightRadius: tamagnRadius.xl, backgroundColor: tamagnColors.surface }}>
          {/* Title + Price */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: tamagnSpacing.md }}>
            <View style={{ flex: 1, marginRight: 16 }}>
              <Text style={{ ...tamagnTypography.screenTitle, color: tamagnColors.onSurface }}>{product.title}</Text>
              <Text style={{ ...tamagnTypography.bodyMedium, color: tamagnColors.secondary, marginTop: 4 }}>{product.merchantName}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ ...tamagnTypography.labelSm, color: tamagnColors.secondary }}>PRICE</Text>
              <Text style={{ ...tamagnTypography.priceLarge, color: tamagnColors.primary }}>{product.price.toLocaleString()} ETB</Text>
            </View>
          </View>

          {/* Rating + Distance + ETA */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 14, marginBottom: tamagnSpacing.lg }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "rgba(255,220,195,0.5)", paddingHorizontal: 10, paddingVertical: 5, borderRadius: tamagnRadius.sm }}>
              <Icon name="star" size={14} color={tamagnColors.tertiary} />
              <Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.tertiary }}>{product.rating.toFixed(1)}</Text>
              <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>({product.reviewCount})</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Icon name="location" size={14} color={tamagnColors.secondary} />
              <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{product.distanceKm.toFixed(1)} km</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Icon name="clock" size={14} color={tamagnColors.secondary} />
              <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>~{product.etaMinutes} min</Text>
            </View>
          </View>

          {/* Description */}
          <SectionCard title="About this product">
            <Text style={{ ...tamagnTypography.body, color: tamagnColors.onSurface, lineHeight: 22 }}>{product.description}</Text>
          </SectionCard>

          {/* Merchant Trust */}
          <SectionCard title="Merchant Trust Profile">
            <View style={{ flexDirection: "row", alignItems: "center", gap: 14, marginBottom: tamagnSpacing.md }}>
              <View style={{ width: 52, height: 52, borderRadius: tamagnRadius.md, overflow: "hidden" }}>
                <Image source={{ uri: getMerchantImage(0) }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }}>{product.merchantName}</Text>
                <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>Gold Verified · Since 2024</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ ...tamagnTypography.stat, color: tamagnColors.primary }}>{product.trustScore}</Text>
                <Text style={{ ...tamagnTypography.label, color: tamagnColors.secondary }}>TRUST</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ ...tamagnTypography.stat, color: tamagnColors.onSurface }}>{product.rating.toFixed(1)}</Text>
                <Text style={{ ...tamagnTypography.label, color: tamagnColors.secondary }}>RATING</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ ...tamagnTypography.stat, color: tamagnColors.onSurface }}>{product.reviewCount}</Text>
                <Text style={{ ...tamagnTypography.label, color: tamagnColors.secondary }}>REVIEWS</Text>
              </View>
            </View>
          </SectionCard>

          {/* Escrow Info */}
          <SectionCard accent={tamagnColors.primary}>
            <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
              <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(1,110,0,0.08)", justifyContent: "center", alignItems: "center" }}>
                <Icon name="verified" size={22} color={tamagnColors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.primary }}>Escrow Protected</Text>
                <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>Payment held safely until delivery confirmed</Text>
              </View>
            </View>
          </SectionCard>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(255,255,255,0.95)",
        paddingHorizontal: tamagnSpacing.lg,
        paddingTop: tamagnSpacing.md,
        paddingBottom: insets.bottom + tamagnSpacing.md,
        borderTopLeftRadius: tamagnRadius.xl,
        borderTopRightRadius: tamagnRadius.xl,
        ...tamagnShadow,
      }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <QuantityStepper quantity={qty} onIncrease={() => setQty((q) => q + 1)} onDecrease={() => setQty((q) => Math.max(1, q - 1))} />
          <Pressable onPress={handleAddToCart} style={{ flex: 1 }}>
            <LinearGradient
              colors={[...GRADIENT_PRIMARY]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: tamagnRadius.lg, paddingVertical: 16, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 }}
            >
              <Icon name="add-cart" size={18} color="#fff" />
              <Text style={{ color: "#fff", fontWeight: "900", fontSize: 15 }}>Add · {(product.price * qty).toLocaleString()} ETB</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
