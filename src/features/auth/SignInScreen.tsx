import React, { useState } from "react";
import { Pressable, Text, TextInput, View, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography, GRADIENT_PRIMARY, tamagnShadowHeavy } from "../../core/theme/tokens";
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
  const [phone, setPhone] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("buyer");
  const [mpesaLinked, setMpesaLinked] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    await signInWithRole(selectedRole, fullName.trim() || "Tamagn User");
    setLoading(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: tamagnColors.surface }}>
      {/* Decorative blurs matching stitch asymmetric circles */}
      <View style={{ position: "absolute", top: -60, right: -60, width: 260, height: 260, borderRadius: 130, backgroundColor: "rgba(0,190,0,0.08)" }} />
      <View style={{ position: "absolute", bottom: -80, left: -60, width: 290, height: 290, borderRadius: 145, backgroundColor: "rgba(246,135,0,0.06)" }} />

      {/* Brand Header */}
      <View style={{ position: "absolute", top: insets.top + tamagnSpacing.lg, left: 0, right: 0, alignItems: "center", zIndex: 10 }}>
        <Text style={{ ...tamagnTypography.displayLg, color: tamagnColors.primary }}>ታማኝ</Text>
        <Text style={{ ...tamagnTypography.labelSm, color: tamagnColors.secondary, marginTop: 2, letterSpacing: 2 }}>THE DIGITAL GUARDIAN</Text>
      </View>

      <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: tamagnSpacing.lg, paddingTop: insets.top + 80, paddingBottom: insets.bottom + tamagnSpacing.lg }}>
        {/* Auth Card */}
        <View style={{
          backgroundColor: tamagnColors.surfaceContainerLowest,
          borderRadius: tamagnRadius.hero,
          padding: tamagnSpacing.lg,
          ...tamagnShadowHeavy,
        }}>
          <Text style={{ ...tamagnTypography.screenTitle, color: tamagnColors.onSurface, marginBottom: 4 }}>Welcome back</Text>
          <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondary, marginBottom: tamagnSpacing.lg }}>
            Secure hyperlocal commerce starts here.
          </Text>

          {/* Role Selection */}
          <Text style={{ ...tamagnTypography.label, color: tamagnColors.outline, marginBottom: tamagnSpacing.sm }}>CHOOSE YOUR ROLE</Text>
          <View style={{ flexDirection: "row", gap: 8, marginBottom: tamagnSpacing.lg }}>
            {roles.map((r) => {
              const active = selectedRole === r.key;
              return (
                <Pressable
                  key={r.key}
                  onPress={() => setSelectedRole(r.key)}
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    paddingVertical: 14,
                    borderRadius: tamagnRadius.lg,
                    backgroundColor: active ? tamagnColors.primaryContainer : tamagnColors.surfaceContainer,
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{r.icon}</Text>
                  <Text style={{ fontWeight: "700", fontSize: 13, color: active ? tamagnColors.onPrimaryContainer : tamagnColors.secondary }}>
                    {r.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Phone Number with +251 prefix */}
          <Text style={{ ...tamagnTypography.label, color: tamagnColors.outline, marginBottom: tamagnSpacing.xs }}>PHONE NUMBER</Text>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: tamagnColors.surfaceContainerLow,
            borderRadius: tamagnRadius.lg,
            marginBottom: tamagnSpacing.md,
            overflow: "hidden",
          }}>
            <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 14, paddingRight: 12, borderRightWidth: 1, borderRightColor: "rgba(188,203,178,0.3)" }}>
              <Text style={{ fontSize: 16, marginRight: 6 }}>🇪🇹</Text>
              <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.secondary }}>+251</Text>
            </View>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="911 234 567"
              placeholderTextColor={tamagnColors.outlineVariant}
              keyboardType="phone-pad"
              style={{ flex: 1, paddingVertical: 14, paddingHorizontal: 12, fontSize: 15, fontWeight: "600", color: tamagnColors.onSurface }}
            />
          </View>

          {/* Name */}
          <Text style={{ ...tamagnTypography.label, color: tamagnColors.outline, marginBottom: tamagnSpacing.xs }}>FULL NAME</Text>
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
              fontWeight: "600",
              color: tamagnColors.onSurface,
              marginBottom: tamagnSpacing.md,
            }}
          />

          {/* M-Pesa Toggle */}
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: tamagnColors.surfaceContainerHigh + "80",
            borderRadius: tamagnRadius.lg,
            padding: tamagnSpacing.md,
            marginBottom: tamagnSpacing.lg,
          }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, flex: 1 }}>
              <View style={{ width: 40, height: 40, borderRadius: tamagnRadius.sm, backgroundColor: tamagnColors.primary, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "#fff", fontWeight: "900", fontSize: 13, fontStyle: "italic" }}>M</Text>
              </View>
              <View>
                <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface }}>Link M-Pesa</Text>
                <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary }}>Faster, verified transactions</Text>
              </View>
            </View>
            <Switch
              value={mpesaLinked}
              onValueChange={setMpesaLinked}
              trackColor={{ false: tamagnColors.outlineVariant, true: tamagnColors.primaryContainer }}
              thumbColor={mpesaLinked ? tamagnColors.primary : "#fff"}
            />
          </View>

          {/* CTA */}
          <Pressable onPress={handleSignIn} disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
            <LinearGradient
              colors={[...GRADIENT_PRIMARY]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: tamagnRadius.lg,
                paddingVertical: 18,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                gap: 8,
                shadowColor: tamagnColors.primary,
                shadowOpacity: 0.2,
                shadowRadius: 16,
                shadowOffset: { width: 0, height: 8 },
                elevation: 6,
              }}
            >
              <Text style={{ color: tamagnColors.onPrimary, fontWeight: "900", fontSize: 16 }}>
                {loading ? "Signing in..." : "Sign In"}
              </Text>
              {!loading ? <Text style={{ color: tamagnColors.onPrimary, fontSize: 18 }}>→</Text> : null}
            </LinearGradient>
          </Pressable>

          {/* Divider */}
          <View style={{ flexDirection: "row", alignItems: "center", marginVertical: tamagnSpacing.lg }}>
            <View style={{ flex: 1, height: 1, backgroundColor: tamagnColors.surfaceContainerHigh }} />
            <Text style={{ ...tamagnTypography.labelSm, color: tamagnColors.outlineVariant, marginHorizontal: tamagnSpacing.md }}>OR CONTINUE WITH</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: tamagnColors.surfaceContainerHigh }} />
          </View>

          {/* Social */}
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Pressable style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 12, borderRadius: tamagnRadius.lg, backgroundColor: tamagnColors.surface }}>
              <Text style={{ fontSize: 16 }}>G</Text>
              <Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.secondary }}>Google</Text>
            </Pressable>
            <Pressable style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 12, borderRadius: tamagnRadius.lg, backgroundColor: tamagnColors.surface }}>
              <Text style={{ fontSize: 16 }}>🍎</Text>
              <Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.secondary }}>Apple</Text>
            </Pressable>
          </View>
        </View>

        {/* Footer */}
        <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondary, textAlign: "center", marginTop: tamagnSpacing.lg }}>
          New to ታማኝ? <Text style={{ color: tamagnColors.primary, fontWeight: "700" }}>Create Account</Text>
        </Text>
      </View>
    </View>
  );
}
