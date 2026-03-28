import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SectionCard } from "../../components/SectionCard";
import { TamagnButton } from "../../components/TamagnButton";
import { TamagnScreen } from "../../components/TamagnScreen";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography } from "../../core/theme/tokens";
import type { PromotionOption } from "../../core/types/domain";

const promotionOptions: PromotionOption[] = [
  { type: "storeBoost", label: "Store Boost", description: "Appear at the top of search results for your area", priceETB: 500, durationDays: 7 },
  { type: "productBoost", label: "Product Highlight", description: "Feature a specific product on the discovery page", priceETB: 300, durationDays: 5 },
  { type: "featuredPlacement", label: "Featured Placement", description: "Premium placement on the home screen for all buyers", priceETB: 1200, durationDays: 14 },
];

export function PromotionsScreen(): JSX.Element {
  const [selected, setSelected] = useState<PromotionOption>(promotionOptions[0]);
  const [loading, setLoading] = useState(false);

  async function handlePurchase() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    Alert.alert("Promotion Activated!", `${selected.label} is now active for ${selected.durationDays} days.`);
  }

  return (
    <TamagnScreen title="Promotions" subtitle="Boost your visibility and sales">
      {/* Active Promotions */}
      <SectionCard title="🎯 Active Promotions">
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: tamagnColors.primary }} />
          <Text style={{ ...tamagnTypography.body, color: tamagnColors.onSurface }}>No active promotions</Text>
        </View>
      </SectionCard>

      {/* Choose Promotion */}
      <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.onSurface, marginBottom: tamagnSpacing.sm }}>Choose a Promotion</Text>
      {promotionOptions.map((opt) => {
        const isSelected = selected.type === opt.type;
        return (
          <Pressable key={opt.type} onPress={() => setSelected(opt)}>
            <SectionCard>
              <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
                <View style={{
                  width: 24, height: 24, borderRadius: 12,
                  borderWidth: 2,
                  borderColor: isSelected ? tamagnColors.primary : tamagnColors.outlineVariant,
                  backgroundColor: isSelected ? tamagnColors.primary : "transparent",
                  justifyContent: "center", alignItems: "center",
                }}>
                  {isSelected ? <Text style={{ color: "#fff", fontSize: 12, fontWeight: "800" }}>✓</Text> : null}
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface }}>{opt.label}</Text>
                    <Text style={{ ...tamagnTypography.price, color: tamagnColors.primary }}>ETB {opt.priceETB}</Text>
                  </View>
                  <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondary, marginTop: 4 }}>{opt.description}</Text>
                  <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginTop: 4 }}>{opt.durationDays} days</Text>
                </View>
              </View>
            </SectionCard>
          </Pressable>
        );
      })}

      {/* Purchase */}
      <View style={{ marginTop: tamagnSpacing.sm }}>
        <TamagnButton
          title={`Pay ETB ${selected.priceETB} via M-Pesa`}
          onPress={handlePurchase}
          loading={loading}
        />
      </View>
    </TamagnScreen>
  );
}
