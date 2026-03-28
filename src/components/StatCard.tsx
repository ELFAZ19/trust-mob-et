import React from "react";
import { Text, View } from "react-native";
import { tamagnColors, tamagnRadius, tamagnShadow, tamagnSpacing, tamagnTypography } from "../core/theme/tokens";

interface StatCardProps {
  label: string;
  value: string;
  icon?: string;
  color?: string;
}

export function StatCard({ label, value, icon, color }: StatCardProps): JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        minWidth: 140,
        borderRadius: tamagnRadius.lg,
        padding: tamagnSpacing.md,
        backgroundColor: tamagnColors.surfaceContainerLowest,
        ...tamagnShadow,
      }}
    >
      {icon ? <Text style={{ fontSize: 22, marginBottom: 6 }}>{icon}</Text> : null}
      <Text style={{ ...tamagnTypography.stat, color: color ?? tamagnColors.primary }}>{value}</Text>
      <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginTop: 4 }}>{label}</Text>
    </View>
  );
}
