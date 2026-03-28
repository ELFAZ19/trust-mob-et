import React from "react";
import { Text, View } from "react-native";
import { SectionCard } from "../../components/SectionCard";
import { StatCard } from "../../components/StatCard";
import { TamagnScreen } from "../../components/TamagnScreen";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography } from "../../core/theme/tokens";

const topProducts = [
  { name: "Fresh Injera Pack", sold: 87, revenue: 15660 },
  { name: "Berbere Spice Mix", sold: 45, revenue: 11250 },
  { name: "Roasted Coffee Bundle", sold: 38, revenue: 12160 },
  { name: "Honey (Wild Forest)", sold: 22, revenue: 8360 },
];

const monthlyData = [
  { month: "Jan", amount: 42000 },
  { month: "Feb", amount: 58000 },
  { month: "Mar", amount: 67000 },
  { month: "Apr", amount: 54000 },
  { month: "May", amount: 73000 },
  { month: "Jun", amount: 89000 },
];

export function MerchantAnalyticsScreen(): JSX.Element {
  const maxAmount = Math.max(...monthlyData.map((m) => m.amount));

  return (
    <TamagnScreen title="Analytics" subtitle="Performance overview for your store">
      {/* Key Metrics */}
      <View style={{ flexDirection: "row", gap: 10, marginBottom: tamagnSpacing.md }}>
        <StatCard icon="💰" label="This Month" value="ETB 89K" color={tamagnColors.primary} />
        <StatCard icon="📦" label="Orders" value="214" />
      </View>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: tamagnSpacing.lg }}>
        <StatCard icon="😊" label="Positive Reviews" value="92%" color={tamagnColors.primary} />
        <StatCard icon="⏱️" label="Avg Response" value="12 min" />
      </View>

      {/* Revenue Chart */}
      <SectionCard title="Monthly Revenue">
        <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 8, height: 120, marginTop: tamagnSpacing.sm }}>
          {monthlyData.map((m) => {
            const height = Math.max(8, (m.amount / maxAmount) * 100);
            return (
              <View key={m.month} style={{ flex: 1, alignItems: "center" }}>
                <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginBottom: 4 }}>
                  {Math.round(m.amount / 1000)}K
                </Text>
                <View style={{ width: "100%", height, backgroundColor: tamagnColors.primaryContainer, borderRadius: tamagnRadius.sm }} />
                <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginTop: 4 }}>{m.month}</Text>
              </View>
            );
          })}
        </View>
      </SectionCard>

      {/* Top Products */}
      <SectionCard title="Top Products">
        {topProducts.map((product, idx) => (
          <View key={product.name} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8, borderBottomWidth: idx < topProducts.length - 1 ? 1 : 0, borderBottomColor: tamagnColors.surfaceContainerLow }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: tamagnColors.primaryContainer, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 11, fontWeight: "800", color: tamagnColors.onPrimaryContainer }}>{idx + 1}</Text>
              </View>
              <View>
                <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }}>{product.name}</Text>
                <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{product.sold} sold</Text>
              </View>
            </View>
            <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.primary }}>ETB {product.revenue.toLocaleString()}</Text>
          </View>
        ))}
      </SectionCard>

      {/* Customer Feedback */}
      <SectionCard title="Customer Feedback">
        <View style={{ gap: tamagnSpacing.sm }}>
          <FeedbackBar label="5 stars" pct={65} />
          <FeedbackBar label="4 stars" pct={22} />
          <FeedbackBar label="3 stars" pct={8} />
          <FeedbackBar label="2 stars" pct={3} />
          <FeedbackBar label="1 star" pct={2} />
        </View>
      </SectionCard>
    </TamagnScreen>
  );
}

function FeedbackBar({ label, pct }: { label: string; pct: number }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, width: 50 }}>{label}</Text>
      <View style={{ flex: 1, height: 8, backgroundColor: tamagnColors.surfaceContainer, borderRadius: 4 }}>
        <View style={{ width: `${pct}%`, height: 8, backgroundColor: tamagnColors.primaryContainer, borderRadius: 4 }} />
      </View>
      <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, width: 32, textAlign: "right" }}>{pct}%</Text>
    </View>
  );
}
