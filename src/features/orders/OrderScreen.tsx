import React, { useMemo, useState } from "react";
import { Alert, Text } from "react-native";
import { SectionCard } from "../../components/SectionCard";
import { TamagnButton } from "../../components/TamagnButton";
import { TamagnScreen } from "../../components/TamagnScreen";
import { useAuth } from "../../core/auth/AuthContext";
import { tamagnColors } from "../../core/theme/tokens";
import type { CartItem } from "../../core/types/domain";
import { calculateOrderSummary, createOrderWithEscrow } from "./orderApi";

const starterCart: CartItem[] = [
  { listingId: "p-1", quantity: 2, unitPrice: 180 },
  { listingId: "p-4", quantity: 1, unitPrice: 320 }
];

export function OrderScreen(): JSX.Element {
  const { profile } = useAuth();
  const [cartItems] = useState<CartItem[]>(starterCart);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);
  const [escrowState, setEscrowState] = useState<string | null>(null);

  const summary = useMemo(() => calculateOrderSummary(cartItems), [cartItems]);

  async function submitOrder() {
    if (!profile) {
      return;
    }

    setIsSubmitting(true);
    const orderResult = await createOrderWithEscrow(profile.id, cartItems);
    setIsSubmitting(false);
    setLastOrderId(orderResult.orderId);
    setEscrowState(orderResult.escrow.state);
    Alert.alert("Order Created", `Escrow is ${orderResult.escrow.state.toUpperCase()}`);
  }

  return (
    <TamagnScreen title="Review your order" subtitle="Escrow-protected checkout via M-Pesa.">

      <SectionCard title="Cart Summary">
        {cartItems.map((item) => (
          <Text key={item.listingId}>
            {item.listingId} • Qty {item.quantity} • ETB {item.unitPrice}
          </Text>
        ))}
      </SectionCard>

      <SectionCard title="Fees Breakdown">
        <Text>Subtotal: ETB {summary.subtotal}</Text>
        <Text>Delivery fee: ETB {summary.deliveryFee}</Text>
        <Text>Platform fee: ETB {summary.platformFee}</Text>
        <Text style={{ marginTop: 8, fontWeight: "700" }}>Total: ETB {summary.total}</Text>
      </SectionCard>

      <SectionCard title="Escrow Payment">
        <Text>Payment goes to platform escrow until successful delivery confirmation.</Text>
        <Text style={{ marginTop: 8, color: tamagnColors.secondary }}>
          M-Pesa intent and escrow transition are handled through backend Edge Functions.
        </Text>
      </SectionCard>

      <TamagnButton
        title={isSubmitting ? "Submitting..." : "Confirm Order"}
        onPress={submitOrder}
        disabled={isSubmitting}
      />

      {lastOrderId ? (
        <SectionCard title="Latest Order">
          <Text>Order ID: {lastOrderId}</Text>
          <Text>Escrow state: {escrowState}</Text>
        </SectionCard>
      ) : null}
    </TamagnScreen>
  );
}
