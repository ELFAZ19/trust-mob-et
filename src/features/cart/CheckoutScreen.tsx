import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SectionCard } from "../../components/SectionCard";
import { TamagnButton } from "../../components/TamagnButton";
import { TamagnScreen } from "../../components/TamagnScreen";
import { useAuth } from "../../core/auth/AuthContext";
import { useCart } from "../../core/cart/CartContext";
import { tamagnColors, tamagnSpacing, tamagnTypography } from "../../core/theme/tokens";
import { createOrderWithEscrow } from "../orders/orderApi";

const DELIVERY_FEE = 80;
const PLATFORM_FEE_RATE = 0.02;

export function CheckoutScreen({ navigation }: { navigation: any }): JSX.Element {
  const { profile } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const platformFee = Math.round(subtotal * PLATFORM_FEE_RATE);
  const total = subtotal + DELIVERY_FEE + platformFee;

  async function handlePay() {
    if (!profile) return;
    setLoading(true);
    try {
      const legacyItems = items.map((i) => ({ listingId: i.listingId, quantity: i.quantity, unitPrice: i.price }));
      const result = await createOrderWithEscrow(profile.id, legacyItems);
      clearCart();
      Alert.alert(
        "Order Placed!",
        `Your payment of ETB ${total} is held in escrow until delivery is confirmed.\n\nOrder: ${result.orderId}`,
        [{ text: "Track Order", onPress: () => navigation.navigate("OrdersList") }]
      );
    } catch {
      Alert.alert("Error", "Could not place order. Please try again.");
    }
    setLoading(false);
  }

  return (
    <TamagnScreen title="Checkout" subtitle="Secure escrow-protected payment">
      {/* Items Summary */}
      <SectionCard title={`${items.length} items`}>
        {items.map((item) => (
          <View key={item.listingId} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
            <Text style={{ ...tamagnTypography.body, color: tamagnColors.onSurface }}>{item.title} × {item.quantity}</Text>
            <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }}>ETB {item.price * item.quantity}</Text>
          </View>
        ))}
      </SectionCard>

      {/* Payment Breakdown */}
      <SectionCard title="Payment Breakdown">
        <Row label="Subtotal" value={`ETB ${subtotal}`} />
        <Row label="Delivery Fee" value={`ETB ${DELIVERY_FEE}`} />
        <Row label="Platform Fee (2%)" value={`ETB ${platformFee}`} />
        <View style={{ height: 1, backgroundColor: tamagnColors.outlineVariant, marginVertical: tamagnSpacing.sm }} />
        <Row label="Total" value={`ETB ${total}`} bold />
      </SectionCard>

      {/* Escrow Info */}
      <SectionCard title="🛡️ Escrow Protection">
        <Text style={{ ...tamagnTypography.body, color: tamagnColors.onSurface }}>
          Your payment goes to a secure platform escrow. Funds are only released to the merchant after you confirm delivery.
        </Text>
        <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginTop: 8 }}>
          If there's a dispute, funds remain locked for admin resolution.
        </Text>
      </SectionCard>

      {/* Payment Method */}
      <SectionCard title="Payment Method">
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text style={{ fontSize: 28 }}>📱</Text>
          <View>
            <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }}>M-Pesa</Text>
            <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>Mobile money payment</Text>
          </View>
        </View>
      </SectionCard>

      <TamagnButton title={`Pay ETB ${total} via M-Pesa`} onPress={handlePay} loading={loading} />
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
