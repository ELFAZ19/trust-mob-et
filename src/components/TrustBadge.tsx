import React from "react";
import { Text, View } from "react-native";
import { tamagnColors, tamagnTypography } from "../core/theme/tokens";

interface TrustBadgeProps {
  score?: number;
  tier?: "Gold" | "Silver" | "Bronze";
  label?: string;
  size?: "sm" | "md";
}

const tierStyles = {
  Gold: { bg: tamagnColors.primaryFixed, text: tamagnColors.onPrimaryFixedVariant, icon: "✦" },
  Silver: { bg: tamagnColors.secondaryFixed, text: "#474746", icon: "✦" },
  Bronze: { bg: "#FFF3E0", text: "#8D5100", icon: "○" },
};

export function TrustBadge({ score, tier = "Bronze", label, size = "sm" }: TrustBadgeProps): JSX.Element {
  const t = tierStyles[tier];
  const displayLabel = label ?? `${tier} Merchant`;
  const isMd = size === "md";

  return (
    <View style={{
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: t.bg,
      borderRadius: 999,
      paddingHorizontal: isMd ? 12 : 8,
      paddingVertical: isMd ? 5 : 3,
    }}>
      <Text style={{ fontSize: isMd ? 11 : 9, color: t.text }}>{t.icon}</Text>
      <Text style={{ ...(isMd ? tamagnTypography.captionBold : tamagnTypography.labelSm), color: t.text, textTransform: "uppercase" }}>
        {displayLabel}
      </Text>
      {score != null ? <Text style={{ ...tamagnTypography.captionBold, color: t.text }}>{score}</Text> : null}
    </View>
  );
}
