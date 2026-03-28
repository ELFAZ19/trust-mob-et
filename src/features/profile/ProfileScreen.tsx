import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SectionCard } from "../../components/SectionCard";
import { TamagnButton } from "../../components/TamagnButton";
import { TamagnScreen } from "../../components/TamagnScreen";
import { TrustBadge } from "../../components/TrustBadge";
import { useAuth } from "../../core/auth/AuthContext";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography } from "../../core/theme/tokens";

export function ProfileScreen(): JSX.Element {
  const { profile, signOut } = useAuth();
  const [addresses, setAddresses] = useState(["Bole, Addis Ababa"]);
  const [newAddress, setNewAddress] = useState("");

  function handleAddAddress() {
    const trimmed = newAddress.trim();
    if (!trimmed) return;
    setAddresses((prev) => [trimmed, ...prev.filter((a) => a !== trimmed)]);
    setNewAddress("");
  }

  return (
    <TamagnScreen title="Profile">
      {/* Avatar + Info */}
      <View style={{ alignItems: "center", marginBottom: tamagnSpacing.lg }}>
        <View style={{
          width: 80, height: 80, borderRadius: 40,
          backgroundColor: tamagnColors.primaryContainer,
          justifyContent: "center", alignItems: "center",
          marginBottom: tamagnSpacing.sm,
        }}>
          <Text style={{ fontSize: 32 }}>{profile?.role === "merchant" ? "🏪" : "👤"}</Text>
        </View>
        <Text style={{ ...tamagnTypography.screenTitle, color: tamagnColors.onSurface }}>{profile?.fullName}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 }}>
          <TrustBadge label={profile?.role === "merchant" ? "Merchant" : "Buyer"} tier="Gold" />
          <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>ID: {profile?.id?.slice(0, 12)}</Text>
        </View>
      </View>

      {/* Addresses */}
      <SectionCard title="📍 Delivery Addresses">
        {addresses.map((addr) => (
          <View key={addr} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: tamagnColors.surfaceContainerLow }}>
            <Text style={{ ...tamagnTypography.body, color: tamagnColors.onSurface, flex: 1 }}>{addr}</Text>
            <Pressable onPress={() => setAddresses((prev) => prev.filter((a) => a !== addr))}>
              <Text style={{ ...tamagnTypography.caption, color: tamagnColors.error }}>Remove</Text>
            </Pressable>
          </View>
        ))}
        <View style={{ flexDirection: "row", gap: 8, marginTop: tamagnSpacing.sm }}>
          <TextInput
            value={newAddress}
            onChangeText={setNewAddress}
            placeholder="Add new address"
            placeholderTextColor={tamagnColors.outlineVariant}
            style={{
              flex: 1,
              backgroundColor: tamagnColors.surfaceContainerLow,
              borderRadius: tamagnRadius.md,
              padding: 10,
              fontSize: 14,
              color: tamagnColors.onSurface,
            }}
          />
          <TamagnButton title="Add" onPress={handleAddAddress} fullWidth={false} variant="secondary" />
        </View>
      </SectionCard>

      {/* Settings */}
      <SectionCard title="⚙️ Settings">
        <SettingRow label="Push Notifications" value="Enabled" />
        <SettingRow label="Language" value="English" />
        <SettingRow label="App Version" value="0.1.0" />
      </SectionCard>

      {/* Sign Out */}
      <View style={{ marginTop: tamagnSpacing.sm }}>
        <TamagnButton title="Sign Out" onPress={() => {
          Alert.alert("Sign Out", "Are you sure?", [
            { text: "Cancel", style: "cancel" },
            { text: "Sign Out", style: "destructive", onPress: signOut },
          ]);
        }} variant="danger" />
      </View>
    </TamagnScreen>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: tamagnColors.surfaceContainerLow }}>
      <Text style={{ ...tamagnTypography.body, color: tamagnColors.onSurface }}>{label}</Text>
      <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.secondary }}>{value}</Text>
    </View>
  );
}
