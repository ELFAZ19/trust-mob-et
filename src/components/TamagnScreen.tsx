import React from "react";
import type { PropsWithChildren } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tamagnColors, tamagnSpacing, tamagnTypography } from "../core/theme/tokens";

interface TamagnScreenProps {
  title?: string;
  subtitle?: string;
  noPadding?: boolean;
  headerRight?: React.ReactNode;
  onBack?: () => void;
}

export function TamagnScreen({
  title,
  subtitle,
  noPadding,
  headerRight,
  onBack,
  children,
}: PropsWithChildren<TamagnScreenProps>): JSX.Element {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: tamagnColors.surface }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + tamagnSpacing.md,
          paddingBottom: insets.bottom + 80,
          paddingHorizontal: noPadding ? 0 : tamagnSpacing.md,
        }}
        showsVerticalScrollIndicator={false}
      >
        {(title || onBack) ? (
          <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: tamagnSpacing.lg, paddingHorizontal: noPadding ? tamagnSpacing.md : 0 }}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              {onBack ? (
                <Pressable onPress={onBack} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: tamagnColors.surfaceContainerLow, justifyContent: "center", alignItems: "center", marginRight: 12 }}>
                  <Text style={{ fontSize: 18, color: tamagnColors.onSurface }}>←</Text>
                </Pressable>
              ) : null}
              <View style={{ flex: 1 }}>
                {title ? <Text style={{ ...tamagnTypography.screenTitle, color: tamagnColors.onSurface }}>{title}</Text> : null}
                {subtitle ? <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondary, marginTop: 2 }}>{subtitle}</Text> : null}
              </View>
            </View>
            {headerRight}
          </View>
        ) : null}
        {children}
      </ScrollView>
    </View>
  );
}
