import React from "react";
import { Text, View } from "react-native";
import { tamagnColors, tamagnSpacing, tamagnTypography } from "../core/theme/tokens";

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle?: string;
}

export function EmptyState({ icon, title, subtitle }: EmptyStateProps): JSX.Element {
  return (
    <View style={{ alignItems: "center", paddingVertical: tamagnSpacing.xxl }}>
      <Text style={{ fontSize: 48, marginBottom: tamagnSpacing.md }}>{icon}</Text>
      <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.onSurface, textAlign: "center" }}>{title}</Text>
      {subtitle ? (
        <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondary, textAlign: "center", marginTop: 8, maxWidth: 260 }}>{subtitle}</Text>
      ) : null}
    </View>
  );
}
