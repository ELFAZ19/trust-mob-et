import React from "react";
import { Text, View } from "react-native";
import { Icon } from "./Icon";
import type { IconName } from "./Icon";
import { tamagnColors, tamagnSpacing, tamagnTypography } from "../core/theme/tokens";

interface EmptyStateProps {
  icon: IconName | string;
  title: string;
  subtitle?: string;
}

export function EmptyState({ icon, title, subtitle }: EmptyStateProps): JSX.Element {
  const isIconName = typeof icon === "string" && icon.length > 2;
  return (
    <View style={{ alignItems: "center", paddingVertical: tamagnSpacing.xxl }}>
      <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: tamagnColors.surfaceContainerHigh, justifyContent: "center", alignItems: "center", marginBottom: tamagnSpacing.md }}>
        {isIconName ? (
          <Icon name={icon as IconName} size={32} color={tamagnColors.secondary} />
        ) : (
          <Text style={{ fontSize: 32 }}>{icon}</Text>
        )}
      </View>
      <Text style={{ ...tamagnTypography.sectionTitle, color: tamagnColors.onSurface, textAlign: "center" }}>{title}</Text>
      {subtitle ? (
        <Text style={{ ...tamagnTypography.body, color: tamagnColors.secondary, textAlign: "center", marginTop: 8, maxWidth: 260 }}>{subtitle}</Text>
      ) : null}
    </View>
  );
}
