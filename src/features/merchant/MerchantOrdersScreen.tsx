import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SectionCard } from "../../components/SectionCard";
import { TamagnButton } from "../../components/TamagnButton";
import { TamagnScreen } from "../../components/TamagnScreen";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography } from "../../core/theme/tokens";
import type { OrderStatus } from "../../core/types/domain";

interface MerchantOrder {
  id: string;
  buyerName: string;
  items: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  placed: "confirmed",
  confirmed: "preparing",
  preparing: "readyForPickup",
};

const statusLabels: Record<string, { emoji: string; text: string }> = {
  placed: { emoji: "🟡", text: "New Order" },
  confirmed: { emoji: "🟢", text: "Confirmed" },
  preparing: { emoji: "🔵", text: "Preparing" },
  readyForPickup: { emoji: "📦", text: "Ready for Pickup" },
  pickedUp: { emoji: "🚚", text: "Picked Up" },
  inTransit: { emoji: "🛵", text: "In Transit" },
  delivered: { emoji: "✅", text: "Delivered" },
};

const initialOrders: MerchantOrder[] = [
  { id: "ORD-2001", buyerName: "Abebe T.", items: "Fresh Injera Pack ×3", total: 540, status: "placed", createdAt: new Date(Date.now() - 300000).toISOString() },
  { id: "ORD-2002", buyerName: "Sara M.", items: "Berbere Spice Mix ×1", total: 250, status: "confirmed", createdAt: new Date(Date.now() - 1200000).toISOString() },
  { id: "ORD-2003", buyerName: "Yohannes K.", items: "Organic Coffee ×2", total: 900, status: "preparing", createdAt: new Date(Date.now() - 2400000).toISOString() },
  { id: "ORD-2000", buyerName: "Hana D.", items: "Roasted Coffee Bundle ×1", total: 320, status: "delivered", createdAt: new Date(Date.now() - 86400000).toISOString() },
];

export function MerchantOrdersScreen(): JSX.Element {
  const [orders, setOrders] = useState(initialOrders);

  function advanceOrder(orderId: string) {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const next = nextStatus[o.status];
        if (!next) return o;
        Alert.alert("Status Updated", `${o.id} → ${statusLabels[next]?.text ?? next}`);
        return { ...o, status: next };
      })
    );
  }

  const active = orders.filter((o) => o.status !== "delivered" && o.status !== "cancelled");
  const completed = orders.filter((o) => o.status === "delivered");

  return (
    <TamagnScreen title="Orders" subtitle={`${active.length} active · ${completed.length} completed`}>
      {/* Active */}
      {active.length > 0 ? (
        <>
          <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.onSurface, marginBottom: tamagnSpacing.sm }}>Active Orders</Text>
          {active.map((order) => {
            const sl = statusLabels[order.status];
            const canAdvance = !!nextStatus[order.status];
            return (
              <SectionCard key={order.id}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                      <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface }}>{order.id}</Text>
                      <View style={{ backgroundColor: tamagnColors.surfaceContainerLow, borderRadius: tamagnRadius.pill, paddingHorizontal: 8, paddingVertical: 2 }}>
                        <Text style={{ fontSize: 11, fontWeight: "700" }}>{sl?.emoji} {sl?.text}</Text>
                      </View>
                    </View>
                    <Text style={{ ...tamagnTypography.body, color: tamagnColors.onSurface, marginTop: 4 }}>{order.buyerName}</Text>
                    <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{order.items}</Text>
                    <Text style={{ ...tamagnTypography.price, color: tamagnColors.primary, marginTop: 4 }}>ETB {order.total}</Text>
                  </View>
                </View>
                {canAdvance ? (
                  <View style={{ marginTop: tamagnSpacing.sm }}>
                    <TamagnButton
                      title={`Mark as ${statusLabels[nextStatus[order.status]!]?.text ?? "Next"}`}
                      onPress={() => advanceOrder(order.id)}
                      fullWidth
                    />
                  </View>
                ) : null}
              </SectionCard>
            );
          })}
        </>
      ) : null}

      {/* Completed */}
      {completed.length > 0 ? (
        <>
          <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.onSurface, marginTop: tamagnSpacing.md, marginBottom: tamagnSpacing.sm }}>
            Completed
          </Text>
          {completed.map((order) => (
            <SectionCard key={order.id}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                  <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface }}>{order.id}</Text>
                  <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{order.buyerName} · {order.items}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.primary }}>ETB {order.total}</Text>
                  <Text style={{ ...tamagnTypography.caption, color: tamagnColors.primary }}>✅ Delivered</Text>
                </View>
              </View>
            </SectionCard>
          ))}
        </>
      ) : null}
    </TamagnScreen>
  );
}
