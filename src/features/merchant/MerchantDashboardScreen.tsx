import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SectionCard } from "../../components/SectionCard";
import { StatCard } from "../../components/StatCard";
import { TamagnScreen } from "../../components/TamagnScreen";
import { Icon } from "../../components/Icon";
import { TrustBadge } from "../../components/TrustBadge";
import { useAuth } from "../../core/auth/AuthContext";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography, tamagnShadow, GRADIENT_PRIMARY, GRADIENT_DARK } from "../../core/theme/tokens";

const recentOrders = [
  { id: "ORD-2001", buyer: "Elias M.", items: "Sidama Coffee × 3", total: 1350, status: "New", statusColor: tamagnColors.tertiary },
  { id: "ORD-2002", buyer: "Sara T.", items: "Berbere Spice × 2", total: 500, status: "Shipped", statusColor: "#2196F3" },
  { id: "ORD-2003", buyer: "Abiy K.", items: "Honey (Wild)", total: 380, status: "Delivered", statusColor: tamagnColors.primary },
];

const quickActions = [
  { icon: "📋", label: "Catalog", screen: "Catalog" },
  { icon: "📈", label: "Analytics", screen: "Analytics" },
  { icon: "🚀", label: "Promote", screen: "Promotions" },
  { icon: "📦", label: "Orders", screen: "MerchantOrders" },
];

export function MerchantDashboardScreen({ navigation }: { navigation: any }): JSX.Element {
  const { profile } = useAuth();

  return (
    <TamagnScreen>
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: tamagnSpacing.sm }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.primary }}>ታማኝ</Text>
          <TrustBadge tier="Gold" label="Verified" size="sm" />
        </View>
        <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: tamagnColors.secondaryContainer, justifyContent: "center", alignItems: "center" }}>
          <Icon name="bell" size={20} color={tamagnColors.onSurface} />
        </View>
      </View>

      {/* Greeting */}
      <View style={{ marginBottom: tamagnSpacing.lg }}>
        <Text style={{ ...tamagnTypography.heroTitle, color: tamagnColors.onSurface }}>
          Welcome, {profile?.fullName?.split(" ")[0] ?? "Merchant"}
        </Text>
        <Text style={{ ...tamagnTypography.bodyMedium, color: tamagnColors.secondary, marginTop: 4 }}>Here's your store overview</Text>
      </View>

      {/* Revenue Hero */}
      <View style={{ borderRadius: tamagnRadius.hero, overflow: "hidden", marginBottom: tamagnSpacing.lg }}>
        <LinearGradient colors={[...GRADIENT_DARK]} style={{ padding: tamagnSpacing.lg }}>
          <Text style={{ ...tamagnTypography.label, color: tamagnColors.secondaryFixed }}>THIS MONTH'S REVENUE</Text>
          <Text style={{ fontSize: 40, fontWeight: "900", color: "#fff", marginTop: 4, marginBottom: 6 }}>ETB 24,850</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Text style={{ color: tamagnColors.primaryFixed, fontWeight: "700", fontSize: 13 }}>↑ 12.5%</Text>
            <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondaryFixed }}>vs. last month</Text>
          </View>
          {/* Mini chart bars */}
          <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 6, marginTop: tamagnSpacing.md, height: 50 }}>
            {[35, 50, 40, 65, 55, 70, 85].map((h, i) => (
              <View key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 4, backgroundColor: i === 6 ? tamagnColors.primaryContainer : "rgba(255,255,255,0.15)" }} />
            ))}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <Text key={d} style={{ ...tamagnTypography.labelSm, color: "rgba(255,255,255,0.4)", textAlign: "center", flex: 1 }}>{d}</Text>
            ))}
          </View>
        </LinearGradient>
      </View>

      {/* Stats */}
      <View style={{ flexDirection: "row", gap: 10, marginBottom: tamagnSpacing.lg }}>
        <StatCard icon="📦" label="Active Orders" value="8" color={tamagnColors.tertiary} bgTint="rgba(246,135,0,0.08)" />
        <StatCard icon="⭐" label="Trust Score" value="96" color={tamagnColors.primary} />
      </View>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: tamagnSpacing.lg }}>
        <StatCard icon="🛒" label="Total Sales" value="342" />
        <StatCard icon="💬" label="Reviews" value="4.9" color={tamagnColors.tertiary} bgTint="rgba(246,135,0,0.08)" />
      </View>

      {/* Quick Actions */}
      <View style={{ flexDirection: "row", gap: 10, marginBottom: tamagnSpacing.lg }}>
        {quickActions.map((action) => (
          <Pressable
            key={action.label}
            onPress={() => {
              if (action.screen === "Promotions") navigation.navigate("Promotions");
              else navigation.navigate(action.screen);
            }}
            style={{ flex: 1, alignItems: "center", backgroundColor: tamagnColors.surfaceContainerLowest, borderRadius: tamagnRadius.xl, paddingVertical: 16, ...tamagnShadow }}
          >
            <Text style={{ fontSize: 22, marginBottom: 6 }}>{action.icon}</Text>
            <Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.onSurface }}>{action.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* Recent Orders */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: tamagnSpacing.sm }}>
        <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.onSurface }}>Recent Orders</Text>
        <Pressable onPress={() => navigation.navigate("MerchantOrders")}>
          <Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.primary }}>View All</Text>
        </Pressable>
      </View>
      {recentOrders.map((order) => (
        <SectionCard key={order.id}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
            <Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.secondary }}>{order.id}</Text>
            <View style={{ backgroundColor: order.statusColor + "18", borderRadius: tamagnRadius.pill, paddingHorizontal: 8, paddingVertical: 2 }}>
              <Text style={{ ...tamagnTypography.captionBold, color: order.statusColor }}>{order.status}</Text>
            </View>
          </View>
          <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }}>{order.items}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
            <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{order.buyer}</Text>
            <Text style={{ ...tamagnTypography.price, color: tamagnColors.primary }}>{order.total.toLocaleString()} ETB</Text>
          </View>
        </SectionCard>
      ))}
    </TamagnScreen>
  );
}
