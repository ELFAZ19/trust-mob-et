import React from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { Icon } from "../../components/Icon";
import type { IconName } from "../../components/Icon";
import { TamagnScreen } from "../../components/TamagnScreen";
import { SectionCard } from "../../components/SectionCard";
import { TrustBadge } from "../../components/TrustBadge";
import { useAuth } from "../../core/auth/AuthContext";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography, tamagnShadow } from "../../core/theme/tokens";

const buyerSettings: { icon: IconName; label: string; subtitle: string }[] = [
  { icon: "location", label: "Delivery Addresses", subtitle: "Manage your saved addresses" },
  { icon: "credit-card", label: "Payment Methods", subtitle: "M-Pesa and other options" },
  { icon: "bell", label: "Notifications", subtitle: "Order updates, deals & more" },
  { icon: "moon", label: "Appearance", subtitle: "Theme and display" },
  { icon: "lock", label: "Privacy & Security", subtitle: "Password, 2FA settings" },
  { icon: "help", label: "Help & Support", subtitle: "FAQs and contact" },
];

const merchantSettings: { icon: IconName; label: string; subtitle: string }[] = [
  { icon: "store", label: "Store Details", subtitle: "Name, description, hours" },
  { icon: "credit-card", label: "Payout Settings", subtitle: "M-Pesa payout configuration" },
  { icon: "bell", label: "Notifications", subtitle: "Order alerts, reviews" },
  { icon: "verified", label: "Verification", subtitle: "Documents and trust level" },
  { icon: "lock", label: "Privacy & Security", subtitle: "Password, 2FA settings" },
  { icon: "help", label: "Help & Support", subtitle: "Merchant resources" },
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
          <Icon name={isMerchant ? "store" : "user"} size={40} color={tamagnColors.onSurface} />
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
            <Icon name={item.icon} size={20} color={tamagnColors.onSurface} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }}>{item.label}</Text>
            <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>{item.subtitle}</Text>
          </View>
          <Icon name="chevron-right" size={16} color={tamagnColors.outlineVariant} />
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
          flexDirection: "row",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <Icon name="logout" size={20} color={tamagnColors.error} />
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
