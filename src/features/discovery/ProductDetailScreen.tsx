import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SectionCard } from "../../components/SectionCard";
import { TamagnButton } from "../../components/TamagnButton";
import { TrustBadge } from "../../components/TrustBadge";
import { QuantityStepper } from "../../components/QuantityStepper";
import { useCart } from "../../core/cart/CartContext";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography } from "../../core/theme/tokens";
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
      addItem({
        listingId: product.id,
        title: product.title,
        price: product.price,
        merchantName: product.merchantName,
      });
    }
    Alert.alert("Added to Cart", `${qty}x ${product.title}`);
  }

  return (
    <View style={{ flex: 1, backgroundColor: tamagnColors.surface }}>
      {/* Hero Image */}
      <View style={{ height: 220, backgroundColor: tamagnColors.surfaceContainerHigh, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 72 }}>📦</Text>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", top: insets.top + 8, left: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.9)", justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20 }}>←</Text>
        </Pressable>
        <View style={{ position: "absolute", top: insets.top + 8, right: 16 }}>
          <View style={{ backgroundColor: tamagnColors.surfaceContainerLowest, borderRadius: tamagnRadius.pill, paddingHorizontal: 10, paddingVertical: 4 }}>
            <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{product.category}</Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <View style={{ flex: 1, padding: tamagnSpacing.md, marginTop: -tamagnSpacing.lg, borderTopLeftRadius: tamagnRadius.xl, borderTopRightRadius: tamagnRadius.xl, backgroundColor: tamagnColors.surface }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: tamagnSpacing.md }}>
          <View style={{ flex: 1 }}>
            <Text style={{ ...tamagnTypography.screenTitle, color: tamagnColors.onSurface }}>{product.title}</Text>
            <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondary, marginTop: 4 }}>{product.merchantName}</Text>
          </View>
          <Text style={{ ...tamagnTypography.priceLarge, color: tamagnColors.primary }}>ETB {product.price}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: tamagnSpacing.md }}>
          <TrustBadge tier={tier} score={product.trustScore} size="md" />
          <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondary }}>⭐ {product.rating.toFixed(1)} ({product.reviewCount})</Text>
        </View>

        <SectionCard title="About this product">
          <Text style={{ ...tamagnTypography.body, color: tamagnColors.onSurface }}>{product.description}</Text>
          <View style={{ flexDirection: "row", gap: 16, marginTop: tamagnSpacing.sm }}>
            <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>📍 {product.distanceKm.toFixed(1)} km</Text>
            <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>⏱️ ~{product.etaMinutes} min</Text>
          </View>
        </SectionCard>

        <SectionCard title="Merchant Trust">
          <View style={{ flexDirection: "row", gap: 16 }}>
            <View>
              <Text style={{ ...tamagnTypography.stat, color: tamagnColors.primary }}>{product.trustScore}</Text>
              <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>Trust Score</Text>
            </View>
            <View>
              <Text style={{ ...tamagnTypography.stat, color: tamagnColors.onSurface }}>{product.rating.toFixed(1)}</Text>
              <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>Rating</Text>
            </View>
            <View>
              <Text style={{ ...tamagnTypography.stat, color: tamagnColors.onSurface }}>{product.reviewCount}</Text>
              <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>Reviews</Text>
            </View>
          </View>
        </SectionCard>

        {/* Quantity + Add to Cart */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: tamagnSpacing.sm }}>
          <QuantityStepper quantity={qty} onIncrease={() => setQty((q) => q + 1)} onDecrease={() => setQty((q) => Math.max(1, q - 1))} />
          <View style={{ flex: 1, marginLeft: tamagnSpacing.md }}>
            <TamagnButton title={`Add to Cart · ETB ${product.price * qty}`} onPress={handleAddToCart} />
          </View>
        </View>
      </View>
    </View>
  );
}
