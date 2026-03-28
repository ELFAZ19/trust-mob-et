import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SectionCard } from "../../components/SectionCard";
import { TamagnButton } from "../../components/TamagnButton";
import { tamagnColors, tamagnRadius, tamagnSpacing } from "../../core/theme/tokens";
import { useAuth } from "../../core/auth/AuthContext";
import type { UserRole } from "../../core/types/domain";

const roleOptions: UserRole[] = ["buyer", "merchant", "serviceProvider"];

export function SignInScreen(): JSX.Element {
  const { signInWithRole } = useAuth();
  const [fullName, setFullName] = useState("Tamagn User");
  const [selectedRole, setSelectedRole] = useState<UserRole>("buyer");

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: tamagnSpacing.md, backgroundColor: tamagnColors.surface }}>
      <Text style={{ fontSize: 34, fontWeight: "800", color: tamagnColors.primary }}>ታማኝ</Text>
      <Text style={{ marginTop: 2, color: tamagnColors.secondary, marginBottom: tamagnSpacing.lg }}>
        The Digital Guardian
      </Text>

      <SectionCard title="Welcome Back" subtitle="Secure hyperlocal commerce starts here.">
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full Name"
          style={{
            backgroundColor: tamagnColors.surfaceContainerLow,
            borderRadius: tamagnRadius.lg,
            padding: 14,
            marginBottom: tamagnSpacing.md
          }}
        />

        <Text style={{ fontSize: 12, fontWeight: "800", color: tamagnColors.secondary, marginBottom: 8 }}>
          CHOOSE YOUR ROLE
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: tamagnSpacing.md }}>
          {roleOptions.map((role) => (
            <Pressable
              key={role}
              onPress={() => setSelectedRole(role)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderRadius: 14,
                backgroundColor:
                  selectedRole === role ? tamagnColors.primaryContainer : tamagnColors.surfaceContainer,
                marginBottom: 8
              }}
            >
              <Text
                style={{
                  fontWeight: "800",
                  color: selectedRole === role ? "#014400" : tamagnColors.secondary
                }}
              >
                {role}
              </Text>
            </Pressable>
          ))}
        </View>

        <TamagnButton title="Continue" onPress={() => signInWithRole(selectedRole, fullName || "Tamagn User")} />
      </SectionCard>
    </View>
  );
}
