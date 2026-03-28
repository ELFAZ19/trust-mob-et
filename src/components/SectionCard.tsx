import React from "react";
import type { PropsWithChildren } from "react";
import { Text, View } from "react-native";
import { tamagnColors, tamagnRadius, tamagnSpacing } from "../core/theme/tokens";

interface SectionCardProps {
  title: string;
  subtitle?: string;
}

export function SectionCard({
  title,
  subtitle,
  children
}: PropsWithChildren<SectionCardProps>): JSX.Element {
  return (
    <View
      style={{
        borderRadius: tamagnRadius.xl,
        padding: tamagnSpacing.md,
        marginBottom: tamagnSpacing.md,
        backgroundColor: tamagnColors.surfaceContainerLowest,
        shadowColor: tamagnColors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: 8 },
        elevation: 2
      }}
    >
      <Text style={{ fontSize: 17, fontWeight: "800", color: tamagnColors.onSurface }}>{title}</Text>
      {subtitle ? <Text style={{ marginTop: 4, color: tamagnColors.secondary }}>{subtitle}</Text> : null}
      <View style={{ marginTop: 10 }}>{children}</View>
    </View>
  );
}
