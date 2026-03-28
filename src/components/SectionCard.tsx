import React from "react";
import type { PropsWithChildren } from "react";
import { Pressable, Text, View } from "react-native";
import { tamagnColors, tamagnRadius, tamagnShadow, tamagnSpacing, tamagnTypography } from "../core/theme/tokens";

interface SectionCardProps {
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  noPadding?: boolean;
  accent?: string;
}

export function SectionCard({ title, subtitle, onPress, noPadding, accent, children }: PropsWithChildren<SectionCardProps>): JSX.Element {
  const Wrapper = onPress ? Pressable : View;
  return (
    <Wrapper
      onPress={onPress}
      style={{
        borderRadius: tamagnRadius.xl,
        padding: noPadding ? 0 : tamagnSpacing.md,
        marginBottom: tamagnSpacing.md,
        backgroundColor: tamagnColors.surfaceContainerLowest,
        overflow: "hidden",
        ...tamagnShadow,
      }}
    >
      {accent ? <View style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: accent, borderTopLeftRadius: tamagnRadius.xl, borderTopRightRadius: tamagnRadius.xl }} /> : null}
      {title ? (
        <View style={{ marginBottom: children ? tamagnSpacing.sm : 0, paddingHorizontal: noPadding ? tamagnSpacing.md : 0, paddingTop: noPadding ? tamagnSpacing.md : 0 }}>
          <Text style={{ ...tamagnTypography.cardTitle, color: tamagnColors.onSurface }}>{title}</Text>
          {subtitle ? <Text style={{ ...tamagnTypography.caption, color: tamagnColors.secondary, marginTop: 2 }}>{subtitle}</Text> : null}
        </View>
      ) : null}
      {children}
    </Wrapper>
  );
}
