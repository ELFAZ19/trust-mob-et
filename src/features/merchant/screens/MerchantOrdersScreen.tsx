import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TamagnScreen } from "../../../components/TamagnScreen";
import { Icon } from "../../../components/Icon";
import { EmptyState } from "../../../components/EmptyState";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography, tamagnShadow, GRADIENT_PRIMARY } from "../../../core/theme/tokens";
import { MOCK_MERCHANT_ORDERS, MERCHANT_ORDER_STATUS_FLOW } from "../../../data/mock";
import type { MockMerchantOrder } from "../../../data/mock";

const statusLabels: Record<string, { label: string; color: string; nextAction: string }> = {
  pending: { label: "New Order", color: tamagnColors.tertiary, nextAction: "Accept & Prepare" },
  preparing: { label: "Preparing", color: "#2196F3", nextAction: "Mark as Shipped" },
  shipped: { label: "Shipped", color: "#9C27B0", nextAction: "Awaiting Delivery" },
  delivered: { label: "Delivered", color: tamagnColors.primary, nextAction: "" },
};

export function MerchantOrdersScreen(): JSX.Element {
  const [orders, setOrders] = useState<MockMerchantOrder[]>(MOCK_MERCHANT_ORDERS);

  function advanceStatus(orderId: string) {
    setOrders((prev) => prev.map((o) => {
      if (o.id !== orderId) return o;
      const idx = MERCHANT_ORDER_STATUS_FLOW.indexOf(o.status);
      if (idx < MERCHANT_ORDER_STATUS_FLOW.length - 1) return { ...o, status: MERCHANT_ORDER_STATUS_FLOW[idx + 1] };
      return o;
    }));
    Alert.alert("Updated", "Order status advanced.");
  }

  const active = orders.filter((o) => o.status !== "delivered");
  const completed = orders.filter((o) => o.status === "delivered");

  return (
    <TamagnScreen title="Manage Orders" subtitle={`${active.length} active`}>
      {orders.length === 0 ? (
        <EmptyState icon="package" title="No orders yet" subtitle="When buyers place orders, they'll appear here" />
      ) : (
        <>
          {active.length > 0 ? (
            <>
              <Text style={{ ...tamagnTypography.label, color: tamagnColors.secondary, marginBottom: tamagnSpacing.sm }}>ACTIVE ORDERS</Text>
              {active.map((order) => {
                const sl = statusLabels[order.status];
                return (
                  <View key={order.id} style={{ backgroundColor: tamagnColors.surfaceContainerLowest, borderRadius: tamagnRadius.xl, padding: tamagnSpacing.md, marginBottom: tamagnSpacing.sm, ...tamagnShadow }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                      <View>
                        <Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.secondary }}>{order.id}</Text>
                        <Text style={{ ...tamagnTypography.caption, color: tamagnColors.outlineVariant }}>{order.date}</Text>
                      </View>
                      <View style={{ backgroundColor: sl.color + "18", borderRadius: tamagnRadius.pill, paddingHorizontal: 10, paddingVertical: 4 }}>
                        <Text style={{ ...tamagnTypography.captionBold, color: sl.color }}>{sl.label}</Text>
                      </View>
                    </View>
                    <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface }}>{order.items}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                      <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>Buyer: {order.buyer}</Text>
                      <Text style={{ ...tamagnTypography.price, color: tamagnColors.primary }}>{order.total.toLocaleString()} ETB</Text>
                    </View>
                    {sl.nextAction ? (
                      <Pressable onPress={() => advanceStatus(order.id)} style={{ marginTop: tamagnSpacing.sm }}>
                        <LinearGradient
                          colors={[...GRADIENT_PRIMARY]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={{ borderRadius: tamagnRadius.md, paddingVertical: 12, alignItems: "center" }}
                        >
                          <Text style={{ color: "#fff", fontWeight: "800", fontSize: 13 }}>{sl.nextAction}</Text>
                        </LinearGradient>
                      </Pressable>
                    ) : null}
                  </View>
                );
              })}
            </>
          ) : null}

          {completed.length > 0 ? (
            <>
              <Text style={{ ...tamagnTypography.label, color: tamagnColors.secondary, marginTop: tamagnSpacing.lg, marginBottom: tamagnSpacing.sm }}>COMPLETED</Text>
              {completed.map((order) => (
                <View key={order.id} style={{ backgroundColor: tamagnColors.surfaceContainerLowest, borderRadius: tamagnRadius.xl, padding: tamagnSpacing.md, marginBottom: tamagnSpacing.sm, opacity: 0.7 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                    <Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.secondary }}>{order.id}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                      <Icon name="check" size={14} color={tamagnColors.primary} />
                      <Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.primary }}>Delivered</Text>
                    </View>
                  </View>
                  <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }}>{order.items}</Text>
                  <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginTop: 2 }}>{order.buyer} · {order.total.toLocaleString()} ETB</Text>
                </View>
              ))}
            </>
          ) : null}
        </>
      )}
    </TamagnScreen>
  );
}
