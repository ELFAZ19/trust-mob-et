import React from "react";
import { Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { tamagnColors, tamagnRadius } from "../core/theme/tokens";

interface TamagnButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export function TamagnButton({ title, onPress, disabled = false }: TamagnButtonProps): JSX.Element {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={{ opacity: disabled ? 0.6 : 1 }}>
      <LinearGradient
        colors={[tamagnColors.primary, tamagnColors.primaryContainer]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: tamagnRadius.lg,
          paddingVertical: 14,
          alignItems: "center"
        }}
      >
        <Text style={{ color: tamagnColors.onPrimary, fontWeight: "800", fontSize: 16 }}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}
