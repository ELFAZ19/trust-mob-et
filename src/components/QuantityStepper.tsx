import React from "react";
import { Pressable, Text, View } from "react-native";
import { tamagnColors, tamagnRadius, tamagnTypography } from "../core/theme/tokens";

interface QuantityStepperProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export function QuantityStepper({ quantity, onIncrease, onDecrease }: QuantityStepperProps): JSX.Element {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <Pressable
        onPress={onDecrease}
        style={{
          width: 32,
          height: 32,
          borderRadius: tamagnRadius.sm,
          backgroundColor: tamagnColors.surfaceContainer,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700", color: tamagnColors.onSurface }}>−</Text>
      </Pressable>
      <Text style={{ ...tamagnTypography.bodyBold, color: tamagnColors.onSurface, minWidth: 20, textAlign: "center" }}>
        {quantity}
      </Text>
      <Pressable
        onPress={onIncrease}
        style={{
          width: 32,
          height: 32,
          borderRadius: tamagnRadius.sm,
          backgroundColor: tamagnColors.primaryContainer,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700", color: tamagnColors.onPrimaryContainer }}>+</Text>
      </Pressable>
    </View>
  );
}
