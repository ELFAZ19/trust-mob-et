import React, { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SectionCard } from "../../components/SectionCard";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography, tamagnShadow, GRADIENT_PRIMARY } from "../../core/theme/tokens";

interface PromotionOption {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  icon: string;
  popular?: boolean;
}

const promotionOptions: PromotionOption[] = [
  { id: "boost", title: "Store Boost", description: "Appear at the top of search results for 24 hours", price: 150, duration: "24 hours", icon: "🚀", popular: true },
  { id: "highlight", title: "Product Highlight", description: "Featured spotlight on the discovery page", price: 250, duration: "3 days", icon: "✨" },
  { id: "banner", title: "Home Banner", description: "Your store banner on the buyer home screen", price: 500, duration: "7 days", icon: "📢" },
  { id: "badge", title: "Premium Badge", description: "Exclusive 'Premium Merchant' badge on your profile", price: 350, duration: "30 days", icon: "🏆" },
];

export function PromotionsScreen({ navigation }: { navigation: any }): JSX.Element {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedPromo = promotionOptions.find((p) => p.id === selected);

  async function handlePurchase() {
    if (!selectedPromo) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    Alert.alert("Promotion Active!", `${selectedPromo.title} is now live for ${selectedPromo.duration}.`, [{ text: "OK", onPress: () => navigation.goBack() }]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: tamagnColors.surface }}>
      <ScrollView contentContainerStyle={{ padding: tamagnSpacing.lg, paddingTop: insets.top + tamagnSpacing.md, paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: tamagnSpacing.md }}>
          <Pressable onPress={() => navigation.goBack()} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: tamagnColors.surfaceContainerLow, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 18 }}>←</Text>
          </Pressable>
          <View>
            <Text style={{ ...tamagnTypography.screenTitle, color: tamagnColors.onSurface }}>Promote Store</Text>
            <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondary }}>Boost your visibility and sales</Text>
          </View>
        </View>

        {/* Promo Cards */}
        {promotionOptions.map((promo) => {
          const isSelected = selected === promo.id;
          return (
            <Pressable key={promo.id} onPress={() => setSelected(promo.id)}>
              <View style={{
                backgroundColor: tamagnColors.surfaceContainerLowest,
                borderRadius: tamagnRadius.xl,
                padding: tamagnSpacing.md,
                marginBottom: tamagnSpacing.sm,
                borderWidth: 2,
                borderColor: isSelected ? tamagnColors.primary : "transparent",
                ...tamagnShadow,
              }}>
                {promo.popular ? (
                  <View style={{ position: "absolute", top: -1, right: 16, backgroundColor: tamagnColors.tertiary, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
                    <Text style={{ ...tamagnTypography.labelSm, color: "#fff" }}>POPULAR</Text>
                  </View>
                ) : null}
                <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                  <View style={{ width: 52, height: 52, borderRadius: tamagnRadius.lg, backgroundColor: isSelected ? "rgba(1,110,0,0.08)" : tamagnColors.surfaceContainerHigh, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 26 }}>{promo.icon}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface }}>{promo.title}</Text>
                    <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginTop: 2 }}>{promo.description}</Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={{ ...tamagnTypography.price, color: tamagnColors.primary }}>{promo.price} ETB</Text>
                    <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{promo.duration}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          );
        })}

        {/* Info */}
        <SectionCard>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>💡</Text>
            <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondary, flex: 1 }}>
              Promoted stores see an average of 3× more views and 2× more orders during the promotion period.
            </Text>
          </View>
        </SectionCard>
      </ScrollView>

      {/* Fixed Bottom CTA */}
      {selectedPromo ? (
        <View style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: tamagnSpacing.lg,
          paddingTop: tamagnSpacing.md,
          paddingBottom: insets.bottom + tamagnSpacing.md,
          backgroundColor: "rgba(255,255,255,0.95)",
          borderTopLeftRadius: tamagnRadius.xl,
          borderTopRightRadius: tamagnRadius.xl,
        }}>
          <Pressable onPress={handlePurchase} disabled={loading}>
            <LinearGradient
              colors={[...GRADIENT_PRIMARY]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: tamagnRadius.lg, paddingVertical: 18, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, opacity: loading ? 0.7 : 1 }}
            >
              <Text style={{ color: "#fff", fontWeight: "900", fontSize: 18, fontStyle: "italic" }}>M</Text>
              <Text style={{ color: "#fff", fontWeight: "900", fontSize: 16 }}>
                {loading ? "Processing..." : `Pay ${selectedPromo.price} ETB · ${selectedPromo.title}`}
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
