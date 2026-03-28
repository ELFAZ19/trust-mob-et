import React from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { TamagnScreen } from "../../components/TamagnScreen";
import { SectionCard } from "../../components/SectionCard";
import { TrustBadge } from "../../components/TrustBadge";
import { useAuth } from "../../core/auth/AuthContext";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography, tamagnShadow } from "../../core/theme/tokens";

const buyerSettings = [
  { icon: "📍", label: "Delivery Addresses", subtitle: "Manage your saved addresses" },
  { icon: "💳", label: "Payment Methods", subtitle: "M-Pesa and other options" },
  { icon: "🔔", label: "Notifications", subtitle: "Order updates, deals & more" },
  { icon: "🌙", label: "Appearance", subtitle: "Theme and display" },
  { icon: "🔒", label: "Privacy & Security", subtitle: "Password, 2FA settings" },
  { icon: "❓", label: "Help & Support", subtitle: "FAQs and contact" },
];

const merchantSettings = [
  { icon: "🏪", label: "Store Details", subtitle: "Name, description, hours" },
  { icon: "💳", label: "Payout Settings", subtitle: "M-Pesa payout configuration" },
  { icon: "🔔", label: "Notifications", subtitle: "Order alerts, reviews" },
  { icon: "🛡️", label: "Verification", subtitle: "Documents and trust level" },
  { icon: "🔒", label: "Privacy & Security", subtitle: "Password, 2FA settings" },
  { icon: "❓", label: "Help & Support", subtitle: "Merchant resources" },
];

export function ProfileScreen(): JSX.Element {
  const { profile, signOut } = useAuth();
  const isMerchant = profile?.role === "merchant";
  const settings = isMerchant ? merchantSettings : buyerSettings;

  return (
    <TamagnScreen>
      {/* Profile Header */}
      <View style={{ alignItems: "center", marginBottom: tamagnSpacing.xl }}>
        <View style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: tamagnColors.secondaryContainer,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: tamagnSpacing.md,
        }}>
          <Text style={{ fontSize: 36 }}>{isMerchant ? "🏪" : "👤"}</Text>
        </View>
        <Text style={{ ...tamagnTypography.screenTitle, color: tamagnColors.onSurface }}>{profile?.fullName ?? "User"}</Text>
        <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondary, marginTop: 2 }}>{isMerchant ? "Merchant Account" : "Buyer Account"}</Text>
        <View style={{ marginTop: tamagnSpacing.sm }}>
          <TrustBadge tier={isMerchant ? "Gold" : "Silver"} label={isMerchant ? "Verified Merchant" : "Trusted Buyer"} size="md" />
        </View>
      </View>

      {/* Stats Row */}
      {isMerchant ? (
        <View style={{ flexDirection: "row", gap: 12, marginBottom: tamagnSpacing.lg }}>
          <MiniStat label="Products" value="12" />
          <MiniStat label="Trust Score" value="96" />
          <MiniStat label="Rating" value="4.9" />
        </View>
      ) : (
        <View style={{ flexDirection: "row", gap: 12, marginBottom: tamagnSpacing.lg }}>
          <MiniStat label="Orders" value="14" />
          <MiniStat label="Reviews" value="8" />
          <MiniStat label="Saved" value="5" />
        </View>
      )}

      {/* Settings */}
      <Text style={{ ...tamagnTypography.label, color: tamagnColors.secondary, marginBottom: tamagnSpacing.sm }}>SETTINGS</Text>
      {settings.map((item) => (
        <Pressable
          key={item.label}
          onPress={() => Alert.alert(item.label, "Coming soon")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 14,
            padding: tamagnSpacing.md,
            marginBottom: tamagnSpacing.xs,
            backgroundColor: tamagnColors.surfaceContainerLowest,
            borderRadius: tamagnRadius.lg,
            ...tamagnShadow,
          }}
        >
          <View style={{ width: 40, height: 40, borderRadius: tamagnRadius.sm, backgroundColor: tamagnColors.surfaceContainerHigh, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 18 }}>{item.icon}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }}>{item.label}</Text>
            <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{item.subtitle}</Text>
          </View>
          <Text style={{ fontSize: 14, color: tamagnColors.outlineVariant }}>›</Text>
        </Pressable>
      ))}

      {/* Sign Out */}
      <Pressable
        onPress={() => { signOut(); }}
        style={{
          marginTop: tamagnSpacing.xl,
          paddingVertical: 16,
          borderRadius: tamagnRadius.lg,
          backgroundColor: tamagnColors.errorContainer,
          alignItems: "center",
        }}
      >
        <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.error }}>Sign Out</Text>
      </Pressable>

      {/* Version */}
      <Text style={{ ...tamagnTypography.caption, color: tamagnColors.outlineVariant, textAlign: "center", marginTop: tamagnSpacing.lg }}>
        ታማኝ v1.0.0 · The Digital Guardian
      </Text>
    </TamagnScreen>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: tamagnColors.surfaceContainerLowest, borderRadius: tamagnRadius.lg, paddingVertical: 14, ...tamagnShadow }}>
      <Text style={{ ...tamagnTypography.stat, color: tamagnColors.primary }}>{value}</Text>
      <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginTop: 2 }}>{label}</Text>
    </View>
  );
}
