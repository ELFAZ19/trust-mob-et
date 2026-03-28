import React from "react";
import { Text, View } from "react-native";
import { tamagnColors, tamagnRadius, tamagnShadow, tamagnSpacing, tamagnTypography } from "../core/theme/tokens";

interface StatCardProps {
  label: string;
  value: string;
  icon?: string;
  color?: string;
  bgTint?: string;
}

export function StatCard({ label, value, icon, color, bgTint }: StatCardProps): JSX.Element {
  return (
    <View style={{
      flex: 1,
      minWidth: 140,
      borderRadius: tamagnRadius.xl,
      padding: tamagnSpacing.md,
      backgroundColor: tamagnColors.surfaceContainerLowest,
      ...tamagnShadow,
    }}>
      {icon ? (
        <View style={{ width: 40, height: 40, borderRadius: tamagnRadius.sm, backgroundColor: bgTint ?? "rgba(1,110,0,0.08)", justifyContent: "center", alignItems: "center", marginBottom: 8 }}>
          <Text style={{ fontSize: 20 }}>{icon}</Text>
        </View>
      ) : null}
      <Text style={{ ...tamagnTypography.stat, color: color ?? tamagnColors.primary }}>{value}</Text>
      <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginTop: 4 }}>{label}</Text>
    </View>
  );
}
