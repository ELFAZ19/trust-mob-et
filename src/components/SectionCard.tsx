import React from "react";
import type { PropsWithChildren } from "react";
import { Pressable, Text, View } from "react-native";
import { tamagnColors, tamagnRadius, tamagnShadow, tamagnSpacing, tamagnTypography } from "../core/theme/tokens";

interface SectionCardProps {
  title?: string;
  subtitle?: string;
  onPress?: () => void;
}

export function SectionCard({ title, subtitle, onPress, children }: PropsWithChildren<SectionCardProps>): JSX.Element {
  const Wrapper = onPress ? Pressable : View;
  return (
    <Wrapper
      onPress={onPress}
      style={{
        borderRadius: tamagnRadius.xl,
        padding: tamagnSpacing.md,
        marginBottom: tamagnSpacing.md,
        backgroundColor: tamagnColors.surfaceContainerLowest,
        ...tamagnShadow,
      }}
    >
      {title ? (
        <View style={{ marginBottom: children ? tamagnSpacing.sm : 0 }}>
          <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface }}>{title}</Text>
          {subtitle ? <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginTop: 2 }}>{subtitle}</Text> : null}
        </View>
      ) : null}
      {children}
    </Wrapper>
  );
}
