import React from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TamagnScreen } from "../../components/TamagnScreen";
import { EmptyState } from "../../components/EmptyState";
import { QuantityStepper } from "../../components/QuantityStepper";
import { useCart } from "../../core/cart/CartContext";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography, tamagnShadow, GRADIENT_PRIMARY } from "../../core/theme/tokens";

const DELIVERY_FEE = 75;
const PLATFORM_FEE_PCT = 0.03;

export function CartScreen({ navigation }: { navigation: any }): JSX.Element {
  const { items, removeItem, updateQuantity, itemCount, subtotal } = useCart();
  const insets = useSafeAreaInsets();
  const platformFee = Math.round(subtotal * PLATFORM_FEE_PCT);
  const total = subtotal + DELIVERY_FEE + platformFee;

  if (itemCount === 0) {
    return (
      <TamagnScreen title="Cart">
        <EmptyState icon="🛒" title="Your cart is empty" subtitle="Discover trusted products and add them here" />
      </TamagnScreen>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: tamagnColors.surface }}>
      <TamagnScreen title="Cart" subtitle={`${itemCount} items`}>
        {/* Cart Items */}
        {items.map((item) => (
          <View
            key={item.listingId}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              padding: tamagnSpacing.md,
              marginBottom: tamagnSpacing.sm,
              backgroundColor: tamagnColors.surfaceContainerLowest,
              borderRadius: tamagnRadius.xl,
              ...tamagnShadow,
            }}
          >
            <View style={{ width: 56, height: 56, borderRadius: tamagnRadius.md, backgroundColor: tamagnColors.surfaceContainerHigh, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 26 }}>📦</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface }} numberOfLines={1}>{item.title}</Text>
              <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{item.merchantName}</Text>
              <Text style={{ ...tamagnTypography.price, color: tamagnColors.primary, marginTop: 2 }}>{(item.price * item.quantity).toLocaleString()} ETB</Text>
            </View>
            <View style={{ alignItems: "center", gap: 8 }}>
              <QuantityStepper
                quantity={item.quantity}
                onIncrease={() => updateQuantity(item.listingId, item.quantity + 1)}
                onDecrease={() => item.quantity === 1 ? removeItem(item.listingId) : updateQuantity(item.listingId, item.quantity - 1)}
              />
              <Pressable onPress={() => removeItem(item.listingId)}>
                <Text style={{ ...tamagnTypography.caption, color: tamagnColors.error }}>Remove</Text>
              </Pressable>
            </View>
          </View>
        ))}

        {/* Summary */}
        <View style={{ backgroundColor: tamagnColors.surfaceContainerLowest, borderRadius: tamagnRadius.xl, padding: tamagnSpacing.lg, marginTop: tamagnSpacing.md, ...tamagnShadow }}>
          <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface, marginBottom: tamagnSpacing.md }}>Order Summary</Text>
          <Row label="Subtotal" value={`${subtotal.toLocaleString()} ETB`} />
          <Row label="Delivery Fee" value={`${DELIVERY_FEE} ETB`} />
          <Row label="Platform Fee (3%)" value={`${platformFee} ETB`} />
          <View style={{ height: 1, backgroundColor: tamagnColors.surfaceContainerHigh, marginVertical: tamagnSpacing.sm }} />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }}>Total</Text>
            <Text style={{ ...tamagnTypography.priceLarge, color: tamagnColors.primary }}>{total.toLocaleString()} ETB</Text>
          </View>
        </View>

        {/* Escrow Badge */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "rgba(1,110,0,0.05)", borderRadius: tamagnRadius.lg, padding: tamagnSpacing.md, marginTop: tamagnSpacing.md }}>
          <Text style={{ fontSize: 20 }}>🛡️</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.primary }}>Escrow Protected</Text>
            <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>Funds held safely until you confirm delivery</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </TamagnScreen>

      {/* Fixed Bottom CTA */}
      <View style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: tamagnSpacing.lg,
        paddingTop: tamagnSpacing.md,
        paddingBottom: insets.bottom + tamagnSpacing.md,
        backgroundColor: "rgba(255,255,255,0.95)",
        borderTopLeftRadius: tamagnRadius.xl,
        borderTopRightRadius: tamagnRadius.xl,
      }}>
        <Pressable onPress={() => navigation.navigate("Checkout")}>
          <LinearGradient
            colors={[...GRADIENT_PRIMARY]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: tamagnRadius.lg, paddingVertical: 18, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }}
          >
            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 16 }}>Proceed to Checkout</Text>
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>· {total.toLocaleString()} ETB</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
      <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondary }}>{label}</Text>
      <Text style={{ ...tamagnTypography.bodyMedium, color: tamagnColors.onSurface }}>{value}</Text>
    </View>
  );
}
