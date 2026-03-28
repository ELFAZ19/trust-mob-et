import React, { useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../../components/Icon";
import { SectionCard } from "../../components/SectionCard";
import { useCart } from "../../core/cart/CartContext";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography, tamagnShadow, GRADIENT_PRIMARY } from "../../core/theme/tokens";

const DELIVERY_FEE = 75;
const PLATFORM_FEE_PCT = 0.03;

export function CheckoutScreen({ navigation }: { navigation: any }): JSX.Element {
  const { items, subtotal, clearCart } = useCart();
  const insets = useSafeAreaInsets();
  const platformFee = Math.round(subtotal * PLATFORM_FEE_PCT);
  const total = subtotal + DELIVERY_FEE + platformFee;
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    clearCart();
    setLoading(false);
    Alert.alert(
      "Payment Initiated",
      "Check your M-Pesa for a payment prompt. Funds held in escrow until delivery is confirmed.",
      [{ text: "View Orders", onPress: () => navigation.navigate("BuyerTabs", { screen: "OrdersList" }) }],
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: tamagnColors.surface }}>
      <ScrollView contentContainerStyle={{ padding: tamagnSpacing.lg, paddingTop: insets.top + tamagnSpacing.md, paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
        {/* Back + Title */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: tamagnSpacing.lg }}>
          <Pressable onPress={() => navigation.goBack()} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: tamagnColors.surfaceContainerLow, justifyContent: "center", alignItems: "center" }}>
            <Icon name="back" size={20} color={tamagnColors.onSurface} />
          </Pressable>
          <Text style={{ ...tamagnTypography.screenTitle, color: tamagnColors.onSurface }}>Checkout</Text>
        </View>

        {/* Items Summary */}
        <SectionCard title="Order Items" subtitle={`${items.length} products`}>
          {items.map((item) => (
            <View key={item.listingId} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }} numberOfLines={1}>{item.title}</Text>
                <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>×{item.quantity} · {item.merchantName}</Text>
              </View>
              <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.primary }}>{(item.price * item.quantity).toLocaleString()} ETB</Text>
            </View>
          ))}
        </SectionCard>

        {/* Delivery Address */}
        <SectionCard title="Delivery Address">
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your delivery address"
            placeholderTextColor={tamagnColors.outlineVariant}
            multiline
            style={{
              backgroundColor: tamagnColors.surfaceContainerLow,
              borderRadius: tamagnRadius.md,
              padding: tamagnSpacing.md,
              minHeight: 64,
              fontSize: 14,
              color: tamagnColors.onSurface,
            }}
          />
        </SectionCard>

        {/* Note */}
        <SectionCard title="Delivery Note (optional)">
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Any special instructions?"
            placeholderTextColor={tamagnColors.outlineVariant}
            style={{
              backgroundColor: tamagnColors.surfaceContainerLow,
              borderRadius: tamagnRadius.md,
              padding: tamagnSpacing.md,
              fontSize: 14,
              color: tamagnColors.onSurface,
            }}
          />
        </SectionCard>

        {/* Cost Breakdown */}
        <SectionCard title="Payment Summary">
          <Row label="Subtotal" value={`${subtotal.toLocaleString()} ETB`} />
          <Row label="Delivery Fee" value={`${DELIVERY_FEE} ETB`} />
          <Row label="Platform Fee (3%)" value={`${platformFee} ETB`} />
          <View style={{ height: 1, backgroundColor: tamagnColors.surfaceContainerHigh, marginVertical: 8 }} />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }}>Total</Text>
            <Text style={{ ...tamagnTypography.priceLarge, color: tamagnColors.primary }}>{total.toLocaleString()} ETB</Text>
          </View>
        </SectionCard>

        {/* Escrow Explanation */}
        <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12, backgroundColor: "rgba(1,110,0,0.04)", borderRadius: tamagnRadius.xl, padding: tamagnSpacing.lg, marginBottom: tamagnSpacing.md }}>
          <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(1,110,0,0.1)", justifyContent: "center", alignItems: "center" }}>
            <Icon name="verified" size={22} color={tamagnColors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.primary, marginBottom: 4 }}>How Escrow Works</Text>
            <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondary, lineHeight: 20 }}>
              1. Your payment is held securely by ታማኝ{"\n"}
              2. Merchant prepares and dispatches your order{"\n"}
              3. You confirm delivery and satisfaction{"\n"}
              4. Payment is released to the merchant
            </Text>
          </View>
        </View>

        {/* M-Pesa */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: tamagnColors.surfaceContainerLowest, borderRadius: tamagnRadius.xl, padding: tamagnSpacing.lg, ...tamagnShadow }}>
          <View style={{ width: 48, height: 48, borderRadius: tamagnRadius.md, backgroundColor: tamagnColors.primary, justifyContent: "center", alignItems: "center" }}>
            <Icon name="mpesa" size={26} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }}>Pay with M-Pesa</Text>
            <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>A payment prompt will be sent to your phone</Text>
          </View>
          <Icon name="check" size={18} color={tamagnColors.primary} />
        </View>
      </ScrollView>

      {/* Fixed Bottom Pay */}
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
        <Pressable onPress={handlePay} disabled={loading}>
          <LinearGradient
            colors={[...GRADIENT_PRIMARY]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: tamagnRadius.lg, paddingVertical: 18, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, opacity: loading ? 0.7 : 1 }}
          >
            <Icon name="mpesa" size={22} color="#fff" />
            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 16 }}>
              {loading ? "Processing..." : `Pay ${total.toLocaleString()} ETB`}
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
      <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondary }}>{label}</Text>
      <Text style={{ ...tamagnTypography.bodyMedium, color: tamagnColors.onSurface }}>{value}</Text>
    </View>
  );
}
