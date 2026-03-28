import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { tamagnColors, tamagnRadius, tamagnSpacing } from "../core/theme/tokens";

interface TamagnButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "danger";
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function TamagnButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = "primary",
  icon,
  fullWidth = true,
}: TamagnButtonProps): JSX.Element {
  const isDisabled = disabled || loading;

  if (variant === "outline") {
    return (
      <Pressable
        onPress={onPress}
        disabled={isDisabled}
        style={{
          opacity: isDisabled ? 0.5 : 1,
          borderRadius: tamagnRadius.lg,
          borderWidth: 1.5,
          borderColor: tamagnColors.primary,
          paddingVertical: 14,
          paddingHorizontal: tamagnSpacing.lg,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          gap: 8,
          alignSelf: fullWidth ? "stretch" : "flex-start",
        }}
      >
        {icon}
        <Text style={{ color: tamagnColors.primary, fontWeight: "700", fontSize: 15 }}>{title}</Text>
      </Pressable>
    );
  }

  if (variant === "secondary") {
    return (
      <Pressable
        onPress={onPress}
        disabled={isDisabled}
        style={{
          opacity: isDisabled ? 0.5 : 1,
          borderRadius: tamagnRadius.lg,
          backgroundColor: tamagnColors.surfaceContainer,
          paddingVertical: 14,
          paddingHorizontal: tamagnSpacing.lg,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          gap: 8,
          alignSelf: fullWidth ? "stretch" : "flex-start",
        }}
      >
        {icon}
        <Text style={{ color: tamagnColors.onSurface, fontWeight: "700", fontSize: 15 }}>{title}</Text>
      </Pressable>
    );
  }

  if (variant === "danger") {
    return (
      <Pressable
        onPress={onPress}
        disabled={isDisabled}
        style={{
          opacity: isDisabled ? 0.5 : 1,
          borderRadius: tamagnRadius.lg,
          backgroundColor: tamagnColors.errorContainer,
          paddingVertical: 14,
          paddingHorizontal: tamagnSpacing.lg,
          alignItems: "center",
          alignSelf: fullWidth ? "stretch" : "flex-start",
        }}
      >
        <Text style={{ color: tamagnColors.error, fontWeight: "700", fontSize: 15 }}>{title}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} disabled={isDisabled} style={{ opacity: isDisabled ? 0.5 : 1, alignSelf: fullWidth ? "stretch" : "flex-start" }}>
      <LinearGradient
        colors={[tamagnColors.primary, tamagnColors.primaryContainer]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: tamagnRadius.lg,
          paddingVertical: 14,
          paddingHorizontal: tamagnSpacing.lg,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {loading ? (
          <ActivityIndicator color={tamagnColors.onPrimary} size="small" />
        ) : (
          <>
            {icon}
            <Text style={{ color: tamagnColors.onPrimary, fontWeight: "800", fontSize: 16 }}>{title}</Text>
          </>
        )}
      </LinearGradient>
    </Pressable>
  );
}
