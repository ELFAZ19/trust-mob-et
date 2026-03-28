import React from "react";
import { Pressable, Text, View } from "react-native";
import { SectionCard } from "../../components/SectionCard";
import { TamagnScreen } from "../../components/TamagnScreen";
import { EmptyState } from "../../components/EmptyState";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography } from "../../core/theme/tokens";
import type { Order, OrderStatus } from "../../core/types/domain";

const statusConfig: Record<OrderStatus, { color: string; bg: string; label: string }> = {
  placed: { color: "#6D5E00", bg: "#FFF8E1", label: "Placed" },
  confirmed: { color: tamagnColors.primary, bg: "#E8F5E9", label: "Confirmed" },
  preparing: { color: "#E65100", bg: "#FFF3E0", label: "Preparing" },
  readyForPickup: { color: "#1565C0", bg: "#E3F2FD", label: "Ready" },
  pickedUp: { color: "#6A1B9A", bg: "#F3E5F5", label: "Picked Up" },
  inTransit: { color: "#00838F", bg: "#E0F7FA", label: "In Transit" },
  delivered: { color: tamagnColors.primary, bg: tamagnColors.primaryFixed, label: "Delivered" },
  disputed: { color: tamagnColors.error, bg: tamagnColors.errorContainer, label: "Disputed" },
  cancelled: { color: "#616161", bg: "#F5F5F5", label: "Cancelled" },
};

const demoOrders: Order[] = [
  {
    id: "ORD-1001",
    buyerId: "b1",
    merchantId: "m1",
    merchantName: "Selam Foods",
    items: [{ listingId: "p1", title: "Fresh Injera Pack", price: 180, quantity: 2, merchantName: "Selam Foods" }],
    status: "inTransit",
    subtotal: 360,
    deliveryFee: 80,
    platformFee: 7,
    total: 447,
    escrow: { orderId: "ORD-1001", state: "held", amount: 447 },
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "ORD-1000",
    buyerId: "b1",
    merchantId: "m3",
    merchantName: "Harar Beans",
    items: [{ listingId: "p2", title: "Organic Ethiopian Coffee", price: 450, quantity: 1, merchantName: "Harar Beans" }],
    status: "delivered",
    subtotal: 450,
    deliveryFee: 80,
    platformFee: 9,
    total: 539,
    escrow: { orderId: "ORD-1000", state: "released", amount: 539 },
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 82800000).toISOString(),
  },
];

export function OrdersListScreen({ navigation }: { navigation: any }): JSX.Element {
  if (demoOrders.length === 0) {
    return (
      <TamagnScreen title="My Orders">
        <EmptyState icon="📦" title="No orders yet" subtitle="Start shopping to see your orders here" />
      </TamagnScreen>
    );
  }

  return (
    <TamagnScreen title="My Orders" subtitle={`${demoOrders.length} orders`}>
      {demoOrders.map((order) => {
        const s = statusConfig[order.status];
        return (
          <SectionCard key={order.id} onPress={() => navigation.navigate("OrderDetail", { order })}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface }}>{order.id}</Text>
                  <View style={{ backgroundColor: s.bg, borderRadius: tamagnRadius.pill, paddingHorizontal: 8, paddingVertical: 2 }}>
                    <Text style={{ fontSize: 11, fontWeight: "700", color: s.color }}>{s.label}</Text>
                  </View>
                </View>
                <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginTop: 4 }}>{order.merchantName}</Text>
                <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>
                  {order.items.length} item{order.items.length > 1 ? "s" : ""} · {new Date(order.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ ...tamagnTypography.price, color: tamagnColors.primary }}>ETB {order.total}</Text>
                <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginTop: 2 }}>
                  Escrow: {order.escrow.state}
                </Text>
              </View>
            </View>
          </SectionCard>
        );
      })}
    </TamagnScreen>
  );
}
