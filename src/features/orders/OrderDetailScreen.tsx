import React from "react";
import { Alert, Text, View } from "react-native";
import { SectionCard } from "../../components/SectionCard";
import { TamagnButton } from "../../components/TamagnButton";
import { TamagnScreen } from "../../components/TamagnScreen";
import { tamagnColors, tamagnSpacing, tamagnTypography } from "../../core/theme/tokens";
import type { Order } from "../../core/types/domain";

const timelineSteps = ["placed", "confirmed", "preparing", "readyForPickup", "pickedUp", "inTransit", "delivered"] as const;

export function OrderDetailScreen({ route }: { route: any }): JSX.Element {
  const order: Order = route.params.order;
  const currentIdx = timelineSteps.indexOf(order.status as typeof timelineSteps[number]);

  return (
    <TamagnScreen title={`Order ${order.id}`} subtitle={order.merchantName}>
      {/* Status Timeline */}
      <SectionCard title="Delivery Progress">
        {timelineSteps.map((step, idx) => {
          const isPast = idx <= currentIdx;
          const isCurrent = idx === currentIdx;
          return (
            <View key={step} style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: idx < timelineSteps.length - 1 ? 0 : 0 }}>
              <View style={{ alignItems: "center", marginRight: 12 }}>
                <View style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: isPast ? tamagnColors.primary : tamagnColors.surfaceContainer,
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                  {isPast ? <Text style={{ color: "#fff", fontSize: 10, fontWeight: "800" }}>✓</Text> : null}
                </View>
                {idx < timelineSteps.length - 1 ? (
                  <View style={{ width: 2, height: 24, backgroundColor: isPast ? tamagnColors.primary : tamagnColors.surfaceContainer }} />
                ) : null}
              </View>
              <View style={{ paddingBottom: 12 }}>
                <Text style={{
                  ...tamagnTypography.bodyBold,
                  color: isCurrent ? tamagnColors.primary : isPast ? tamagnColors.onSurface : tamagnColors.secondary,
                }}>
                  {formatStep(step)}
                </Text>
              </View>
            </View>
          );
        })}
      </SectionCard>

      {/* Items */}
      <SectionCard title="Items">
        {order.items.map((item) => (
          <View key={item.listingId} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
            <Text style={{ ...tamagnTypography.body, color: tamagnColors.onSurface }}>{item.title} × {item.quantity}</Text>
            <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }}>ETB {item.price * item.quantity}</Text>
          </View>
        ))}
      </SectionCard>

      {/* Payment */}
      <SectionCard title="Payment">
        <Row label="Subtotal" value={`ETB ${order.subtotal}`} />
        <Row label="Delivery" value={`ETB ${order.deliveryFee}`} />
        <Row label="Platform Fee" value={`ETB ${order.platformFee}`} />
        <View style={{ height: 1, backgroundColor: tamagnColors.outlineVariant, marginVertical: tamagnSpacing.sm }} />
        <Row label="Total" value={`ETB ${order.total}`} bold />
      </SectionCard>

      {/* Escrow */}
      <SectionCard title="🛡️ Escrow Status">
        <Text style={{ ...tamagnTypography.body, color: tamagnColors.onSurface }}>
          State: <Text style={{ fontWeight: "700" }}>{order.escrow.state.toUpperCase()}</Text>
        </Text>
        <Text style={{ ...tamagnTypography.body, color: tamagnColors.onSurface }}>
          Amount: <Text style={{ fontWeight: "700" }}>ETB {order.escrow.amount}</Text>
        </Text>
      </SectionCard>

      {/* Actions */}
      {order.status === "delivered" ? (
        <View style={{ gap: tamagnSpacing.sm }}>
          <TamagnButton title="Confirm Delivery & Release Payment" onPress={() => Alert.alert("Payment Released", "Funds sent to merchant.")} />
          <TamagnButton title="Report Issue" onPress={() => Alert.alert("Dispute Filed", "Our team will review within 24h.")} variant="danger" />
        </View>
      ) : order.status === "inTransit" ? (
        <TamagnButton title="Contact Courier" onPress={() => Alert.alert("Support", "Courier notified.")} variant="outline" />
      ) : null}
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

function formatStep(step: string): string {
  return step
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase());
}
