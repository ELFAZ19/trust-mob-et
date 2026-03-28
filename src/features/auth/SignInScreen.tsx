import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TamagnButton } from "../../components/TamagnButton";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography } from "../../core/theme/tokens";
import { useAuth } from "../../core/auth/AuthContext";
import type { UserRole } from "../../core/types/domain";

const roles: { key: UserRole; label: string; icon: string }[] = [
  { key: "buyer", label: "Buyer", icon: "🛒" },
  { key: "merchant", label: "Merchant", icon: "🏪" },
];

export function SignInScreen(): JSX.Element {
  const insets = useSafeAreaInsets();
  const { signInWithRole } = useAuth();
  const [fullName, setFullName] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("buyer");
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    await signInWithRole(selectedRole, fullName.trim() || "Tamagn User");
    setLoading(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: tamagnColors.surface }}>
      {/* Decorative blurs */}
      <View style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, borderRadius: 120, backgroundColor: "rgba(0,190,0,0.08)" }} />
      <View style={{ position: "absolute", bottom: -80, left: -60, width: 280, height: 280, borderRadius: 140, backgroundColor: "rgba(246,135,0,0.06)" }} />

      <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: tamagnSpacing.lg, paddingTop: insets.top, paddingBottom: insets.bottom }}>
        {/* Branding */}
        <View style={{ alignItems: "center", marginBottom: tamagnSpacing.xxl }}>
          <Text style={{ ...tamagnTypography.heroTitle, fontSize: 42, color: tamagnColors.primary }}>ታማኝ</Text>
          <Text style={{ ...tamagnTypography.label, color: tamagnColors.secondary, marginTop: 4 }}>THE DIGITAL GUARDIAN</Text>
        </View>

        {/* Auth Card */}
        <View style={{
          backgroundColor: tamagnColors.surfaceContainerLowest,
          borderRadius: tamagnRadius.hero,
          padding: tamagnSpacing.lg,
          shadowColor: tamagnColors.onSurface,
          shadowOpacity: 0.06,
          shadowRadius: 32,
          shadowOffset: { width: 0, height: 12 },
          elevation: 4,
        }}>
          <Text style={{ ...tamagnTypography.screenTitle, color: tamagnColors.onSurface }}>Welcome</Text>
          <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondary, marginTop: 4, marginBottom: tamagnSpacing.lg }}>
            Secure hyperlocal commerce starts here.
          </Text>

          {/* Role Selection */}
          <Text style={{ ...tamagnTypography.label, color: tamagnColors.outline, marginBottom: tamagnSpacing.sm }}>CHOOSE YOUR ROLE</Text>
          <View style={{ flexDirection: "row", gap: 10, marginBottom: tamagnSpacing.lg }}>
            {roles.map((r) => {
              const active = selectedRole === r.key;
              return (
                <Pressable
                  key={r.key}
                  onPress={() => setSelectedRole(r.key)}
                  style={{
                    flex: 1,
                    paddingVertical: 14,
                    paddingHorizontal: 12,
                    borderRadius: tamagnRadius.lg,
                    backgroundColor: active ? tamagnColors.primaryContainer : tamagnColors.surfaceContainerLow,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 24, marginBottom: 4 }}>{r.icon}</Text>
                  <Text style={{ fontWeight: "800", fontSize: 13, color: active ? tamagnColors.onPrimaryContainer : tamagnColors.secondary }}>
                    {r.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Name Input */}
          <Text style={{ ...tamagnTypography.label, color: tamagnColors.outline, marginBottom: tamagnSpacing.xs }}>YOUR NAME</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            placeholderTextColor={tamagnColors.outlineVariant}
            style={{
              backgroundColor: tamagnColors.surfaceContainerLow,
              borderRadius: tamagnRadius.lg,
              paddingVertical: 14,
              paddingHorizontal: 16,
              fontSize: 15,
              color: tamagnColors.onSurface,
              marginBottom: tamagnSpacing.lg,
            }}
          />

          {/* CTA */}
          <TamagnButton title="Continue" onPress={handleSignIn} loading={loading} />
        </View>

        {/* Footer */}
        <Text style={{ ...tamagnTypography.caption, color: tamagnColors.outlineVariant, textAlign: "center", marginTop: tamagnSpacing.lg }}>
          By continuing, you agree to our Terms of Service
        </Text>
      </View>
    </View>
  );
}
