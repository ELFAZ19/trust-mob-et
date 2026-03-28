import React from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../../components/Icon";
import { SectionCard } from "../../components/SectionCard";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography, tamagnShadow, GRADIENT_PRIMARY } from "../../core/theme/tokens";

const steps = [
  { label: "Order Placed", done: true, date: "Mar 27, 10:30 AM" },
  { label: "Confirmed", done: true, date: "Mar 27, 10:45 AM" },
  { label: "Preparing", done: true, date: "Mar 27, 11:00 AM" },
  { label: "Shipped", done: true, date: "Mar 27, 12:15 PM" },
  { label: "Delivered", done: false, date: "" },
];

const items = [
  { name: "Sidama Coffee", qty: 2, price: 450 },
  { name: "Fresh Injera Pack", qty: 1, price: 180 },
];

export function OrderDetailScreen({ navigation }: { navigation: any }): JSX.Element {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: tamagnColors.surface }}>
      <ScrollView contentContainerStyle={{ padding: tamagnSpacing.lg, paddingTop: insets.top + tamagnSpacing.md, paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: tamagnSpacing.lg }}>
          <Pressable onPress={() => navigation.goBack()} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: tamagnColors.surfaceContainerLow, justifyContent: "center", alignItems: "center" }}>
            <Icon name="back" size={20} color={tamagnColors.onSurface} />
          </Pressable>
          <View>
            <Text style={{ ...tamagnTypography.screenTitle, color: tamagnColors.onSurface }}>Order Details</Text>
            <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>ORD-1001 · In Transit</Text>
          </View>
        </View>

        {/* Timeline */}
        <SectionCard title="Delivery Progress">
          {steps.map((step, i) => (
            <View key={step.label} style={{ flexDirection: "row", gap: 14 }}>
              {/* Circle + Line */}
              <View style={{ alignItems: "center", width: 24 }}>
                <View style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: step.done ? tamagnColors.primary : tamagnColors.surfaceContainerHigh,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: step.done ? 0 : 2,
                  borderColor: tamagnColors.outlineVariant,
                }}>
                  {step.done ? <Icon name="check" size={16} color="#fff" /> : null}
                </View>
                {i < steps.length - 1 ? (
                  <View style={{ width: 2, flex: 1, minHeight: 28, backgroundColor: step.done ? tamagnColors.primary : tamagnColors.surfaceContainerHigh }} />
                ) : null}
              </View>
              {/* Content */}
              <View style={{ flex: 1, paddingBottom: tamagnSpacing.md }}>
                <Text style={{ ...tamagnTypography.bodyBold, color: step.done ? tamagnColors.onSurface : tamagnColors.secondary }}>{step.label}</Text>
                {step.date ? <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{step.date}</Text> : null}
              </View>
            </View>
          ))}
        </SectionCard>

        {/* Items */}
        <SectionCard title="Items">
          {items.map((item) => (
            <View key={item.name} style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
              <Text style={{ ...tamagnTypography.body, color: tamagnColors.onSurface }}>{item.name} ×{item.qty}</Text>
              <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.primary }}>{(item.price * item.qty).toLocaleString()} ETB</Text>
            </View>
          ))}
          <View style={{ height: 1, backgroundColor: tamagnColors.surfaceContainerHigh, marginVertical: 8 }} />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }}>Total</Text>
            <Text style={{ ...tamagnTypography.priceLarge, color: tamagnColors.primary }}>1,080 ETB</Text>
          </View>
        </SectionCard>

        {/* Escrow Status */}
        <SectionCard accent={tamagnColors.primary}>
          <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(1,110,0,0.1)", justifyContent: "center", alignItems: "center" }}>
              <Icon name="verified" size={22} color={tamagnColors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.primary }}>Payment Held in Escrow</Text>
              <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>Funds will be released when you confirm delivery</Text>
            </View>
          </View>
        </SectionCard>

        {/* Merchant */}
        <SectionCard>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={{ width: 48, height: 48, borderRadius: tamagnRadius.md, backgroundColor: tamagnColors.surfaceContainerHigh, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 24 }}>🏪</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }}>Harar Beans</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
                <Text style={{ fontSize: 11 }}>★</Text>
                <Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.onSurface }}>4.9</Text>
                <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>· Gold Merchant</Text>
              </View>
            </View>
            <View style={{ backgroundColor: tamagnColors.primaryContainer, borderRadius: tamagnRadius.md, paddingHorizontal: 14, paddingVertical: 8 }}>
              <Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.onPrimaryContainer }}>Contact</Text>
            </View>
          </View>
        </SectionCard>
      </ScrollView>

      {/* Bottom Action */}
      <View style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        gap: 12,
        paddingHorizontal: tamagnSpacing.lg,
        paddingTop: tamagnSpacing.md,
        paddingBottom: insets.bottom + tamagnSpacing.md,
        backgroundColor: "rgba(255,255,255,0.95)",
        borderTopLeftRadius: tamagnRadius.xl,
        borderTopRightRadius: tamagnRadius.xl,
      }}>
        <Pressable
          onPress={() => Alert.alert("Report", "A support ticket has been opened.")}
          style={{ flex: 1, paddingVertical: 16, borderRadius: tamagnRadius.lg, backgroundColor: tamagnColors.surfaceContainerLow, alignItems: "center" }}
        >
          <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.error }}>Report Issue</Text>
        </Pressable>
        <Pressable onPress={() => Alert.alert("Confirmed", "Thank you! Escrow released.")} style={{ flex: 2 }}>
          <LinearGradient
            colors={[...GRADIENT_PRIMARY]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: tamagnRadius.lg, paddingVertical: 16, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 6 }}
          >
            <Icon name="check" size={16} color="#fff" />
            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 15 }}>Confirm Delivery</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}
