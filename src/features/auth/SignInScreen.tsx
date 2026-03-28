import React, { useState } from "react";
import { Image, Pressable, Text, TextInput, View, Switch, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../../components/Icon";
import { tamagnColors, tamagnRadius, tamagnSpacing, tamagnTypography, GRADIENT_PRIMARY, tamagnShadowHeavy, tamagnShadow } from "../../core/theme/tokens";
import { useAuth } from "../../core/auth/AuthContext";
import type { UserRole } from "../../core/types/domain";

const roles: { key: UserRole; label: string; icon: "cart" | "store" }[] = [
  { key: "buyer", label: "Buyer", icon: "cart" },
  { key: "merchant", label: "Merchant", icon: "store" },
];

export function SignInScreen(): JSX.Element {
  const insets = useSafeAreaInsets();
  const { signInWithRole } = useAuth();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("buyer");
  const [mpesaLinked, setMpesaLinked] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    await signInWithRole(selectedRole, fullName.trim() || "Tamagn User");
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView style={{ flex: 1, backgroundColor: tamagnColors.surface }} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {/* Decorative blurs */}
        <View style={{ position: "absolute", top: -60, right: -60, width: 260, height: 260, borderRadius: 130, backgroundColor: "rgba(0,190,0,0.08)" }} />
        <View style={{ position: "absolute", bottom: -80, left: -60, width: 290, height: 290, borderRadius: 145, backgroundColor: "rgba(246,135,0,0.06)" }} />

        {/* Brand Header */}
        <View style={{ alignItems: "center", paddingTop: insets.top + tamagnSpacing.xl, marginBottom: tamagnSpacing.lg }}>
          <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: tamagnColors.primary, justifyContent: "center", alignItems: "center", marginBottom: 12, ...tamagnShadow }}>
            <Icon name="shield" size={28} color={tamagnColors.onPrimary} strokeWidth={2.5} />
          </View>
          <Text style={{ ...tamagnTypography.displayLg, color: tamagnColors.primary }}>ታማኝ</Text>
          <Text style={{ ...tamagnTypography.labelSm, color: tamagnColors.secondary, marginTop: 2, letterSpacing: 2 }}>THE DIGITAL GUARDIAN</Text>
        </View>

        <View style={{ paddingHorizontal: tamagnSpacing.lg, paddingBottom: insets.bottom + tamagnSpacing.lg }}>
          {/* Auth Card */}
          <View style={{ backgroundColor: tamagnColors.surfaceContainerLowest, borderRadius: tamagnRadius.hero, padding: tamagnSpacing.lg, ...tamagnShadowHeavy }}>
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
                      borderWidth: active ? 2 : 0,
                      borderColor: active ? tamagnColors.primary + "33" : "transparent",
                    }}
                  >
                    <Icon name={r.icon} size={18} color={active ? tamagnColors.onPrimaryContainer : tamagnColors.secondary} />
                    <Text style={{ fontWeight: "700", fontSize: 13, color: active ? tamagnColors.onPrimaryContainer : tamagnColors.secondary }}>
                      {r.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Phone Number */}
            <Text style={{ ...tamagnTypography.label, color: tamagnColors.outline, marginBottom: tamagnSpacing.xs }}>PHONE NUMBER</Text>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: tamagnColors.surfaceContainerLow,
              borderRadius: tamagnRadius.lg,
              marginBottom: tamagnSpacing.md,
              overflow: "hidden",
            }}>
              <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 14, paddingRight: 12, borderRightWidth: 1, borderRightColor: tamagnColors.outlineVariant + "30" }}>
                <Image
                  source={{ uri: "https://flagcdn.com/w40/et.png" }}
                  style={{ width: 22, height: 15, borderRadius: 2, marginRight: 6 }}
                />
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

            {/* Password */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: tamagnSpacing.xs }}>
              <Text style={{ ...tamagnTypography.label, color: tamagnColors.outline }}>PASSWORD</Text>
              <Pressable><Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.tertiary }}>Forgot?</Text></Pressable>
            </View>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: tamagnColors.surfaceContainerLow,
              borderRadius: tamagnRadius.lg,
              marginBottom: tamagnSpacing.md,
              paddingRight: 8,
            }}>
              <View style={{ paddingLeft: 14, paddingRight: 8 }}>
                <Icon name="lock" size={18} color={tamagnColors.outlineVariant} />
              </View>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor={tamagnColors.outlineVariant}
                secureTextEntry={!showPassword}
                style={{ flex: 1, paddingVertical: 14, fontSize: 15, fontWeight: "600", color: tamagnColors.onSurface }}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)} style={{ padding: 8 }}>
                <Icon name={showPassword ? "eye" : "eye-off"} size={18} color={tamagnColors.outlineVariant} />
              </Pressable>
            </View>

            {/* Name */}
            <Text style={{ ...tamagnTypography.label, color: tamagnColors.outline, marginBottom: tamagnSpacing.xs }}>FULL NAME</Text>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: tamagnColors.surfaceContainerLow,
              borderRadius: tamagnRadius.lg,
              marginBottom: tamagnSpacing.md,
            }}>
              <View style={{ paddingLeft: 14, paddingRight: 8 }}>
                <Icon name="user" size={18} color={tamagnColors.outlineVariant} />
              </View>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name"
                placeholderTextColor={tamagnColors.outlineVariant}
                style={{ flex: 1, paddingVertical: 14, paddingRight: 14, fontSize: 15, fontWeight: "600", color: tamagnColors.onSurface }}
              />
            </View>

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
                  <Icon name="mpesa" size={20} color="#fff" />
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
                  shadowOpacity: 0.25,
                  shadowRadius: 16,
                  shadowOffset: { width: 0, height: 8 },
                  elevation: 6,
                }}
              >
                <Text style={{ color: tamagnColors.onPrimary, fontWeight: "900", fontSize: 16 }}>
                  {loading ? "Signing in..." : "Sign In"}
                </Text>
                {!loading ? <Icon name="forward" size={18} color={tamagnColors.onPrimary} /> : null}
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
              <Pressable style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 14, borderRadius: tamagnRadius.lg, backgroundColor: tamagnColors.surface }}>
                <Image source={{ uri: "https://www.google.com/favicon.ico" }} style={{ width: 18, height: 18 }} />
                <Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.secondary }}>Google</Text>
              </Pressable>
              <Pressable style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 14, borderRadius: tamagnRadius.lg, backgroundColor: tamagnColors.surface }}>
                <Icon name="phone" size={16} color={tamagnColors.onSurface} />
                <Text style={{ ...tamagnTypography.captionBold, color: tamagnColors.secondary }}>Apple</Text>
              </Pressable>
            </View>
          </View>

          {/* Footer */}
          <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondary, textAlign: "center", marginTop: tamagnSpacing.lg }}>
            New to ታማኝ? <Text style={{ color: tamagnColors.primary, fontWeight: "700" }}>Create Account</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
