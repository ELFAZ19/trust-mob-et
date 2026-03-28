import React from "react";
import { Pressable, Text, View } from "react-native";
import { SectionCard } from "../../components/SectionCard";
import { TamagnButton } from "../../components/TamagnButton";
import { TamagnScreen } from "../../components/TamagnScreen";
import { EmptyState } from "../../components/EmptyState";
import { QuantityStepper } from "../../components/QuantityStepper";
import { useCart } from "../../core/cart/CartContext";
import { tamagnColors, tamagnSpacing, tamagnTypography } from "../../core/theme/tokens";

const DELIVERY_FEE = 80;
const PLATFORM_FEE_RATE = 0.02;

export function CartScreen({ navigation }: { navigation: any }): JSX.Element {
  const { items, subtotal, itemCount, updateQuantity, removeItem, clearCart } = useCart();

  const platformFee = Math.round(subtotal * PLATFORM_FEE_RATE);
  const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + platformFee + deliveryFee;

  if (items.length === 0) {
    return (
      <TamagnScreen title="Cart">
        <EmptyState icon="🛒" title="Your cart is empty" subtitle="Discover products from trusted merchants near you" />
        <TamagnButton title="Browse Products" onPress={() => navigation.navigate("Discovery")} variant="outline" />
      </TamagnScreen>
    );
  }

  return (
    <TamagnScreen title="Cart" subtitle={`${itemCount} items`}>
      {items.map((item) => (
        <SectionCard key={item.listingId}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface }}>{item.title}</Text>
              <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginTop: 2 }}>{item.merchantName}</Text>
              <Text style={{ ...tamagnTypography.price, color: tamagnColors.primary, marginTop: 4 }}>ETB {item.price * item.quantity}</Text>
            </View>
            <View style={{ alignItems: "flex-end", gap: 8 }}>
              <QuantityStepper
                quantity={item.quantity}
                onIncrease={() => updateQuantity(item.listingId, item.quantity + 1)}
                onDecrease={() => updateQuantity(item.listingId, item.quantity - 1)}
              />
              <Pressable onPress={() => removeItem(item.listingId)}>
                <Text style={{ ...tamagnTypography.caption, color: tamagnColors.error }}>Remove</Text>
              </Pressable>
            </View>
          </View>
        </SectionCard>
      ))}

      {/* Fee Breakdown */}
      <SectionCard title="Order Summary">
        <Row label="Subtotal" value={`ETB ${subtotal}`} />
        <Row label="Delivery Fee" value={`ETB ${deliveryFee}`} />
        <Row label="Platform Fee (2%)" value={`ETB ${platformFee}`} />
        <View style={{ height: 1, backgroundColor: tamagnColors.outlineVariant, marginVertical: tamagnSpacing.sm }} />
        <Row label="Total" value={`ETB ${total}`} bold />
      </SectionCard>

      <View style={{ gap: tamagnSpacing.sm }}>
        <TamagnButton title={`Checkout · ETB ${total}`} onPress={() => navigation.navigate("Checkout")} />
        <TamagnButton title="Clear Cart" onPress={clearCart} variant="secondary" />
      </View>
    </TamagnScreen>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
      <Text style={{ ...(bold ? tamagnTypography.bodyBold : tamagnTypography.body), color: tamagnColors.onSurface }}>{label}</Text>
      <Text style={{ ...(bold ? tamagnTypography.price : tamagnTypography.bodyBold), color: bold ? tamagnColors.primary : tamagnColors.onSurface }}>{value}</Text>
    </View>
  );
}
