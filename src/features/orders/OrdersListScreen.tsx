import React from "react";
import { Pressable, Text, View } from "react-native";
import { TamagnScreen } from "../../components/TamagnScreen";
import { EmptyState } from "../../components/EmptyState";
import { TrustBadge } from "../../components/TrustBadge";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography, tamagnShadow } from "../../core/theme/tokens";

interface MockOrder {
  id: string;
  items: string;
  total: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  merchantName: string;
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  processing: { label: "Processing", color: tamagnColors.tertiary, bg: "rgba(246,135,0,0.1)" },
  shipped: { label: "In Transit", color: "#2196F3", bg: "rgba(33,150,243,0.1)" },
  delivered: { label: "Delivered", color: tamagnColors.primary, bg: "rgba(1,110,0,0.1)" },
  cancelled: { label: "Cancelled", color: tamagnColors.error, bg: "rgba(186,26,26,0.1)" },
};

const mockOrders: MockOrder[] = [
  { id: "ORD-1001", items: "Sidama Coffee × 2, Fresh Injera Pack × 1", total: 1080, status: "shipped", date: "Mar 27, 2026", merchantName: "Harar Beans" },
  { id: "ORD-1002", items: "Samsung Galaxy A55", total: 18500, status: "processing", date: "Mar 26, 2026", merchantName: "NextGen Electronics" },
  { id: "ORD-1003", items: "Berbere Spice Mix × 3", total: 750, status: "delivered", date: "Mar 24, 2026", merchantName: "Merkato Finest" },
  { id: "ORD-1004", items: "Handwoven Shemma", total: 1200, status: "delivered", date: "Mar 20, 2026", merchantName: "Dorze Weavers" },
];

export function OrdersListScreen({ navigation }: { navigation: any }): JSX.Element {
  const active = mockOrders.filter((o) => o.status !== "delivered" && o.status !== "cancelled");
  const past = mockOrders.filter((o) => o.status === "delivered" || o.status === "cancelled");

  return (
    <TamagnScreen title="Orders">
      {mockOrders.length === 0 ? (
        <EmptyState icon="package" title="No orders yet" subtitle="Your order history will appear here" />
      ) : (
        <>
          {active.length > 0 ? (
            <>
              <Text style={{ ...tamagnTypography.label, color: tamagnColors.secondary, marginBottom: tamagnSpacing.sm }}>ACTIVE</Text>
              {active.map((order) => <OrderCard key={order.id} order={order} onPress={() => navigation.navigate("OrderDetail", { orderId: order.id })} />)}
            </>
          ) : null}

          {past.length > 0 ? (
            <>
              <Text style={{ ...tamagnTypography.label, color: tamagnColors.secondary, marginTop: tamagnSpacing.lg, marginBottom: tamagnSpacing.sm }}>COMPLETED</Text>
              {past.map((order) => <OrderCard key={order.id} order={order} onPress={() => navigation.navigate("OrderDetail", { orderId: order.id })} />)}
            </>
          ) : null}
        </>
      )}
    </TamagnScreen>
  );
}

function OrderCard({ order, onPress }: { order: MockOrder; onPress: () => void }) {
  const sc = statusConfig[order.status];
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: tamagnColors.surfaceContainerLowest,
        borderRadius: tamagnRadius.xl,
        padding: tamagnSpacing.md,
        marginBottom: tamagnSpacing.sm,
        ...tamagnShadow,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <View>
          <Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.secondary }}>{order.id}</Text>
          <Text style={{ ...tamagnTypography.caption, color: tamagnColors.outlineVariant }}>{order.date}</Text>
        </View>
        <View style={{ backgroundColor: sc.bg, borderRadius: tamagnRadius.pill, paddingHorizontal: 10, paddingVertical: 4 }}>
          <Text style={{ ...tamagnTypography.captionBold, color: sc.color }}>{sc.label}</Text>
        </View>
      </View>
      <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface, marginBottom: 4 }} numberOfLines={2}>{order.items}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
        <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{order.merchantName}</Text>
        <Text style={{ ...tamagnTypography.price, color: tamagnColors.primary }}>{order.total.toLocaleString()} ETB</Text>
      </View>
    </Pressable>
  );
}
