import React from "react";
import { Pressable, Text, View } from "react-native";
import { SectionCard } from "../../components/SectionCard";
import { StatCard } from "../../components/StatCard";
import { TamagnScreen } from "../../components/TamagnScreen";
import { TrustBadge } from "../../components/TrustBadge";
import { useAuth } from "../../core/auth/AuthContext";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography } from "../../core/theme/tokens";
import type { Order, OrderStatus } from "../../core/types/domain";

const demoIncoming: Pick<Order, "id" | "status" | "total" | "items" | "createdAt">[] = [
  { id: "ORD-2001", status: "placed", total: 540, items: [{ listingId: "p1", title: "Fresh Injera Pack", price: 180, quantity: 3, merchantName: "Selam Foods" }], createdAt: new Date(Date.now() - 300000).toISOString() },
  { id: "ORD-2002", status: "confirmed", total: 250, items: [{ listingId: "p3", title: "Berbere Spice Mix", price: 250, quantity: 1, merchantName: "Selam Foods" }], createdAt: new Date(Date.now() - 1200000).toISOString() },
  { id: "ORD-2003", status: "preparing", total: 900, items: [{ listingId: "p2", title: "Organic Ethiopian Coffee", price: 450, quantity: 2, merchantName: "Selam Foods" }], createdAt: new Date(Date.now() - 2400000).toISOString() },
];

const statusLabel: Record<string, string> = {
  placed: "🟡 New",
  confirmed: "🟢 Confirmed",
  preparing: "🔵 Preparing",
  readyForPickup: "📦 Ready",
};

export function MerchantDashboardScreen({ navigation }: { navigation: any }): JSX.Element {
  const { profile } = useAuth();

  return (
    <TamagnScreen>
      {/* Hero */}
      <View style={{ marginBottom: tamagnSpacing.lg }}>
        <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondary }}>Merchant Dashboard</Text>
        <Text style={{ ...tamagnTypography.heroTitle, color: tamagnColors.onSurface }}>{profile?.fullName}</Text>
        <View style={{ marginTop: 8 }}>
          <TrustBadge tier="Gold" label="Tamagn Verified" score={92} size="md" />
        </View>
      </View>

      {/* Stats */}
      <View style={{ flexDirection: "row", gap: 10, marginBottom: tamagnSpacing.lg }}>
        <StatCard icon="💰" label="Today's Revenue" value="ETB 4,280" color={tamagnColors.primary} />
        <StatCard icon="📦" label="Active Orders" value="3" color={tamagnColors.tertiary} />
      </View>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: tamagnSpacing.lg }}>
        <StatCard icon="⭐" label="Avg Rating" value="4.7" />
        <StatCard icon="✅" label="Completion" value="96%" color={tamagnColors.primary} />
      </View>

      {/* Quick Actions */}
      <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.onSurface, marginBottom: tamagnSpacing.sm }}>Quick Actions</Text>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: tamagnSpacing.lg }}>
        {[
          { icon: "➕", label: "Add Product", onPress: () => navigation.navigate("Catalog") },
          { icon: "📊", label: "Analytics", onPress: () => navigation.navigate("Analytics") },
          { icon: "🎯", label: "Promotions", onPress: () => navigation.navigate("Promotions") },
        ].map((a) => (
          <Pressable
            key={a.label}
            onPress={a.onPress}
            style={{ flex: 1, alignItems: "center", backgroundColor: tamagnColors.surfaceContainerLowest, borderRadius: tamagnRadius.lg, paddingVertical: 16, shadowColor: tamagnColors.onSurface, shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 1 }}
          >
            <Text style={{ fontSize: 22, marginBottom: 6 }}>{a.icon}</Text>
            <Text style={{ ...tamagnTypography.caption, color: tamagnColors.onSurface }}>{a.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* Incoming Orders */}
      <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.onSurface, marginBottom: tamagnSpacing.sm }}>Incoming Orders</Text>
      {demoIncoming.map((order) => (
        <SectionCard key={order.id} onPress={() => navigation.navigate("MerchantOrderDetail", { order })}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface }}>{order.id}</Text>
                <Text style={{ fontSize: 12 }}>{statusLabel[order.status] ?? order.status}</Text>
              </View>
              <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginTop: 2 }}>
                {order.items.map((i) => `${i.title} ×${i.quantity}`).join(", ")}
              </Text>
              <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{timeAgo(order.createdAt)}</Text>
            </View>
            <Text style={{ ...tamagnTypography.price, color: tamagnColors.primary }}>ETB {order.total}</Text>
          </View>
        </SectionCard>
      ))}
    </TamagnScreen>
  );
}

function timeAgo(dateStr: string): string {
  const minutes = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}
