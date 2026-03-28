import React from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SectionCard } from "../../components/SectionCard";
import { StatCard } from "../../components/StatCard";
import { TamagnScreen } from "../../components/TamagnScreen";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography, tamagnShadow, GRADIENT_DARK } from "../../core/theme/tokens";

const monthlyData = [12, 18, 14, 22, 19, 28, 24, 32, 28, 38, 35, 42];
const topProducts = [
  { name: "Sidama Specialty Coffee", sales: 128, revenue: 57600 },
  { name: "Berbere Spice Mix", sales: 94, revenue: 23500 },
  { name: "Fresh Injera Pack", sales: 87, revenue: 15660 },
  { name: "Wild Forest Honey", sales: 62, revenue: 23560 },
];

const feedbackDist = [
  { stars: 5, pct: 72, count: 245 },
  { stars: 4, pct: 18, count: 61 },
  { stars: 3, pct: 6, count: 20 },
  { stars: 2, pct: 3, count: 10 },
  { stars: 1, pct: 1, count: 6 },
];

export function MerchantAnalyticsScreen(): JSX.Element {
  const maxVal = Math.max(...monthlyData);

  return (
    <TamagnScreen title="Analytics" subtitle="Performance overview">
      {/* Key Metrics */}
      <View style={{ flexDirection: "row", gap: 10, marginBottom: tamagnSpacing.md }}>
        <StatCard icon="💰" label="Total Revenue" value="ETB 120K" color={tamagnColors.primary} />
        <StatCard icon="📈" label="Growth" value="+18%" color={tamagnColors.tertiary} bgTint="rgba(246,135,0,0.08)" />
      </View>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: tamagnSpacing.lg }}>
        <StatCard icon="🛒" label="Total Orders" value="342" />
        <StatCard icon="🔄" label="Repeat Rate" value="67%" />
      </View>

      {/* Revenue Chart */}
      <View style={{ borderRadius: tamagnRadius.hero, overflow: "hidden", marginBottom: tamagnSpacing.lg }}>
        <LinearGradient colors={[...GRADIENT_DARK]} style={{ padding: tamagnSpacing.lg }}>
          <Text style={{ ...tamagnTypography.cardTitle, color: "#fff", marginBottom: tamagnSpacing.md }}>Monthly Revenue (ETB ×1000)</Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 6, height: 100 }}>
            {monthlyData.map((val, i) => (
              <View
                key={i}
                style={{
                  flex: 1,
                  height: `${(val / maxVal) * 100}%`,
                  borderRadius: 4,
                  backgroundColor: i === monthlyData.length - 1 ? tamagnColors.primaryContainer : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
            {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m) => (
              <Text key={m} style={{ flex: 1, textAlign: "center", ...tamagnTypography.labelSm, color: "rgba(255,255,255,0.4)" }}>{m}</Text>
            ))}
          </View>
        </LinearGradient>
      </View>

      {/* Top Products */}
      <SectionCard title="Top Selling Products">
        {topProducts.map((p, i) => (
          <View key={p.name} style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10, gap: 12 }}>
            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: i === 0 ? tamagnColors.primaryFixed : tamagnColors.surfaceContainerHigh, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ ...tamagnTypography.captionBold, color: i === 0 ? tamagnColors.onPrimaryContainer : tamagnColors.secondary }}>#{i + 1}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }}>{p.name}</Text>
              <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{p.sales} units sold</Text>
            </View>
            <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.primary }}>{p.revenue.toLocaleString()} ETB</Text>
          </View>
        ))}
      </SectionCard>

      {/* Feedback Distribution */}
      <SectionCard title="Customer Feedback">
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: tamagnSpacing.md }}>
          <Text style={{ ...tamagnTypography.statLg, color: tamagnColors.onSurface, marginRight: 8 }}>4.9</Text>
          <View>
            <Text style={{ fontSize: 16, color: tamagnColors.tertiary }}>★★★★★</Text>
            <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>342 total reviews</Text>
          </View>
        </View>
        {feedbackDist.map((row) => (
          <View key={row.stars} style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Text style={{ width: 14, ...tamagnTypography.captionBold, color: tamagnColors.onSurface, textAlign: "right" }}>{row.stars}</Text>
            <Text style={{ fontSize: 10, color: tamagnColors.tertiary }}>★</Text>
            <View style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: tamagnColors.surfaceContainerHigh, overflow: "hidden" }}>
              <View style={{ width: `${row.pct}%`, height: "100%", borderRadius: 4, backgroundColor: row.stars >= 4 ? tamagnColors.primary : row.stars === 3 ? tamagnColors.tertiary : tamagnColors.error }} />
            </View>
            <Text style={{ width: 36, ...tamagnTypography.caption, color: tamagnColors.secondary, textAlign: "right" }}>{row.count}</Text>
          </View>
        ))}
      </SectionCard>
    </TamagnScreen>
  );
}
