import React from "react";
import type { PropsWithChildren } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tamagnColors, tamagnSpacing, tamagnTypography } from "../core/theme/tokens";

interface TamagnScreenProps {
  title?: string;
  subtitle?: string;
  noPadding?: boolean;
  headerRight?: React.ReactNode;
}

export function TamagnScreen({
  title,
  subtitle,
  noPadding,
  headerRight,
  children,
}: PropsWithChildren<TamagnScreenProps>): JSX.Element {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: tamagnColors.surface }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + tamagnSpacing.md,
          paddingBottom: insets.bottom + tamagnSpacing.xxl,
          paddingHorizontal: noPadding ? 0 : tamagnSpacing.md,
        }}
        showsVerticalScrollIndicator={false}
      >
        {title ? (
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: tamagnSpacing.lg, paddingHorizontal: noPadding ? tamagnSpacing.md : 0 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ ...tamagnTypography.screenTitle, color: tamagnColors.onSurface }}>{title}</Text>
              {subtitle ? <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondary, marginTop: 4 }}>{subtitle}</Text> : null}
            </View>
            {headerRight}
          </View>
        ) : null}
        {children}
      </ScrollView>
    </View>
  );
}
