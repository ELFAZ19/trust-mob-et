import React from "react";
import type { PropsWithChildren } from "react";
import { ScrollView, Text, View } from "react-native";
import { tamagnColors, tamagnSpacing } from "../core/theme/tokens";

interface TamagnScreenProps {
  title: string;
  subtitle?: string;
}

export function TamagnScreen({
  title,
  subtitle,
  children
}: PropsWithChildren<TamagnScreenProps>): JSX.Element {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: tamagnColors.surface }} contentContainerStyle={{ padding: tamagnSpacing.md }}>
      <View style={{ marginBottom: tamagnSpacing.md }}>
        <Text style={{ fontSize: 30, lineHeight: 34, fontWeight: "800", color: tamagnColors.onSurface }}>{title}</Text>
        {subtitle ? <Text style={{ marginTop: 8, color: tamagnColors.secondary }}>{subtitle}</Text> : null}
      </View>
      {children}
    </ScrollView>
  );
}
